import { RemoveGameFromLibraryInteractor } from '@use-cases/admin/remove-game-from-library';
import { RemoveGameFromStoreInteractor } from '@use-cases/admin/remove-game-from-store';
import { AdminRemoveReviewInteractor } from '@use-cases/admin/remove-review';
import { ModeratorRemoveReviewInteractor } from '@use-cases/moderator/remove-review';
import { AddReviewInteractor } from '@use-cases/player/add-review';
import { PurchaseGamesInteractor } from '@use-cases/player/purchase-games';
import { PlayerRemoveReviewInteractor } from '@use-cases/player/remove-review';
import { ViewGameInteractor } from '@use-cases/player/view-game';
import { ViewLibraryInteractor } from '@use-cases/player/view-library';
import { ViewReviewsInteractor } from '@use-cases/player/view-reviews';
import { ViewStoreInteractor } from '@use-cases/player/view-store';
import { PublishGameInteractor } from '@use-cases/publisher/publish-game';
import { UpdateGameInteractor } from '@use-cases/publisher/update-game';
import { AuthorizationFactory } from '@use-cases/_common/security';
import {
  gameRepository,
  libraryRepository,
  playerRepository,
  reviewRepository,
} from './database/postgresql';
import { entityFactory } from './entities';
import { eventDispatcher } from './libraries';

export const authorizationFactory = new AuthorizationFactory();

/******************** @use-cases / admin ********************/
export const removeGameFromLibraryInteractor = new RemoveGameFromLibraryInteractor(
  authorizationFactory,
  libraryRepository
);
export const removeGameFromStoreInteractor = new RemoveGameFromStoreInteractor(
  authorizationFactory,
  libraryRepository,
  gameRepository
);
export const adminRemoveReviewInteractor = new AdminRemoveReviewInteractor(
  authorizationFactory,
  reviewRepository
);
/******************** @use-cases / admin ********************/

/******************** @use-cases / moderator ********************/
export const moderatorRemoveReviewInteractor = new ModeratorRemoveReviewInteractor(
  authorizationFactory,
  reviewRepository
);
/******************** @use-cases / moderator ********************/

/******************** @use-cases / player ********************/
export const addReviewInteractor = new AddReviewInteractor(
  authorizationFactory,
  libraryRepository,
  entityFactory,
  reviewRepository
);
export const purchaseGamesInteractor = new PurchaseGamesInteractor(
  authorizationFactory,
  libraryRepository,
  playerRepository,
  entityFactory
);
export const playerRemoveReviewInteractor = new PlayerRemoveReviewInteractor(
  authorizationFactory,
  reviewRepository
);
export const viewGameInteractor = new ViewGameInteractor(
  authorizationFactory,
  gameRepository,
  eventDispatcher
);
export const viewLibraryInteractor = new ViewLibraryInteractor(
  authorizationFactory,
  gameRepository,
  eventDispatcher
);
export const viewReviewsInteractor = new ViewReviewsInteractor(
  authorizationFactory,
  reviewRepository
);
export const viewStoreInteractor = new ViewStoreInteractor(
  authorizationFactory,
  gameRepository,
  eventDispatcher
);
/******************** @use-cases / player ********************/

/******************** @use-cases / publisher ********************/
export const publishGameInteractor = new PublishGameInteractor(
  authorizationFactory,
  entityFactory,
  gameRepository
);
export const updateGameInteractor = new UpdateGameInteractor(
  authorizationFactory,
  entityFactory,
  gameRepository
);
/******************** @use-cases / publisher ********************/
