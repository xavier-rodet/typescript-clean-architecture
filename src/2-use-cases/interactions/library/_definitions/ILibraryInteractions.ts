import { ILibrary } from "@entities/models/library";

export interface ILibraryInteractions {
  addLibrary(library: ILibrary): Promise<void>;
}
