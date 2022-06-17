export class AuthenticationError extends Error {
  constructor(readonly reason: string) {
    let message = 'Authentication error'
    if (reason) {
      message += `: ${reason}`
    }

    super(message)
    Object.setPrototypeOf(this, AuthenticationError.prototype)
  }
}

export class AuthorizationError extends Error {
  constructor(readonly reason?: string) {
    let message = 'Authorization error'
    if (reason) {
      message += `: ${reason}`
    }
    super(message)
    Object.setPrototypeOf(this, AuthorizationError.prototype)
  }
}
