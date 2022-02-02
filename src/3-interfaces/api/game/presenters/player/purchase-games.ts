import { Game } from '@entities/game';
import { APresenter } from '@interfaces/api/_common/presenter';
import { TApiResponse } from '@interfaces/api/_common/response';
import { EHttpStatus } from '@interfaces/_common/http';
import { TPurchaseGamesOutput } from '@use-cases/player/purchase-games';
import { IPresenter } from '@use-cases/_common/presenter';

type TErrorStatus =
  | EHttpStatus.ClientErrorForbidden
  | EHttpStatus.ClientErrorNotFound;

export type TPurchaseGamesResponse = TApiResponse<
  Game[],
  EHttpStatus.SuccessCreated,
  TErrorStatus
>;

export class PurchaseGamesPresenter
  extends APresenter<TPurchaseGamesResponse>
  implements IPresenter<TPurchaseGamesOutput> {
  public present(either: TPurchaseGamesOutput): void {
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
          status: EHttpStatus.SuccessCreated,
          content: either.right.games,
        },
      };
    }
  }
}
