import { APresenter } from '@interfaces/api/_common/presenter';
import { TApiResponse } from '@interfaces/api/_common/response';
import { EHttpStatus } from '@interfaces/_common/http';
import {
  TRemoveGameFromLibraryOutput,
  TRemoveGameFromLibraryResult,
} from '@use-cases/admin/remove-game-from-library';
import { IPresenter } from '@use-cases/_common/presenter';

type TErrorStatus = EHttpStatus.ClientErrorForbidden;

export type TRemoveGameFromLibraryResponse = TApiResponse<
  TRemoveGameFromLibraryResult,
  EHttpStatus.SuccessNoContent,
  TErrorStatus
>;

export class RemoveGameFromLibraryPresenter
  extends APresenter<TRemoveGameFromLibraryResponse>
  implements IPresenter<TRemoveGameFromLibraryOutput> {
  public present(either: TRemoveGameFromLibraryOutput): void {
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
          content: undefined,
        },
      };
    }
  }
}
