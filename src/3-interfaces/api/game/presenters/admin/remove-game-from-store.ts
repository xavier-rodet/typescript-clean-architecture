import { APresenter } from '@interfaces/api/_common/presenter';
import { TApiResponse } from '@interfaces/api/_common/response';
import { EHttpStatus } from '@interfaces/_common/http';
import {
  TRemoveGameFromStoreOutput,
  TRemoveGameFromStoreResult,
} from '@use-cases/admin/remove-game-from-store';
import { IPresenter } from '@use-cases/_common/presenter';
import { AuthorizationError } from '@use-cases/_common/security';

export type TRemoveGameFromStoreResponse = TApiResponse<
  TRemoveGameFromStoreResult,
  EHttpStatus.SuccessNoContent,
  EHttpStatus.ClientErrorForbidden
>;

export class RemoveGameFromStorePresenter
  extends APresenter<TRemoveGameFromStoreResponse>
  implements IPresenter<TRemoveGameFromStoreOutput> {
  public present(either: TRemoveGameFromStoreOutput): void {
    if (either.left) {
      return this.handleError(either.left);
    }

    this.response = {
      right: {
        status: EHttpStatus.SuccessNoContent,
        content: undefined,
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
