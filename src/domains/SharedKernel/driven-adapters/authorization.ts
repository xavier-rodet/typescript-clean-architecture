import { IAuthorization } from '../core/app/services';
import { ERole } from '../core/domain/constants';
import { User } from '../core/domain/entities';

export class Authorization implements IAuthorization {
  public getAuthUser(): User {
    throw new Error('Method not implemented.');
  }
  public hasAtLeastRole(role: ERole): boolean {
    console.log(role);
    throw new Error('Method not implemented.');
  }
  public hasExactRole(role: ERole): boolean {
    console.log(role);
    throw new Error('Method not implemented.');
  }
}
