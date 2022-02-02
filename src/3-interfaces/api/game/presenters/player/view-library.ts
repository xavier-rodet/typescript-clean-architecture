import { APresenter } from '@interfaces/api/_common/presenter';
import { TApiResponse } from '@interfaces/api/_common/response';
import { EHttpStatus } from '@interfaces/_common/http';
import {
  TViewLibraryOutput,
  TViewLibraryResult,
} from '@use-cases/player/view-library';
import { IPresenter } from '@use-cases/_common/presenter';

type TErrorStatus =
  | EHttpStatus.ClientErrorForbidden
  | EHttpStatus.ClientErrorNotFound;

export type TViewLibraryResponse = TApiResponse<
  TViewLibraryResult,
  EHttpStatus.SuccessOK,
  TErrorStatus
>;

export class ViewLibraryPresenter
  extends APresenter<TViewLibraryResponse>
  implements IPresenter<TViewLibraryOutput> {
  public present(either: TViewLibraryOutput): void {
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
