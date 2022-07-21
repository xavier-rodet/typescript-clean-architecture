import { IAuthorization } from '../app/services';
import { ERole } from '../domain/constants';
import { User } from '../domain/entities';

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
