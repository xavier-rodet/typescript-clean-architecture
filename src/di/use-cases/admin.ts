import { RemoveGameFromLibraryInteractor } from '@use-cases/admin/remove-game-from-library';
import { RemoveGameFromStoreInteractor } from '@use-cases/admin/remove-game-from-store';
import { AdminRemoveReviewInteractor } from '@use-cases/admin/remove-review';
import {
  libraryRepository,
  gameRepository,
  reviewRepository,
} from '../database/postgresql';
import { authorizationFactory } from '../libraries';

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
