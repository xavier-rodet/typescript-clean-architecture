import { Game } from '@entities/game';
import { APresenter } from '@interfaces/api/_common/presenter';
import { TApiResponse } from '@interfaces/api/_common/response';
import { EHttpStatus } from '@interfaces/_common/http';
import { TPurchaseGamesOutput } from '@use-cases/player/purchase-games';
import { EntityNotFoundError } from '@use-cases/_common/database/error';
import { IPresenter } from '@use-cases/_common/presenter';
import { AuthorizationError } from '@use-cases/_common/security';

export type TPurchaseGamesResponse = TApiResponse<
  Game[],
  EHttpStatus.SuccessCreated,
  EHttpStatus.ClientErrorForbidden | EHttpStatus.ClientErrorNotFound
>;

export class PurchaseGamesPresenter
  extends APresenter<TPurchaseGamesResponse>
  implements IPresenter<TPurchaseGamesOutput> {
  public present(either: TPurchaseGamesOutput): void {
    if (either.left) {
      return this.handleError(either.left);
    }

    this.response = {
      right: {
        status: EHttpStatus.SuccessCreated,
        content: either.right.games,
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
