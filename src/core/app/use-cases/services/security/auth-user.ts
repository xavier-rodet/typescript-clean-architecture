import { ERole } from './roles'

export interface IAuthUser {
  id: string
  name: string
  role: ERole
}
