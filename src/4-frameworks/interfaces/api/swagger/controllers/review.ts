import {
  Body,
  Get,
  Path,
  Post,
  SuccessResponse,
  Res,
  TsoaResponse,
  Delete,
  Query,
  Tags,
  Controller,
  Route,
} from 'tsoa';

import { TAddReviewParams } from '@use-cases/player/add-review';
import { TErrorResponse } from '../_common/response';
import { ApiReviewController } from '@interfaces/api/review/controller';
import { EHttpStatus } from '@interfaces/_common/http';
import { ERole } from '@use-cases/_common/security';
import { Review } from '@entities/review';

@Route('')
@Tags('reviews')
export class SwaggerReviewController extends Controller {
  constructor(private controller: ApiReviewController) {
    super();
  }

  @Get('games/{gameId}/reviews')
  @SuccessResponse(EHttpStatus.SuccessOK, 'OK')
  public async getGameReviews(
    @Path() gameId: string,
    @Query()
    page = 1,
    @Res()
    forbiddenResponse: TsoaResponse<
      EHttpStatus.ClientErrorForbidden,
      TErrorResponse
    >
  ): Promise<Review[]> {
    const either = await this.controller.getGameReviews({
      authentication: {
        role: ERole.PLAYER,
      },
      params: {
        gameId,
        page,
      },
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
    } else {
      return either.right.content;
    }
  }

  @Post('games/{gameId}/reviews')
  @SuccessResponse(EHttpStatus.SuccessCreated, 'Created')
  public async postGameReview(
    @Path() gameId: string,
    @Body() review: Omit<TAddReviewParams, 'gameId'>,
    @Res()
    duplicatedResponse: TsoaResponse<
      EHttpStatus.ClientErrorConflict,
      TErrorResponse
    >,
    @Res()
    unProcessableResponse: TsoaResponse<
      EHttpStatus.ClientErrorUnprocessableEntity,
      TErrorResponse
    >,
    @Res()
    forbiddenResponse: TsoaResponse<
      EHttpStatus.ClientErrorForbidden,
      TErrorResponse
    >
  ): Promise<Review> {
    const either = await this.controller.postReview({
      authentication: {
        role: ERole.PLAYER,
      },
      params: {
        gameId,
        ...review,
      },
    });

    const { status } = either.left ?? either.right;
    this.setStatus(status);

    if (either.left) {
      const { status, error } = either.left;

      switch (status) {
        case EHttpStatus.ClientErrorUnprocessableEntity:
          return unProcessableResponse(status, {
            error,
          });

        case EHttpStatus.ClientErrorConflict:
          return duplicatedResponse(status, {
            error,
          });

        case EHttpStatus.ClientErrorForbidden:
          return forbiddenResponse(status, {
            error,
          });
      }
    } else {
      return either.right.content;
    }
  }

  @Delete('reviews/{reviewId}')
  @SuccessResponse(EHttpStatus.SuccessNoContent, 'Deleted')
  public async deleteReview(
    @Path()
    reviewId: string,
    @Res()
    forbiddenResponse: TsoaResponse<
      EHttpStatus.ClientErrorForbidden,
      TErrorResponse
    >
  ): Promise<void> {
    const either = await this.controller.deleteReview({
      authentication: { role: ERole.PLAYER },
      params: { reviewId },
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
