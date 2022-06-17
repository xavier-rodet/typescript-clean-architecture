import { IAuthUser } from './auth-user'
import { ERole } from './roles'

export interface IAuthorization {
  getAuthUser(): IAuthUser

  hasAtLeastRole(role: ERole): boolean
  hasExactRole(role: ERole): boolean
}
