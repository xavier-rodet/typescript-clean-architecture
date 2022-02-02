import { ApiGameController } from '@interfaces/api/game/controller';
import { RemoveGameFromLibraryPresenter } from '@interfaces/api/game/presenters/admin/remove-game-from-library';
import { RemoveGameFromStorePresenter } from '@interfaces/api/game/presenters/admin/remove-game-from-store';
import { PurchaseGamesPresenter } from '@interfaces/api/game/presenters/player/purchase-games';
import { ViewGamePresenter } from '@interfaces/api/game/presenters/player/view-game';
import { ViewLibraryPresenter } from '@interfaces/api/game/presenters/player/view-library';
import { ViewStorePresenter } from '@interfaces/api/game/presenters/player/view-store';
import { PublishGamePresenter } from '@interfaces/api/game/presenters/publisher/publish-game';
import { UpdateGamePresenter } from '@interfaces/api/game/presenters/publisher/update-game';
import {
  removeGameFromStoreInteractor,
  removeGameFromLibraryInteractor,
} from '@di/use-cases/admin';
import {
  viewGameInteractor,
  viewStoreInteractor,
  viewLibraryInteractor,
  purchaseGamesInteractor,
} from '@di/use-cases/player';
import {
  publishGameInteractor,
  updateGameInteractor,
} from '@di/use-cases/publisher';

export const removeGameFromLibraryPresenter = new RemoveGameFromLibraryPresenter();
export const removeGameFromStorePresenter = new RemoveGameFromStorePresenter();
export const purchaseGamesPresenter = new PurchaseGamesPresenter();
export const viewGamePresenter = new ViewGamePresenter();
export const viewLibraryPresenter = new ViewLibraryPresenter();
export const viewStorePresenter = new ViewStorePresenter();
export const publishGamePresenter = new PublishGamePresenter();
export const updateGamePresenter = new UpdateGamePresenter();

export const apiGameController = new ApiGameController(
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
