import { EHttpStatus } from '@ts-extension/http'

import { AuthorizationError } from '@app/use-cases/services/security'

import { ApiResponse, ApiErrorResponse } from './response'
import { ValueObjectError } from '@app/entities/value-objects'
import { RepositoryError } from '@app/use-cases/repositories'

export abstract class AApiController {
  protected getErrorResponse(error: unknown): ApiResponse<ApiErrorResponse> {
    if (!(error instanceof Error)) {
      return {
        status: EHttpStatus.ServerErrorInternal,
        data: { error: 'unexpected error' },
      }
    }

    let status: EHttpStatus
    switch (error.constructor) {
      case AuthorizationError:
        status = EHttpStatus.ClientErrorForbidden
        break

      case ValueObjectError:
        status = EHttpStatus.ClientErrorBadRequest
        break

      case RepositoryError:
      default:
        status = EHttpStatus.ServerErrorInternal
        break
    }

    return {
      status,
      data: { error: error.message },
    }
  }
}
