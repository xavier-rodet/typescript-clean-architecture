export class EntityError extends Error {
  public constraints?: Record<string, unknown>;

  constructor(message?: string, constraints?: Record<string, unknown>) {
    super(message);
    this.constraints = constraints;
    Object.setPrototypeOf(this, EntityError.prototype);
  }
}
