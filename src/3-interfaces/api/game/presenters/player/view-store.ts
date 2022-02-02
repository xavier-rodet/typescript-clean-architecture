import { APresenter } from '@interfaces/api/_common/presenter';
import { TApiResponse } from '@interfaces/api/_common/response';
import { EHttpStatus } from '@interfaces/_common/http';
import {
  TViewStoreOutput,
  TViewStoreResult,
} from '@use-cases/player/view-store';
import { IPresenter } from '@use-cases/_common/presenter';

type TErrorStatus =
  | EHttpStatus.ClientErrorForbidden
  | EHttpStatus.ClientErrorNotFound;

export type TViewStoreResponse = TApiResponse<
  TViewStoreResult,
  EHttpStatus.SuccessOK,
  TErrorStatus
>;

export class ViewStorePresenter
  extends APresenter<TViewStoreResponse>
  implements IPresenter<TViewStoreOutput> {
  public present(either: TViewStoreOutput): void {
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
