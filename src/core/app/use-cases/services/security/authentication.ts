import { IAuthUser } from './auth-user'

export interface IAuthentication {
  getAuthUser(): IAuthUser
}
