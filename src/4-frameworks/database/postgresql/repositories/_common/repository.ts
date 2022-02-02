import {
  EntityDuplicateError,
  EntityRelationNotFoundError,
} from '@use-cases/_common/database';
import {
  wrapError,
  UniqueViolationError,
  ForeignKeyViolationError,
} from 'db-errors';

export abstract class ARepository {
  constructor(private entity: string) {}

  protected convertDbError<AppError>(error: Error): AppError {
    const wrappedError = wrapError(error);

    switch (wrappedError.constructor) {
      case UniqueViolationError:
        return (new EntityDuplicateError(
          `${this.entity} already exist`
        ) as unknown) as AppError;

      case ForeignKeyViolationError:
        return (new EntityRelationNotFoundError(
          `${this.entity} already exist`
        ) as unknown) as AppError;

      default:
        throw wrappedError;
    }
  }
}
