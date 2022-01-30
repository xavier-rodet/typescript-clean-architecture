import { TEither } from 'src/_common/typescript';
import { IReviewRepository } from '../database';
import { IPresenter } from '../presenter';
import { TAuthentication, AuthorizationError } from '../security';

export type TRemoveReviewParams = { reviewId: string };
export type TRemoveReviewInput = TAuthentication<TRemoveReviewParams>;
export type TRemoveReviewResult = void;
export type TRemoveReviewOutput = TEither<
  AuthorizationError,
  TRemoveReviewResult
>;

export interface IRemoveReviewInteractor {
  execute(
    input: TRemoveReviewInput,
    presenter: IPresenter<TRemoveReviewOutput>
  ): Promise<void>;
}

export abstract class ARemoveReviewInteractor
  implements IRemoveReviewInteractor {
  constructor(private reviewRepository: IReviewRepository) {}

  public async execute(
    input: TRemoveReviewInput,
    presenter: IPresenter<TRemoveReviewOutput>
  ): Promise<void> {
    await this.reviewRepository.delete(input.params.reviewId);

    presenter.present({
      right: undefined,
    });
  }
}
