import { EHttpStatus } from '@interfaces/_common/http';
import {
  EntityDuplicateError,
  EntityNotFoundError,
  EntityRelationNotFoundError,
} from '@use-cases/_common/database';
import { AuthorizationError } from '@use-cases/_common/security';

export abstract class APresenter<Response> {
  protected response?: Response;

  public getResponse(): Response {
    if (!this.response) {
      throw new Error('response has not been initialized yet');
    }

    return this.response;
  }

  protected convertAppErrorToStatusCode<StatusCode>(error: Error): StatusCode {
    const errorType = typeof error;

    switch (errorType) {
      case AuthorizationError.prototype.name:
        return (EHttpStatus.ClientErrorForbidden as unknown) as StatusCode;

      case EntityDuplicateError.prototype.name:
        return (EHttpStatus.ClientErrorConflict as unknown) as StatusCode;

      case EntityNotFoundError.prototype.name:
        return (EHttpStatus.ClientErrorNotFound as unknown) as StatusCode;

      case EntityRelationNotFoundError.prototype.name:
        return (EHttpStatus.ClientErrorUnprocessableEntity as unknown) as StatusCode;

      default:
        throw new Error(`unhandle error type "${errorType}"`);
    }
  }
}
