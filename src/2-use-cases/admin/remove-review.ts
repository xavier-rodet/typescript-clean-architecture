import {
  ERole,
  IAuthorization,
  IAuthorizationFactory,
} from '@use-cases/_common/security';
import { IReviewRepository } from '@use-cases/_common/database';
import {
  IRemoveReviewInteractor,
  ARemoveReviewInteractor,
  TRemoveReviewParams,
  TRemoveReviewInput,
  TRemoveReviewResult,
  TRemoveReviewOutput,
} from '@use-cases/_common/interactors/remove-review';
import { IPresenter } from '@use-cases/_common/presenter';

export {
  IRemoveReviewInteractor,
  TRemoveReviewParams,
  TRemoveReviewInput,
  TRemoveReviewResult,
  TRemoveReviewOutput,
};

export class AdminRemoveReviewInteractor extends ARemoveReviewInteractor {
  private authorization: IAuthorization;

  constructor(
    authorizationFactory: IAuthorizationFactory,
    reviewRepository: IReviewRepository
  ) {
    super(reviewRepository);

    this.authorization = authorizationFactory.createAuthorization([
      ERole.ADMIN,
    ]);
  }

  public async execute(
    input: TRemoveReviewInput,
    presenter: IPresenter<TRemoveReviewOutput>
  ): Promise<void> {
    if (!this.authorization.isAllowed(input.authentication)) {
      return presenter.present({
        left: this.authorization.createError(),
      });
    }

    super.execute(input, presenter);
  }
}
