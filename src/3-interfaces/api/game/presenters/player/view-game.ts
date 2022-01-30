import { APresenter } from '@interfaces/api/_common/presenter';
import { TApiResponse } from '@interfaces/api/_common/response';
import { EHttpStatus } from '@interfaces/_common/http';
import { TViewGameOutput, TViewGameResult } from '@use-cases/player/view-game';
import { EntityNotFoundError } from '@use-cases/_common/database/error';
import { IPresenter } from '@use-cases/_common/presenter';
import { AuthorizationError } from '@use-cases/_common/security';

export type TViewGameResponse = TApiResponse<
  TViewGameResult,
  EHttpStatus.SuccessOK,
  EHttpStatus.ClientErrorForbidden | EHttpStatus.ClientErrorNotFound
>;

export class ViewGamePresenter
  extends APresenter<TViewGameResponse>
  implements IPresenter<TViewGameOutput> {
  public present(either: TViewGameOutput): void {
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

      case EntityNotFoundError:
        this.response = {
          left: {
            status: EHttpStatus.ClientErrorNotFound,
            error: error.message,
          },
        };
        break;
    }
  }
}
