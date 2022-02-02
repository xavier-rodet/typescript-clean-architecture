import { APresenter } from '@interfaces/api/_common/presenter';
import { TApiResponse } from '@interfaces/api/_common/response';
import { EHttpStatus } from '@interfaces/_common/http';
import { TViewGameOutput, TViewGameResult } from '@use-cases/player/view-game';
import { IPresenter } from '@use-cases/_common/presenter';

type TErrorStatus =
  | EHttpStatus.ClientErrorForbidden
  | EHttpStatus.ClientErrorNotFound;

export type TViewGameResponse = TApiResponse<
  TViewGameResult,
  EHttpStatus.SuccessOK,
  TErrorStatus
>;

export class ViewGamePresenter
  extends APresenter<TViewGameResponse>
  implements IPresenter<TViewGameOutput> {
  public present(either: TViewGameOutput): void {
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
