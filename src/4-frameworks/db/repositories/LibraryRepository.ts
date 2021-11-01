import { ILibrary } from "@entities/models/library";
import { ILibraryRepository } from "@use-cases/dependencies/repositories/ILibraryRepository";
import Knex from "knex";

export class LibraryRepository implements ILibraryRepository {
  private db: Knex;
  private readonly TABLE = "library";
  private readonly FIELDS = ["game_id", "owner_id"];

  constructor(db: Knex) {
    this.db = db;
  }

  public insertLibrary(library: ILibrary): Promise<void> {
    return this.db<ILibrary>(this.TABLE)
      .column(this.FIELDS)
      .select()
      .from(this.TABLE)
      .insert(library);
  }
}
