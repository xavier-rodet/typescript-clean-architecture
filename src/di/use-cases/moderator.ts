import { ModeratorRemoveReviewInteractor } from '@use-cases/moderator/remove-review';
import { reviewRepository } from '../database/postgresql';
import { authorizationFactory } from '../libraries';

export const moderatorRemoveReviewInteractor = new ModeratorRemoveReviewInteractor(
  authorizationFactory,
  reviewRepository
);
