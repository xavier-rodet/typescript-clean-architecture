export class RepositoryError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message)
    Object.setPrototypeOf(this, RepositoryError.prototype)
  }
}

export class RepositoryDuplicateError extends RepositoryError {
  constructor(entityName: string, originalError: Error) {
    super(`${entityName} already exists`, originalError)
    Object.setPrototypeOf(this, RepositoryDuplicateError.prototype)
  }
}
