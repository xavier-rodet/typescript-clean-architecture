import { AddReviewInteractor } from '@use-cases/player/add-review';
import { PurchaseGamesInteractor } from '@use-cases/player/purchase-games';
import { PlayerRemoveReviewInteractor } from '@use-cases/player/remove-review';
import { ViewGameInteractor } from '@use-cases/player/view-game';
import { ViewLibraryInteractor } from '@use-cases/player/view-library';
import { ViewReviewsInteractor } from '@use-cases/player/view-reviews';
import { ViewStoreInteractor } from '@use-cases/player/view-store';
import {
  libraryRepository,
  reviewRepository,
  playerRepository,
  gameRepository,
} from '../database/postgresql';
import { entityFactory } from '../entities';
import { authorizationFactory, eventDispatcher } from '../libraries';

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
