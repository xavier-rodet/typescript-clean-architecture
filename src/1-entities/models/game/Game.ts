import { ISanitizer } from "@entities/dependencies/sanitizer";
import { IUid } from "@entities/dependencies/uid";
import { EntityValidationError } from "../_definitions/EntityValidationError";
import { EGamePlatform } from "./_definitions/EGamePlatform";
import { IGame } from "./_definitions/IGame";
import { TGameInputData } from "./_definitions/TGameInputData";

export class Game implements IGame {
  public id: string;
  public name: string;
  public price: number;
  public genres?: string[];
  public releasedAt?: Date;
  public readCount: number;
  public platform: EGamePlatform;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(data: TGameInputData, uid: IUid, sanitizer: ISanitizer) {
    this.id = data.id ?? uid.generate();
    this.name = sanitizer.sanitize(data.name);
    this.price = data.price;
    if (data.genres) {
      this.genres = data.genres.map((genre) => sanitizer.sanitize(genre));
    }
    this.releasedAt = data.releasedAt;
    this.readCount = data.readCount ?? 0;
    this.platform = data.platform ?? EGamePlatform.PC;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = new Date();

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
