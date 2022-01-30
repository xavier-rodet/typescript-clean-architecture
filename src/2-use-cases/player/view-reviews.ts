import { Review } from '@entities/review';
import { IPresenter } from '@use-cases/_common/presenter';
import { IReviewRepository } from '@use-cases/_common/database/repositories/review';
import {
  AuthorizationError,
  ERole,
  IAuthorization,
  IAuthorizationFactory,
  TAuthentication,
} from '@use-cases/_common/security';
import { TEither } from 'src/_common/typescript';

export type TViewReviewsParams = {
  gameId: string;
  page?: number;
};
export type TViewReviewsInput = TAuthentication<TViewReviewsParams>;

export type TViewReviewsResult = Review[];
export type TViewReviewsOutput = TEither<
  AuthorizationError,
  TViewReviewsResult
>;

export interface IViewReviewsInteractor {
  execute(
    params: TViewReviewsInput,
    presenter: IPresenter<TViewReviewsOutput>
  ): Promise<void>;
}

export class ViewReviewsInteractor implements IViewReviewsInteractor {
  private authorization: IAuthorization;

  constructor(
    authorizationFactory: IAuthorizationFactory,
    private reviewRepository: IReviewRepository
  ) {
    this.authorization = authorizationFactory.createAuthorization([
      ERole.PLAYER,
    ]);
  }

  public async execute(
    input: TViewReviewsInput,
    presenter: IPresenter<TViewReviewsOutput>
  ): Promise<void> {
    if (!this.authorization.isAllowed(input.authentication)) {
      return presenter.present({
        left: this.authorization.createError(),
      });
    }

    const reviews = await this.reviewRepository.findByGame(
      input.params.gameId,
      input.params.page
    );

    return presenter.present({
      right: reviews,
    });
  }
}
