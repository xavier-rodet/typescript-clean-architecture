import { UidUtil } from '@ts-extension/utils';
import { ValidationError } from '../errors';

export class Uid {
  private _value: string;

  public constructor(value: string) {
    if (!UidUtil.validate(value)) {
      throw new ValidationError('Uid is invalid');
    }

    this._value = value;
  }

  public get value(): string {
    return this._value;
  }
}
