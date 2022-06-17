export class ValueObjectError extends Error {
  constructor(entityName: string, reason?: string) {
    reason = reason ?? 'is invalid'
    super(`${entityName} ${reason}`)

    Object.setPrototypeOf(this, ValueObjectError.prototype)
  }
}
