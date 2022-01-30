import { APresenter } from '@interfaces/api/_common/presenter';
import { TApiResponse } from '@interfaces/api/_common/response';
import { EHttpStatus } from '@interfaces/_common/http';
import { AuthorizationError } from '@use-cases/_common/security';
import { IPresenter } from '@use-cases/_common/presenter';
import {
  TAddReviewOutput,
  TAddReviewResult,
} from '@use-cases/player/add-review';
import {
  EntityDuplicateError,
  EntityRelationNotFoundError,
} from '@use-cases/_common/database';

export type TAddReviewResponse = TApiResponse<
  TAddReviewResult,
  EHttpStatus.SuccessCreated,
  | EHttpStatus.ClientErrorUnprocessableEntity
  | EHttpStatus.ClientErrorConflict
  | EHttpStatus.ClientErrorForbidden
>;

export class AddReviewPresenter
  extends APresenter<TAddReviewResponse>
  implements IPresenter<TAddReviewOutput> {
  public present(either: TAddReviewOutput): void {
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
      case EntityRelationNotFoundError:
        this.response = {
          left: {
            status: EHttpStatus.ClientErrorUnprocessableEntity,
            error: error.message,
          },
        };

        break;

      case EntityDuplicateError:
        this.response = {
          left: {
            status: EHttpStatus.ClientErrorConflict,
            error: error.message,
          },
        };
        break;

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
