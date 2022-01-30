import { IUid } from '@entities/_common/libraries/uid';
import { EntityError } from '@entities/_common/entity';
import { ISanitizer } from '@entities/_common/libraries/sanitizer';

export type TPlayerSource = {
  id?: string;
  name: string;
  avatar?: string;
  accountBalance?: number;
};

export interface IPlayerFactory {
  createPlayer(playerSource: TPlayerSource): Player;
}

export class Player {
  public readonly id: string;
  public readonly name: string;
  public readonly avatar?: string;
  public readonly accountBalance: number;

  constructor(playerSource: TPlayerSource, uid: IUid, sanitizer: ISanitizer) {
    this.id = playerSource.id ?? uid.generate();
    this.name = sanitizer.sanitize(playerSource.name);
    this.avatar = playerSource.avatar;
    this.accountBalance = playerSource.accountBalance ?? 0;

    this.validation(uid);

    Object.freeze(this);
  }

  private validation(uid: IUid) {
    if (!uid.validate(this.id)) throw new EntityError('id format is invalid');

    const NAME_MAX_LENGTH = 50;
    if (this.name.length > NAME_MAX_LENGTH) {
      throw new EntityError('name is invalid', {
        maxLength: NAME_MAX_LENGTH,
      });
    }
  }
}
