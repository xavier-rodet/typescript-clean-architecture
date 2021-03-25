import { ILibrary, ILibraryFactory } from "@entities/models/library";
import { ILibraryRepository } from "@use-cases/dependencies/repositories/ILibraryRepository";
import { ILibraryInteractions } from "./_definitions/ILibraryInteractions";

export class LibraryInteractions implements ILibraryInteractions {
  private libraryRepository: ILibraryRepository;
  private libraryFactory: ILibraryFactory;

  constructor(
    libraryRepository: ILibraryRepository,
    libraryFactory: ILibraryFactory
  ) {
    this.libraryRepository = libraryRepository;
    this.libraryFactory = libraryFactory;
  }

  public addLibrary(libraryCreationData: ILibrary): Promise<void> {
    const library = this.libraryFactory.createLibrary(libraryCreationData);
    return this.libraryRepository.insertLibrary(library);
  }
}
