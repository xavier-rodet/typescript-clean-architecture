import { UidUtil } from '@ts-extension/utils';
import { ERole } from '../constants';
import { Uid } from '../value-objects';

type UserProps = {
  id?: Uid;
  name: string;
  role?: ERole;
};

export class User {
  public readonly id: Uid;
  public readonly name: string;
  public readonly role: ERole;

  public constructor(props: UserProps) {
    this.id = props.id ?? new Uid(UidUtil.generate());
    this.name = props.name;
    this.role = props.role ?? ERole.PLAYER;

    Object.freeze(this);
  }
}
