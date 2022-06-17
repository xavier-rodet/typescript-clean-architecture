export class RepositoryError extends Error {
  public constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, RepositoryError.prototype);
  }
}
