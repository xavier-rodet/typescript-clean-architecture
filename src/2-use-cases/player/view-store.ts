import { EPlatform, Game } from '@entities/game';
import { IGameRepository } from '@use-cases/_common/database';
import { EAppEvent, IEventDispatcher } from '@use-cases/_common/events';
import { IPresenter } from '@use-cases/_common/presenter';
import {
  AuthorizationError,
  ERole,
  IAuthorization,
  IAuthorizationFactory,
  TAuthentication,
} from '@use-cases/_common/security';
import { TEither } from 'src/_common/typescript';

export type TViewStoreParams = {
  page?: number;
  platform?: EPlatform;
};
export type TViewStoreInput = TAuthentication<TViewStoreParams>;
export type TViewStoreResult = Game[];
export type TViewStoreOutput = TEither<AuthorizationError, TViewStoreResult>;

export interface IViewStoreInteractor {
  execute(
    input: TViewStoreInput,
    presenter: IPresenter<TViewStoreOutput>
  ): Promise<void>;
}

export class ViewStoreInteractor implements IViewStoreInteractor {
  private authorization: IAuthorization;

  constructor(
    authorizationFactory: IAuthorizationFactory,
    private gameRepository: IGameRepository,
    private eventDispatcher: IEventDispatcher
  ) {
    this.authorization = authorizationFactory.createAuthorization([
      ERole.PLAYER,
    ]);
  }

  public async execute(
    input: TViewStoreInput,
    presenter: IPresenter<TViewStoreOutput>
  ): Promise<void> {
    if (!this.authorization.isAllowed(input.authentication)) {
      return presenter.present({
        left: this.authorization.createError(),
      });
    }

    const games = await this.gameRepository.find(
      input.params.page,
      input.params.platform
    );

    games.forEach((game) =>
      this.eventDispatcher.emit(EAppEvent.DISPLAY_GAME, game)
    );

    return presenter.present({
      right: games,
    });
  }
}
