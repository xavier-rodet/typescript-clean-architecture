import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Route,
  SuccessResponse,
  Res,
  TsoaResponse,
  Patch,
  Delete,
  Query,
  Tags,
} from "tsoa";

import StatusCode from "status-code-enum";
import { wrapError, UniqueViolationError } from "db-errors";

import { TErrorResponse } from "@interfaces/adapters/api";

import { IPlayersInteractions } from "@use-cases/interactions/players";

import {
  IPlayer,
  TPlayerCreationData,
  TPlayerModificationData,
} from "@entities/models/player";

import { IGame } from "@entities/models/game";
import { IGamesInteractions } from "@use-cases/interactions/games";

@Route("players")
@Tags("players")
export class PlayersController extends Controller {
  private playersInteractions: IPlayersInteractions;
  private gamesInteractions: IGamesInteractions;

  constructor(
    playersInteractions: IPlayersInteractions,
    gamesInteractions: IGamesInteractions
  ) {
    super();

    this.playersInteractions = playersInteractions;
    this.gamesInteractions = gamesInteractions;
  }

  @Get("{playerId}")
  public async getGame(
    @Res()
    notFoundResponse: TsoaResponse<
      StatusCode.ClientErrorNotFound,
      TErrorResponse
    >,
    @Path()
    playerId: string
  ): Promise<IPlayer | void> {
    const player = await this.playersInteractions.getPlayer(playerId);

    if (player) {
      return player;
    } else {
      notFoundResponse(StatusCode.ClientErrorNotFound, {
        message: "Player not found",
      });
    }
  }

  @Get()
  public async getGames(@Query() page = 1): Promise<IPlayer[]> {
    return await this.playersInteractions.listPlayers(page);
  }

  @Post()
  @SuccessResponse(StatusCode.SuccessCreated, "Created")
  public async postGame(
    @Res()
    duplicatedResponse: TsoaResponse<
      StatusCode.ClientErrorConflict,
      TErrorResponse
    >,
    @Body() playerCreationData: TPlayerCreationData
  ): Promise<IPlayer | void> {
    this.setStatus(StatusCode.SuccessCreated);

    try {
      return await this.playersInteractions.addPlayer(playerCreationData);
    } catch (error) {
      const wrappedError = wrapError(error);
      if (wrappedError instanceof UniqueViolationError) {
        duplicatedResponse(StatusCode.ClientErrorConflict, {
          message: "Player already exist",
        });
      } else throw wrappedError;
    }
  }

  @Patch("{playerId}")
  public async patchGame(
    @Res()
    notFoundResponse: TsoaResponse<
      StatusCode.ClientErrorNotFound,
      TErrorResponse
    >,
    @Path()
    playerId: string,
    @Body()
    playerModificationData: TPlayerModificationData
  ): Promise<IPlayer | void> {
    const player = await this.playersInteractions.editPlayer(
      playerId,
      playerModificationData
    );
    if (player) {
      return player;
    } else {
      notFoundResponse(StatusCode.ClientErrorNotFound, {
        message: "Player not found",
      });
    }
  }

  @Delete("{playerId}")
  @SuccessResponse(StatusCode.SuccessNoContent, "Deleted")
  public async deleteGame(
    @Path()
    playerId: string
  ): Promise<void> {
    this.setStatus(StatusCode.SuccessNoContent);
    await this.playersInteractions.removePlayer(playerId);
  }

  @Get("{playerId}/games")
  @Tags("games")
  public async getGamesFromPlayerLibrary(
    @Path()
    playerId: string,
    @Query() page = 1
  ): Promise<IGame[]> {
    return await this.gamesInteractions.listGamesFromPlayerLibrary(
      playerId,
      page
    );
  }
}
