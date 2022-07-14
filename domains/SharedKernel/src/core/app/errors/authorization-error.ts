export class AuthorizationError extends Error {
  public constructor() {
    super('Authorization error');

    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}
