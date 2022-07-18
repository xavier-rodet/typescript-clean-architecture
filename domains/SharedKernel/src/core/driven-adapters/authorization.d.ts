import { IAuthorization } from '../core/app/services';
import { ERole } from '../core/domain/constants';
import { User } from '../core/domain/entities';
export declare class Authorization implements IAuthorization {
    getAuthUser(): User;
    hasAtLeastRole(role: ERole): boolean;
    hasExactRole(role: ERole): boolean;
}
