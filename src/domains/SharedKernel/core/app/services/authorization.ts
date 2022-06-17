import { ERole } from '../../domain/constants';
import { User } from '../../domain/entities';

export interface IAuthorization {
  getAuthUser(): User;

  hasAtLeastRole(role: ERole): boolean;
  hasExactRole(role: ERole): boolean;
}
