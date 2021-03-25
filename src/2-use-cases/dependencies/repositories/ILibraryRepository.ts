import { ILibrary } from "@entities/models/library";

export interface ILibraryRepository {
  insertLibrary(library: ILibrary): Promise<void>;
}
