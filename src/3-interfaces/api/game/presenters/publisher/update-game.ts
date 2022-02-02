import { APresenter } from '@interfaces/api/_common/presenter';
import { TApiResponse } from '@interfaces/api/_common/response';
import { EHttpStatus } from '@interfaces/_common/http';
import {
  TUpdateGameOutput,
  TUpdateGameResult,
} from '@use-cases/publisher/update-game';
import { IPresenter } from '@use-cases/_common/presenter';

type TErrorStatus =
  | EHttpStatus.ClientErrorForbidden
  | EHttpStatus.ClientErrorNotFound;

export type TUpdateGameResponse = TApiResponse<
  TUpdateGameResult,
  EHttpStatus.SuccessOK,
  TErrorStatus
>;

export class UpdateGamePresenter
  extends APresenter<TUpdateGameResponse>
  implements IPresenter<TUpdateGameOutput> {
  public present(either: TUpdateGameOutput): void {
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
