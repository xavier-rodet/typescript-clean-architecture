import { APresenter } from '@interfaces/api/_common/presenter';
import { TApiResponse } from '@interfaces/api/_common/response';
import { EHttpStatus } from '@interfaces/_common/http';
import { IPresenter } from '@use-cases/_common/presenter';
import {
  TViewReviewsOutput,
  TViewReviewsResult,
} from '@use-cases/player/view-reviews';
import { AuthorizationError } from '@use-cases/_common/security';

export type TViewReviewsResponse = TApiResponse<
  TViewReviewsResult,
  EHttpStatus.SuccessOK,
  EHttpStatus.ClientErrorForbidden
>;

export class ViewReviewsPresenter
  extends APresenter<TViewReviewsResponse>
  implements IPresenter<TViewReviewsOutput> {
  public present(either: TViewReviewsOutput): void {
    if (either.left) {
      return this.handleError(either.left);
    }

    this.response = {
      right: {
        status: EHttpStatus.SuccessOK,
        content: either.right,
      },
    };
  }

  private handleError(error: Error): void {
    switch (error.constructor) {
      case AuthorizationError:
        this.response = {
          left: {
            status: EHttpStatus.ClientErrorForbidden,
            error: error.message,
          },
        };

        break;
    }
  }
}
