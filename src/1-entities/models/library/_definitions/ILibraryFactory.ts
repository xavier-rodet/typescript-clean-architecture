import { ILibrary } from "./ILibrary";
import { TLibraryInputData } from "./TLibraryInputData";

export interface ILibraryFactory {
  createLibrary(data: TLibraryInputData): ILibrary;
}
