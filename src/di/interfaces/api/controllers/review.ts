import { ApiReviewController } from '@interfaces/api/review/controller';
import { AdminRemoveReviewPresenter } from '@interfaces/api/review/presenters/admin/remove-review';
import { ModeratorRemoveReviewPresenter } from '@interfaces/api/review/presenters/moderator/remove-review';
import { AddReviewPresenter } from '@interfaces/api/review/presenters/player/add-review';
import { PlayerRemoveReviewPresenter } from '@interfaces/api/review/presenters/player/remove-review';
import { ViewReviewsPresenter } from '@interfaces/api/review/presenters/player/view-reviews';
import { adminRemoveReviewInteractor } from '@di/use-cases/admin';
import { moderatorRemoveReviewInteractor } from '@di/use-cases/moderator';
import {
  addReviewInteractor,
  playerRemoveReviewInteractor,
  viewReviewsInteractor,
} from '@di/use-cases/player';

export const addReviewPresenter = new AddReviewPresenter();
export const adminRemoveReviewPresenter = new AdminRemoveReviewPresenter();
export const moderatorRemoveReviewPresenter = new ModeratorRemoveReviewPresenter();
export const playerRemoveReviewPresenter = new PlayerRemoveReviewPresenter();

export const viewReviewPresenter = new ViewReviewsPresenter();

export const apiReviewController = new ApiReviewController(
  addReviewInteractor,
  addReviewPresenter,
  adminRemoveReviewInteractor,
  adminRemoveReviewPresenter,
  moderatorRemoveReviewInteractor,
  moderatorRemoveReviewPresenter,
  playerRemoveReviewInteractor,
  playerRemoveReviewPresenter,
  viewReviewsInteractor,
  viewReviewPresenter
);
