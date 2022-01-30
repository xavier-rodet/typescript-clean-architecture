import { EPlatform, Game } from '@entities/game';
import { ApiGameController } from '@interfaces/api/game/controller';
import { EHttpStatus } from '@interfaces/_common/http';
import { TPublishGameParams } from '@use-cases/publisher/publish-game';
import { TUpdateGameParams } from '@use-cases/publisher/update-game';
import { ERole } from '@use-cases/_common/security';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Query,
  Res,
  Route,
  SuccessResponse,
  Tags,
  TsoaResponse,
} from 'tsoa';
import { TErrorResponse } from '../_common/response';

@Route('')
@Tags('games')
export class SwaggerGameController extends Controller {
  constructor(private controller: ApiGameController) {
    super();
  }

  @Get('games/{gameId}')
  @SuccessResponse(EHttpStatus.SuccessOK, 'OK')
  public async getGame(
    @Path() gameId: string,
    @Res()
    forbiddenResponse: TsoaResponse<
      EHttpStatus.ClientErrorForbidden,
      TErrorResponse
    >,
    @Res()
    notFoundResponse: TsoaResponse<
      EHttpStatus.ClientErrorNotFound,
      TErrorResponse
    >
  ): Promise<Game> {
    const either = await this.controller.getGame({
      authentication: { role: ERole.PLAYER },
      params: { gameId },
    });

    const { status } = either.left ?? either.right;
    this.setStatus(status);

    if (either.left) {
      const { status, error } = either.left;

      switch (status) {
        case EHttpStatus.ClientErrorForbidden:
          return forbiddenResponse(status, {
            error,
          });

        case EHttpStatus.ClientErrorNotFound:
          return notFoundResponse(status, {
            error,
          });
      }
    }

    return either.right.content;
  }

  @Get('games')
  @SuccessResponse(EHttpStatus.SuccessOK, 'OK')
  public async getGames(
    @Res()
    forbiddenResponse: TsoaResponse<
      EHttpStatus.ClientErrorForbidden,
      TErrorResponse
    >,
    @Res()
    notFoundResponse: TsoaResponse<
      EHttpStatus.ClientErrorNotFound,
      TErrorResponse
    >,
    @Query() page = 1,
    @Query() platform?: EPlatform
  ): Promise<Game[]> {
    const either = await this.controller.getGames({
      authentication: { role: ERole.PLAYER },
      params: { page, platform },
    });
    const { status } = either.left ?? either.right;
    this.setStatus(status);

    if (either.left) {
      const { status, error } = either.left;

      switch (status) {
        case EHttpStatus.ClientErrorForbidden:
          return forbiddenResponse(status, {
            error,
          });

        case EHttpStatus.ClientErrorNotFound:
          return notFoundResponse(status, {
            error,
          });
      }
    }

    return either.right.content;
  }

  @Post('games')
  @SuccessResponse(EHttpStatus.SuccessCreated, 'Created')
  public async postGame(
    @Body() game: TPublishGameParams,
    @Res()
    forbiddenResponse: TsoaResponse<
      EHttpStatus.ClientErrorForbidden,
      TErrorResponse
    >
  ): Promise<Game> {
    const either = await this.controller.postGame({
      authentication: { role: ERole.PUBLISHER },
      params: game,
    });
    const { status } = either.left ?? either.right;
    this.setStatus(status);

    if (either.left) {
      const { status, error } = either.left;

      switch (status) {
        case EHttpStatus.ClientErrorForbidden:
          return forbiddenResponse(status, {
            error,
          });
      }
    }

    return either.right.content;
  }

  @Patch('games/{gameId}')
  @SuccessResponse(EHttpStatus.SuccessOK, 'OK')
  public async patchGame(
    @Body() game: Omit<TUpdateGameParams, 'id'>,
    @Path() gameId: string,
    @Res()
    forbiddenResponse: TsoaResponse<
      EHttpStatus.ClientErrorForbidden,
      TErrorResponse
    >,
    @Res()
    notFoundResponse: TsoaResponse<
      EHttpStatus.ClientErrorNotFound,
      TErrorResponse
    >
  ): Promise<Game> {
    const either = await this.controller.patchGame({
      authentication: { role: ERole.PUBLISHER },
      params: { id: gameId, ...game },
    });

    const { status } = either.left ?? either.right;
    this.setStatus(status);

    if (either.left) {
      const { status, error } = either.left;

      switch (status) {
        case EHttpStatus.ClientErrorForbidden:
          return forbiddenResponse(status, {
            error,
          });

        case EHttpStatus.ClientErrorNotFound:
          return notFoundResponse(status, {
            error,
          });
      }
    }

    return either.right.content;
  }

  @Delete('games/{gameId}')
  @SuccessResponse(EHttpStatus.SuccessNoContent, 'Deleted')
  public async deleteGame(
    @Path() gameId: string,
    @Res()
    forbiddenResponse: TsoaResponse<
      EHttpStatus.ClientErrorForbidden,
      TErrorResponse
    >
  ): Promise<void> {
    const either = await this.controller.deleteGame({
      authentication: { role: ERole.ADMIN },
      params: { gameId },
    });

    const { status } = either.left ?? either.right;
    this.setStatus(status);

    if (either.left) {
      const { status, error } = either.left;

      switch (status) {
        case EHttpStatus.ClientErrorForbidden:
          return forbiddenResponse(status, {
            error,
          });
      }
    }

    return either.right.content;
  }

  @Post('players/{playerId}/games')
  @SuccessResponse(EHttpStatus.SuccessCreated, 'Created')
  public async postPlayerGames(
    @Path() playerId: string,
    @Body() games: Game[],
    @Res()
    forbiddenResponse: TsoaResponse<
      EHttpStatus.ClientErrorForbidden,
      TErrorResponse
    >,
    @Res()
    notFoundResponse: TsoaResponse<
      EHttpStatus.ClientErrorNotFound,
      TErrorResponse
    >
  ): Promise<Game[]> {
    const either = await this.controller.postPlayerGames({
      authentication: { role: ERole.PLAYER },
      params: { playerId, games },
    });

    const { status } = either.left ?? either.right;
    this.setStatus(status);

    if (either.left) {
      const { status, error } = either.left;

      switch (status) {
        case EHttpStatus.ClientErrorForbidden:
          return forbiddenResponse(status, {
            error,
          });

        case EHttpStatus.ClientErrorNotFound:
          return notFoundResponse(status, {
            error,
          });
      }
    }

    return either.right.content;
  }

  @Delete('players/{playerId}/games')
  @SuccessResponse(EHttpStatus.SuccessNoContent, 'Deleted')
  public async deletePlayerGame(
    @Path() playerId: string,
    @Body() game: Game,
    @Res()
    forbiddenResponse: TsoaResponse<
      EHttpStatus.ClientErrorForbidden,
      TErrorResponse
    >
  ): Promise<void> {
    const either = await this.controller.deletePlayerGame({
      authentication: {
        role: ERole.ADMIN,
      },
      params: { playerId, gameId: game.id },
    });

    const { status } = either.left ?? either.right;
    this.setStatus(status);

    if (either.left) {
      const { status, error } = either.left;

      switch (status) {
        case EHttpStatus.ClientErrorForbidden:
          return forbiddenResponse(status, {
            error,
          });
      }
    }

    return either.right.content;
  }
}
