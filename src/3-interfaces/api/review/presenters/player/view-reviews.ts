import { APresenter } from '@interfaces/api/_common/presenter';
import { TApiResponse } from '@interfaces/api/_common/response';
import { EHttpStatus } from '@interfaces/_common/http';
import { IPresenter } from '@use-cases/_common/presenter';
import {
  TViewReviewsOutput,
  TViewReviewsResult,
} from '@use-cases/player/view-reviews';

type TErrorStatus = EHttpStatus.ClientErrorForbidden;

export type TViewReviewsResponse = TApiResponse<
  TViewReviewsResult,
  EHttpStatus.SuccessOK,
  TErrorStatus
>;

export class ViewReviewsPresenter
  extends APresenter<TViewReviewsResponse>
  implements IPresenter<TViewReviewsOutput> {
  public present(either: TViewReviewsOutput): void {
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
          status: EHttpStatus.SuccessOK,
          content: either.right,
        },
      };
    }
  }
}
