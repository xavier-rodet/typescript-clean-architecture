export class DatabaseError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}

export class EntityDuplicateError extends DatabaseError {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, EntityDuplicateError.prototype);
  }
}

export class EntityNotFoundError extends DatabaseError {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, EntityNotFoundError.prototype);
  }
}

export class EntityRelationNotFoundError extends DatabaseError {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, EntityRelationNotFoundError.prototype);
  }
}
