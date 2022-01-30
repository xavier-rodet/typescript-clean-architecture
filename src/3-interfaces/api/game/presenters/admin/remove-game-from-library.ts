import { APresenter } from '@interfaces/api/_common/presenter';
import { TApiResponse } from '@interfaces/api/_common/response';
import { EHttpStatus } from '@interfaces/_common/http';
import {
  TRemoveGameFromLibraryOutput,
  TRemoveGameFromLibraryResult,
} from '@use-cases/admin/remove-game-from-library';
import { IPresenter } from '@use-cases/_common/presenter';
import { AuthorizationError } from '@use-cases/_common/security';

export type TRemoveGameFromLibraryResponse = TApiResponse<
  TRemoveGameFromLibraryResult,
  EHttpStatus.SuccessNoContent,
  EHttpStatus.ClientErrorForbidden
>;

export class RemoveGameFromLibraryPresenter
  extends APresenter<TRemoveGameFromLibraryResponse>
  implements IPresenter<TRemoveGameFromLibraryOutput> {
  public present(either: TRemoveGameFromLibraryOutput): void {
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
