import {
  Body,
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
  Controller,
} from "tsoa";

import StatusCode from "status-code-enum";
import {
  wrapError,
  UniqueViolationError,
  ForeignKeyViolationError,
} from "db-errors";

import { TErrorResponse } from "@interfaces/adapters/api";
import { IGamesInteractions } from "@use-cases/interactions/games";

import {
  EGamePlatform,
  IGame,
  TGameCreationData,
  TGameModificationData,
} from "@entities/models/game";

import { IReviewsInteractions } from "@use-cases/interactions/reviews";
import { IReview, TReviewCreationData } from "@entities/models/review";

@Route("games")
@Tags("games")
export class GamesController extends Controller {
  private gamesInteractions: IGamesInteractions;
  private reviewsInteractions: IReviewsInteractions;

  constructor(
    gamesInteractions: IGamesInteractions,
    reviewsInteractions: IReviewsInteractions
  ) {
    super();

    this.gamesInteractions = gamesInteractions;
    this.reviewsInteractions = reviewsInteractions;
  }

  @Get("{gameId}")
  public async getGame(
    @Res()
    notFoundResponse: TsoaResponse<
      StatusCode.ClientErrorNotFound,
      TErrorResponse
    >,
    @Path()
    gameId: string
  ): Promise<IGame | void> {
    const game = await this.gamesInteractions.getGame(gameId);

    if (game) {
      return game;
    } else {
      notFoundResponse(StatusCode.ClientErrorNotFound, {
        message: "Game not found",
      });
    }
  }

  @Get()
  public async getGames(
    @Query() page = 1,
    @Query() platform?: EGamePlatform
  ): Promise<IGame[]> {
    return await this.gamesInteractions.listGames(page, platform);
  }

  @Post()
  @SuccessResponse(StatusCode.SuccessCreated, "Created")
  public async postGame(
    @Res()
    duplicatedResponse: TsoaResponse<
      StatusCode.ClientErrorConflict,
      TErrorResponse
    >,
    @Body() gameCreationData: TGameCreationData
  ): Promise<IGame | void> {
    this.setStatus(StatusCode.SuccessCreated);

    try {
      return await this.gamesInteractions.addGame(gameCreationData);
    } catch (error) {
      const wrappedError = wrapError(error);
      if (wrappedError instanceof UniqueViolationError) {
        duplicatedResponse(StatusCode.ClientErrorConflict, {
          message: "Game already exist",
        });
      } else throw wrappedError;
    }
  }

  @Patch("{gameId}")
  public async patchGame(
    @Res()
    notFoundResponse: TsoaResponse<
      StatusCode.ClientErrorNotFound,
      TErrorResponse
    >,
    @Path()
    gameId: string,
    @Body()
    gameModificationsParams: TGameModificationData
  ): Promise<IGame | void> {
    const game = await this.gamesInteractions.editGame(
      gameId,
      gameModificationsParams
    );
    if (game) {
      return game;
    } else {
      notFoundResponse(StatusCode.ClientErrorNotFound, {
        message: "Game not found",
      });
    }
  }

  @Delete("{gameId}")
  @SuccessResponse(StatusCode.SuccessNoContent, "Deleted")
  public async deleteGame(
    @Path()
    gameId: string
  ): Promise<void> {
    this.setStatus(StatusCode.SuccessNoContent);
    return await this.gamesInteractions.removeGame(gameId);
  }

  @Get("{gameId}/reviews")
  @Tags("reviews")
  public async getGameReviews(
    @Path() gameId: string,
    @Query() page = 1
  ): Promise<IReview[]> {
    return await this.reviewsInteractions.listReviews(gameId, page);
  }

  @Post("{gameId}/reviews")
  @Tags("reviews")
  @SuccessResponse(StatusCode.SuccessCreated, "Created")
  public async postGameReview(
    @Path() gameId: string,
    @Body() review: Omit<TReviewCreationData, "gameId">,
    @Res()
    duplicatedResponse: TsoaResponse<
      StatusCode.ClientErrorConflict,
      TErrorResponse
    >,
    @Res()
    notFoundResponse: TsoaResponse<
      StatusCode.ClientErrorNotFound,
      TErrorResponse
    >
  ): Promise<IReview | void> {
    this.setStatus(StatusCode.SuccessCreated);

    try {
      return await this.reviewsInteractions.addReview({ ...review, gameId });
    } catch (error) {
      const wrappedError = wrapError(error);
      if (wrappedError instanceof ForeignKeyViolationError) {
        let entityName;
        switch (error.constraint) {
          case "reviews_gameid_foreign":
            entityName = "Game";
            break;

          case "reviews_reviewerid_foreign":
            entityName = "Player";
            break;

          default:
            entityName = "unknown entity";
        }

        notFoundResponse(StatusCode.ClientErrorNotFound, {
          message: `${entityName} does not exist`,
        });
      } else if (wrappedError instanceof UniqueViolationError) {
        duplicatedResponse(StatusCode.ClientErrorConflict, {
          message: "Game has already been reviewed by this player",
        });
      } else throw wrappedError;
    }
  }
}
