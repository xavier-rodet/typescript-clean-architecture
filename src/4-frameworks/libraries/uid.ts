import { IUid } from '@entities/_common/libraries/uid';

import { v4 as uuidv4, validate as validateUuid } from 'uuid';

export class Uid implements IUid {
  public generate(): string {
    return uuidv4();
  }

  public validate(uid: string): boolean {
    return validateUuid(uid);
  }
}
