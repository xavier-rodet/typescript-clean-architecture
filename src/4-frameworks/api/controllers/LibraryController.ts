import {
  Body,
  Controller,
  Post,
  Route,
  SuccessResponse,
  Res,
  TsoaResponse,
  Tags,
} from "tsoa";

import StatusCode from "status-code-enum";
import {
  wrapError,
  UniqueViolationError,
  ForeignKeyViolationError,
} from "db-errors";

import { TErrorResponse } from "@interfaces/adapters/api";

import { ILibrary } from "@entities/models/library";
import { ILibraryInteractions } from "@use-cases/interactions/library";

@Route("library")
@Tags("library")
export class LibraryController extends Controller {
  private libraryInteractions: ILibraryInteractions;

  constructor(libraryInteractions: ILibraryInteractions) {
    super();

    this.libraryInteractions = libraryInteractions;
  }

  @Post()
  @SuccessResponse(StatusCode.SuccessCreated, "Created")
  public async postLibrary(
    @Body()
    library: ILibrary,
    @Res()
    notFoundResponse: TsoaResponse<
      StatusCode.ClientErrorNotFound,
      TErrorResponse
    >,
    @Res()
    duplicatedResponse: TsoaResponse<
      StatusCode.ClientErrorConflict,
      TErrorResponse
    >
  ): Promise<void> {
    this.setStatus(StatusCode.SuccessCreated);

    try {
      return await this.libraryInteractions.addLibrary(library);
    } catch (error) {
      const wrappedError = wrapError(error);
      if (wrappedError instanceof ForeignKeyViolationError) {
        let entityName;
        switch (error.constraint) {
          case "library_gameid_foreign":
            entityName = "Game";
            break;

          case "library_ownerid_foreign":
            entityName = "Player";
            break;

          default:
            entityName = "Unknown entity";
        }

        return notFoundResponse(StatusCode.ClientErrorNotFound, {
          message: `${entityName} does not exist`,
        });
      } else if (wrappedError instanceof UniqueViolationError) {
        return duplicatedResponse(StatusCode.ClientErrorConflict, {
          message: "This game is already in this player library",
        });
      } else throw wrappedError;
    }
  }
}
