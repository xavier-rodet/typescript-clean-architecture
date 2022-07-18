import { ERole } from '../constants';
import { Uid } from '../value-objects';
declare type UserProps = {
    id?: Uid;
    name: string;
    role?: ERole;
};
export declare class User {
    readonly id: Uid;
    readonly name: string;
    readonly role: ERole;
    constructor(props: UserProps);
}
export {};
