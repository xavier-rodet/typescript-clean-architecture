import { v4 as uuidv4, validate as validateUuid } from 'uuid';

export class UidUtil {
  public static generate(): string {
    return uuidv4();
  }

  public static validate(uid: string): boolean {
    return validateUuid(uid);
  }
}
