export class AuthenticationError extends Error {
  public constructor(reason?: string) {
    let message = 'Authentication error';
    if (reason) {
      message += `: ${reason}`;
    }

    super(message);

    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}
