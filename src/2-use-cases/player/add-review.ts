import { IReviewFactory, Review } from '@entities/review';
import {
  AuthorizationError,
  ERole,
  IAuthorization,
  IAuthorizationFactory,
  TAuthentication,
} from '@use-cases/_common/security';
import { IPresenter } from '../_common/presenter';
import {
  ILibraryRepository,
  IReviewRepository,
  EntityDuplicateError,
  EntityRelationNotFoundError,
} from '@use-cases/_common/database';
import { TEither } from 'src/_common/typescript';

export type TAddReviewParams = {
  gameId: string;
  reviewerId: string;
  message?: string;
  rating: number;
};
export type TAddReviewInput = TAuthentication<TAddReviewParams>;

export type TAddReviewResult = Review;
export type TAddReviewOutput = TEither<
  AuthorizationError | EntityDuplicateError | EntityRelationNotFoundError,
  TAddReviewResult
>;

export interface IAddReviewInteractor {
  execute(
    params: TAddReviewInput,
    presenter: IPresenter<TAddReviewOutput>
  ): Promise<void>;
}

export class AddReviewInteractor implements IAddReviewInteractor {
  private authorization: IAuthorization;

  constructor(
    authorizationFactory: IAuthorizationFactory,
    private libraryRepository: ILibraryRepository,
    private reviewFactory: IReviewFactory,
    private reviewRepository: IReviewRepository
  ) {
    this.authorization = authorizationFactory.createAuthorization([
      ERole.PLAYER,
    ]);
  }

  public async execute(
    input: TAddReviewInput,
    presenter: IPresenter<TAddReviewOutput>
  ): Promise<void> {
    if (!this.authorization.isAllowed(input.authentication)) {
      return presenter.present({
        left: this.authorization.createError(),
      });
    }

    let output: TAddReviewOutput;

    const isReviewerOwningGame = await this.libraryRepository.findIn(
      input.params.gameId,
      input.params.reviewerId
    );

    if (!isReviewerOwningGame) {
      output = {
        left: new AuthorizationError('reviewer is not owning game'),
      };
    } else {
      const review = this.reviewFactory.createReview(input.params);
      const insertion = await this.reviewRepository.insert(review);

      if (insertion.left) {
        output = {
          left: insertion.left,
        };
      } else {
        output = {
          right: review,
        };
      }
    }

    return presenter.present(output);
  }
}
