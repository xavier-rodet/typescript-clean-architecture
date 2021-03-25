export class EntityValidationError extends Error {
  public constraints: unknown;

  constructor(message?: string | undefined, constraints?: unknown) {
    super(message);

    this.constraints = constraints;

    Object.setPrototypeOf(this, EntityValidationError.prototype);
  }
}
