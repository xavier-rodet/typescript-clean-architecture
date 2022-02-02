import { APresenter } from '@interfaces/api/_common/presenter';
import { TApiResponse } from '@interfaces/api/_common/response';
import { EHttpStatus } from '@interfaces/_common/http';
import {
  TPublishGameOutput,
  TPublishGameResult,
} from '@use-cases/publisher/publish-game';
import { IPresenter } from '@use-cases/_common/presenter';

type TErrorStatus = EHttpStatus.ClientErrorForbidden;

export type TPublishGameResponse = TApiResponse<
  TPublishGameResult,
  EHttpStatus.SuccessCreated,
  TErrorStatus
>;

export class PublishGamePresenter
  extends APresenter<TPublishGameResponse>
  implements IPresenter<TPublishGameOutput> {
  public present(either: TPublishGameOutput): void {
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
          content: either.right,
        },
      };
    }
  }
}
