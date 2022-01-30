import {
  AddReviewInteractor,
  TAddReviewInput,
} from '@use-cases/player/add-review';
import { TRemoveReviewInput } from '@use-cases/_common/interactors/remove-review';
import {
  TViewReviewsInput,
  ViewReviewsInteractor,
} from '@use-cases/player/view-reviews';
import {
  AddReviewPresenter,
  TAddReviewResponse,
} from './presenters/player/add-review';
import {
  TViewReviewsResponse,
  ViewReviewsPresenter,
} from './presenters/player/view-reviews';
import { AdminRemoveReviewInteractor } from '@use-cases/admin/remove-review';
import { ModeratorRemoveReviewInteractor } from '@use-cases/moderator/remove-review';
import { PlayerRemoveReviewInteractor } from '@use-cases/player/remove-review';
import { PlayerRemoveReviewPresenter } from './presenters/player/remove-review';
import { AdminRemoveReviewPresenter } from './presenters/admin/remove-review';
import { ModeratorRemoveReviewPresenter } from './presenters/moderator/remove-review';

import { ERole } from '@use-cases/_common/security';
import { TRemoveReviewResponse } from './presenters/_common/remove-review';

export class ApiReviewController {
  constructor(
    private addReviewInteractor: AddReviewInteractor,
    private addReviewPresenter: AddReviewPresenter,
    private adminRemoveReviewInteractor: AdminRemoveReviewInteractor,
    private adminRemoveReviewPresenter: AdminRemoveReviewPresenter,
    private moderatorRemoveReviewInteractor: ModeratorRemoveReviewInteractor,
    private moderatorRemoveReviewPresenter: ModeratorRemoveReviewPresenter,
    private playerRemoveReviewInteractor: PlayerRemoveReviewInteractor,
    private playerRemoveReviewPresenter: PlayerRemoveReviewPresenter,
    private viewReviewsInteractor: ViewReviewsInteractor,
    private viewReviewsPresenter: ViewReviewsPresenter
  ) {}

  public async postReview(input: TAddReviewInput): Promise<TAddReviewResponse> {
    const presenter = this.addReviewPresenter;

    await this.addReviewInteractor.execute(input, presenter);
    return presenter.getResponse();
  }

  public async deleteReview(
    input: TRemoveReviewInput
  ): Promise<TRemoveReviewResponse> {
    switch (input.authentication.role) {
      case ERole.ADMIN:
        await this.adminRemoveReviewInteractor.execute(
          input,
          this.adminRemoveReviewPresenter
        );
        return this.adminRemoveReviewPresenter.getResponse();
        break;

      case ERole.MODERATOR:
        await this.moderatorRemoveReviewInteractor.execute(
          input,
          this.moderatorRemoveReviewPresenter
        );
        return this.moderatorRemoveReviewPresenter.getResponse();
        break;

      case ERole.PLAYER:
        await this.playerRemoveReviewInteractor.execute(
          input,
          this.playerRemoveReviewPresenter
        );
        return this.playerRemoveReviewPresenter.getResponse();
        break;

      default:
        throw new Error('invalid role to delete review');
    }
  }

  public async getGameReviews(
    input: TViewReviewsInput
  ): Promise<TViewReviewsResponse> {
    await this.viewReviewsInteractor.execute(input, this.viewReviewsPresenter);
    return this.viewReviewsPresenter.getResponse();
  }
}
