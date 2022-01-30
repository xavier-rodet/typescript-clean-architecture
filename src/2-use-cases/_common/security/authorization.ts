import { IAuthentication } from './authentication';
import { ERole } from './roles';

export interface IAuthorization {
  isAllowed(authentication: IAuthentication): boolean;
  createError(message?: string): AuthorizationError;
}

export interface IAuthorizationFactory {
  createAuthorization(allowedRoles: ERole[]): IAuthorization;
}

export class Authorization implements IAuthorization {
  constructor(private readonly allowedRoles: ERole[]) {}

  public isAllowed(authentication: IAuthentication): boolean {
    return this.allowedRoles.includes(authentication.role);
  }

  public createError(message = 'Authorization failed'): AuthorizationError {
    return new AuthorizationError(message);
  }
}

export class AuthorizationFactory implements IAuthorizationFactory {
  public createAuthorization(allowedRoles: ERole[]): IAuthorization {
    return new Authorization(allowedRoles);
  }
}

export class AuthorizationError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}
