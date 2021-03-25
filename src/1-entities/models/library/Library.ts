import { IUid } from "@entities/dependencies/uid";
import { EntityValidationError } from "../_definitions/EntityValidationError";
import { ILibrary } from "./_definitions/ILibrary";
import { TLibraryInputData } from "./_definitions/TLibraryInputData";

export class Library implements ILibrary {
  public gameId: string;
  public ownerId: string;

  constructor(data: TLibraryInputData, uid: IUid) {
    this.gameId = data.gameId;
    this.ownerId = data.ownerId;

    this.validateWith(uid);

    Object.freeze(this);
  }

  private validateWith(uid: IUid) {
    if (!uid.validate(this.gameId))
      throw new EntityValidationError("gameId format is invalid");

    if (!uid.validate(this.ownerId))
      throw new EntityValidationError("ownerId format is invalid");
  }
}
