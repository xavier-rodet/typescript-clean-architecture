import { APresenter } from '@interfaces/api/_common/presenter';
import { TApiResponse } from '@interfaces/api/_common/response';
import { EHttpStatus } from '@interfaces/_common/http';
import {
  TPublishGameOutput,
  TPublishGameResult,
} from '@use-cases/publisher/publish-game';
import { IPresenter } from '@use-cases/_common/presenter';
import { AuthorizationError } from '@use-cases/_common/security';

export type TPublishGameResponse = TApiResponse<
  TPublishGameResult,
  EHttpStatus.SuccessCreated,
  EHttpStatus.ClientErrorForbidden
>;

export class PublishGamePresenter
  extends APresenter<TPublishGameResponse>
  implements IPresenter<TPublishGameOutput> {
  public present(either: TPublishGameOutput): void {
    if (either.left) {
      return this.handleError(either.left);
    }

    this.response = {
      right: {
        status: EHttpStatus.SuccessCreated,
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
    }
  }
}
