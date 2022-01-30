import { AddReviewPresenter } from '@interfaces/api/review/presenters/player/add-review';
import { AdminRemoveReviewPresenter } from '@interfaces/api/review/presenters/admin/remove-review';
import { ModeratorRemoveReviewPresenter } from '@interfaces/api/review/presenters/moderator/remove-review';
import { PlayerRemoveReviewPresenter } from '@interfaces/api/review/presenters/player/remove-review';
import { ViewReviewsPresenter } from '@interfaces/api/review/presenters/player/view-reviews';
import { ApiReviewController } from '@interfaces/api/review/controller';
import { SwaggerReviewController } from '@frameworks/interfaces/api/swagger/controllers/review';
import { SwaggerApi } from '@frameworks/interfaces/api/swagger';
import { SwaggerGameController } from '@frameworks/interfaces/api/swagger/controllers/game';
import { ApiGameController } from '@interfaces/api/game/controller';
import { RemoveGameFromLibraryPresenter } from '@interfaces/api/game/presenters/admin/remove-game-from-library';
import { RemoveGameFromStorePresenter } from '@interfaces/api/game/presenters/admin/remove-game-from-store';
import { PurchaseGamesPresenter } from '@interfaces/api/game/presenters/player/purchase-games';
import { ViewGamePresenter } from '@interfaces/api/game/presenters/player/view-game';
import { ViewStorePresenter } from '@interfaces/api/game/presenters/player/view-store';
import { PublishGamePresenter } from '@interfaces/api/game/presenters/publisher/publish-game';
import { UpdateGamePresenter } from '@interfaces/api/game/presenters/publisher/update-game';
import { ViewLibraryPresenter } from '@interfaces/api/game/presenters/player/view-library';
import { IocContainer } from 'tsoa';
import {
  addReviewInteractor,
  adminRemoveReviewInteractor,
  moderatorRemoveReviewInteractor,
  playerRemoveReviewInteractor,
  publishGameInteractor,
  purchaseGamesInteractor,
  removeGameFromLibraryInteractor,
  removeGameFromStoreInteractor,
  updateGameInteractor,
  viewGameInteractor,
  viewLibraryInteractor,
  viewReviewsInteractor,
  viewStoreInteractor,
} from 'src/di/use-cases';
import { correlator } from 'src/di/libraries';

/******************** GameController ********************/

const removeGameFromLibraryPresenter = new RemoveGameFromLibraryPresenter();
const removeGameFromStorePresenter = new RemoveGameFromStorePresenter();
const purchaseGamesPresenter = new PurchaseGamesPresenter();
const viewGamePresenter = new ViewGamePresenter();
const viewLibraryPresenter = new ViewLibraryPresenter();
const viewStorePresenter = new ViewStorePresenter();
const publishGamePresenter = new PublishGamePresenter();
const updateGamePresenter = new UpdateGamePresenter();

const apiGameController = new ApiGameController(
  viewGameInteractor,
  viewGamePresenter,
  viewStoreInteractor,
  viewStorePresenter,
  publishGameInteractor,
  publishGamePresenter,
  updateGameInteractor,
  updateGamePresenter,
  removeGameFromStoreInteractor,
  removeGameFromStorePresenter,
  viewLibraryInteractor,
  viewLibraryPresenter,
  purchaseGamesInteractor,
  purchaseGamesPresenter,
  removeGameFromLibraryInteractor,
  removeGameFromLibraryPresenter
);
/******************** GameController ********************/

/******************** ReviewController ********************/
const addReviewPresenter = new AddReviewPresenter();
const adminRemoveReviewPresenter = new AdminRemoveReviewPresenter();
const moderatorRemoveReviewPresenter = new ModeratorRemoveReviewPresenter();
const playerRemoveReviewPresenter = new PlayerRemoveReviewPresenter();

const viewReviewPresenter = new ViewReviewsPresenter();

const apiReviewController = new ApiReviewController(
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
/******************** ReviewController ********************/

// ----------------------------------------------------------------------------------------------------------

/******************** Swagger ********************/
const controllers: Record<string, unknown> = {};
controllers[SwaggerGameController.name] = new SwaggerGameController(
  apiGameController
);
controllers[SwaggerReviewController.name] = new SwaggerReviewController(
  apiReviewController
);

// This will be called by TSOA to get controllers instances!
// See tsoa.json & https://tsoa-community.github.io/docs/di.html#ioc-module
class TsoaContainer implements IocContainer {
  private iocContainer: Record<string, unknown>;

  constructor(iocContainer: Record<string, unknown>) {
    this.iocContainer = iocContainer;
  }

  get<T>(controller: { prototype: T; name: string }): T {
    console.log('get controller', controller);

    return this.iocContainer[controller.name] as T;
  }
}
export const iocContainer = new TsoaContainer(controllers);

export const swaggerApi = new SwaggerApi(correlator);
/******************** Swagger  ********************/
