import { APresenter } from '@interfaces/api/_common/presenter';
import { TApiResponse } from '@interfaces/api/_common/response';
import { EHttpStatus } from '@interfaces/_common/http';
import {
  TRemoveGameFromStoreOutput,
  TRemoveGameFromStoreResult,
} from '@use-cases/admin/remove-game-from-store';
import { IPresenter } from '@use-cases/_common/presenter';

type TErrorStatus = EHttpStatus.ClientErrorForbidden;

export type TRemoveGameFromStoreResponse = TApiResponse<
  TRemoveGameFromStoreResult,
  EHttpStatus.SuccessNoContent,
  TErrorStatus
>;

export class RemoveGameFromStorePresenter
  extends APresenter<TRemoveGameFromStoreResponse>
  implements IPresenter<TRemoveGameFromStoreOutput> {
  public present(either: TRemoveGameFromStoreOutput): void {
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
