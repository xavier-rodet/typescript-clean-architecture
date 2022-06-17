import { EHttpStatus } from '@ts-extension/http'

import {
  RepositoryDuplicateError,
  RepositoryNotFoundError,
  RepositoryRelationNotFoundError,
} from '@app/use-cases/repositories'
import { AuthorizationError } from '@app/use-cases/services/security'

export abstract class APresenter<Response> {
  protected response?: Response

  public getResponse(): Response {
    if (!this.response) {
      throw new Error('response has not been initialized yet')
    }

    return this.response
  }

  protected convertAppErrorToStatusCode<StatusCode>(error: Error): StatusCode {
    switch (error.constructor) {
      case AuthorizationError:
        return (EHttpStatus.ClientErrorForbidden as unknown) as StatusCode

      case RepositoryDuplicateError:
        return (EHttpStatus.ClientErrorConflict as unknown) as StatusCode

      case RepositoryNotFoundError:
        return (EHttpStatus.ClientErrorNotFound as unknown) as StatusCode

      case RepositoryRelationNotFoundError:
        return (EHttpStatus.ClientErrorUnprocessableEntity as unknown) as StatusCode

      default:
        throw new Error(`unexpected error "${error.name}"`)
    }
  }
}
