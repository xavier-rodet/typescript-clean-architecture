import {
  RemoveGameFromLibraryInteractor,
  TRemoveGameFromLibraryInput,
} from '@use-cases/admin/remove-game-from-library';
import {
  RemoveGameFromStoreInteractor,
  TRemoveGameFromStoreInput,
} from '@use-cases/admin/remove-game-from-store';
import {
  PurchaseGamesInteractor,
  TPurchaseGamesInput,
} from '@use-cases/player/purchase-games';
import {
  TViewGameInput,
  ViewGameInteractor,
} from '@use-cases/player/view-game';
import {
  TViewLibraryInput,
  ViewLibraryInteractor,
} from '@use-cases/player/view-library';
import {
  TViewStoreInput,
  ViewStoreInteractor,
} from '@use-cases/player/view-store';
import {
  PublishGameInteractor,
  TPublishGameInput,
} from '@use-cases/publisher/publish-game';
import {
  TUpdateGameInput,
  UpdateGameInteractor,
} from '@use-cases/publisher/update-game';
import {
  RemoveGameFromLibraryPresenter,
  TRemoveGameFromLibraryResponse,
} from './presenters/admin/remove-game-from-library';
import {
  RemoveGameFromStorePresenter,
  TRemoveGameFromStoreResponse,
} from './presenters/admin/remove-game-from-store';
import {
  PurchaseGamesPresenter,
  TPurchaseGamesResponse,
} from './presenters/player/purchase-games';
import {
  TViewGameResponse,
  ViewGamePresenter,
} from './presenters/player/view-game';
import {
  TViewLibraryResponse,
  ViewLibraryPresenter,
} from './presenters/player/view-library';
import {
  TViewStoreResponse,
  ViewStorePresenter,
} from './presenters/player/view-store';
import {
  PublishGamePresenter,
  TPublishGameResponse,
} from './presenters/publisher/publish-game';
import {
  TUpdateGameResponse,
  UpdateGamePresenter,
} from './presenters/publisher/update-game';

export class ApiGameController {
  constructor(
    private viewGameInteractor: ViewGameInteractor,
    private viewGamePresenter: ViewGamePresenter,
    private viewStoreInteractor: ViewStoreInteractor,
    private viewStorePresenter: ViewStorePresenter,
    private publishGameInteractor: PublishGameInteractor,
    private publishGamePresenter: PublishGamePresenter,
    private updateGameInteractor: UpdateGameInteractor,
    private updateGamePresenter: UpdateGamePresenter,
    private removeGameFromStoreInteractor: RemoveGameFromStoreInteractor,
    private removeGameFromStorePresenter: RemoveGameFromStorePresenter,
    private viewLibraryInteractor: ViewLibraryInteractor,
    private viewLibraryPresenter: ViewLibraryPresenter,
    private purchaseGamesInteractor: PurchaseGamesInteractor,
    private purchaseGamesPresenter: PurchaseGamesPresenter,
    private removeGameFromLibraryInteractor: RemoveGameFromLibraryInteractor,
    private removeGameFromLibraryPresenter: RemoveGameFromLibraryPresenter
  ) {}

  public async getGame(input: TViewGameInput): Promise<TViewGameResponse> {
    const presenter = this.viewGamePresenter;
    await this.viewGameInteractor.execute(input, presenter);
    return presenter.getResponse();
  }

  public async getGames(input: TViewStoreInput): Promise<TViewStoreResponse> {
    const presenter = this.viewStorePresenter;
    await this.viewStoreInteractor.execute(input, presenter);
    return presenter.getResponse();
  }

  public async postGame(
    input: TPublishGameInput
  ): Promise<TPublishGameResponse> {
    const presenter = this.publishGamePresenter;
    await this.publishGameInteractor.execute(input, presenter);
    return presenter.getResponse();
  }

  public async patchGame(
    input: TUpdateGameInput
  ): Promise<TUpdateGameResponse> {
    const presenter = this.updateGamePresenter;
    await this.updateGameInteractor.execute(input, presenter);
    return presenter.getResponse();
  }

  public async deleteGame(
    input: TRemoveGameFromStoreInput
  ): Promise<TRemoveGameFromStoreResponse> {
    const presenter = this.removeGameFromStorePresenter;
    await this.removeGameFromStoreInteractor.execute(input, presenter);
    return presenter.getResponse();
  }

  public async getPlayerGames(
    input: TViewLibraryInput
  ): Promise<TViewLibraryResponse> {
    const presenter = this.viewLibraryPresenter;
    await this.viewLibraryInteractor.execute(input, presenter);
    return presenter.getResponse();
  }

  public async postPlayerGames(
    input: TPurchaseGamesInput
  ): Promise<TPurchaseGamesResponse> {
    const presenter = this.purchaseGamesPresenter;
    await this.purchaseGamesInteractor.execute(input, presenter);
    return presenter.getResponse();
  }

  public async deletePlayerGame(
    input: TRemoveGameFromLibraryInput
  ): Promise<TRemoveGameFromLibraryResponse> {
    const presenter = this.removeGameFromLibraryPresenter;
    await this.removeGameFromLibraryInteractor.execute(input, presenter);
    return presenter.getResponse();
  }
}
