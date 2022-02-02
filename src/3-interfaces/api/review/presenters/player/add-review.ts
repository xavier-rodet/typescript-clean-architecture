import { APresenter } from '@interfaces/api/_common/presenter';
import { TApiResponse } from '@interfaces/api/_common/response';
import { EHttpStatus } from '@interfaces/_common/http';
import { IPresenter } from '@use-cases/_common/presenter';
import {
  TAddReviewOutput,
  TAddReviewResult,
} from '@use-cases/player/add-review';

type TErrorStatus =
  | EHttpStatus.ClientErrorUnprocessableEntity
  | EHttpStatus.ClientErrorConflict
  | EHttpStatus.ClientErrorForbidden;

export type TAddReviewResponse = TApiResponse<
  TAddReviewResult,
  EHttpStatus.SuccessCreated,
  TErrorStatus
>;

export class AddReviewPresenter
  extends APresenter<TAddReviewResponse>
  implements IPresenter<TAddReviewOutput> {
  public present(either: TAddReviewOutput): void {
    if (either.left) {
      const error = either.left;
      this.response = {
        left: {
          status: this.convertAppErrorToStatusCode<TErrorStatus>(error),
          error: error.message,
        },
      };
    } else {
      this.response = {
        right: {
          status: EHttpStatus.SuccessCreated,
          content: either.right,
        },
      };
    }
  }
}
