import { APresenter } from '@interfaces/api/_common/presenter';
import { TApiResponse } from '@interfaces/api/_common/response';
import { EHttpStatus } from '@interfaces/_common/http';
import {
  TRemoveReviewOutput,
  TRemoveReviewResult,
} from '@use-cases/_common/interactors/remove-review';
import { IPresenter } from '@use-cases/_common/presenter';

type TErrorStatus = EHttpStatus.ClientErrorForbidden;

export type TRemoveReviewResponse = TApiResponse<
  TRemoveReviewResult,
  EHttpStatus.SuccessNoContent,
  TErrorStatus
>;

// We abstract RemoveReviewPresenter, just do demonstrate how admin/moderator/player can implements their own class
// Note: in this particulary case it doesn't really make sense (API will always send back same kind of response no matter the role)
// so we could have just create only one RemoveReviewPresenter class
export abstract class ARemoveReviewPresenter
  extends APresenter<TRemoveReviewResponse>
  implements IPresenter<TRemoveReviewOutput> {
  public present(either: TRemoveReviewOutput): void {
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
          status: EHttpStatus.SuccessNoContent,
          content: either.right,
        },
      };
    }
  }
}
