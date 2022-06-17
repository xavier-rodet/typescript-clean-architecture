import {
  RepositoryDuplicateError,
  RepositoryError,
} from '@app/use-cases/repositories'
import { UniqueViolationError, wrapError } from 'db-errors'

export abstract class APgSqlRepository {
  constructor(protected table: string) {}

  protected getRepositoryError(error: unknown): RepositoryError {
    if (!(error instanceof Error)) {
      return new RepositoryError('unexpected error')
    }

    const wrappedError = wrapError(error)

    switch (wrappedError.constructor) {
      case UniqueViolationError:
        return new RepositoryDuplicateError(
          this.table,
          wrappedError.nativeError
        )

      default:
        return new RepositoryError(
          'unexpected postgresql error',
          wrappedError.nativeError
        )
    }
  }
}
