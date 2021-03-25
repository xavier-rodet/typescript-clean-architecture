import { IUid } from "@entities/dependencies/uid";
import { IPlayer } from "./_definitions/IPlayer";
import { EntityValidationError } from "../_definitions/EntityValidationError";
import { TPlayerInputData } from "./_definitions/TPlayerInputData";
import { ISanitizer } from "@entities/dependencies/sanitizer";

export class Player implements IPlayer {
  public id: string;
  public name: string;
  public avatar?: string;

  constructor(data: TPlayerInputData, uid: IUid, sanitizer: ISanitizer) {
    this.id = data.id ?? uid.generate();
    this.name = sanitizer.sanitize(data.name);
    this.avatar = data.avatar;

    this.validateWith(uid);

    Object.freeze(this);
  }

  private validateWith(uid: IUid) {
    if (!uid.validate(this.id))
      throw new EntityValidationError("id format is invalid");

    const NAME_MAX_LENGTH = 50;
    if (this.name.length > NAME_MAX_LENGTH) {
      throw new EntityValidationError("name is invalid", {
        maxLength: NAME_MAX_LENGTH,
      });
    }
  }
}
