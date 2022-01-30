import { Game } from '@entities/game';
import { IGameRepository } from '@use-cases/_common/database';
import { EntityNotFoundError } from '@use-cases/_common/database/error';
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

export type TViewGameParams = { gameId: string };
export type TViewGameInput = TAuthentication<TViewGameParams>;
export type TViewGameResult = Game;
export type TViewGameOutput = TEither<
  AuthorizationError | EntityNotFoundError,
  Game
>;

export interface IViewGameInteractor {
  execute(
    input: TViewGameInput,
    presenter: IPresenter<TViewGameOutput>
  ): Promise<void>;
}

export class ViewGameInteractor implements IViewGameInteractor {
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
    input: TViewGameInput,
    presenter: IPresenter<TViewGameOutput>
  ): Promise<void> {
    if (!this.authorization.isAllowed(input.authentication)) {
      return presenter.present({
        left: this.authorization.createError(),
      });
    }

    const game = await this.gameRepository.findById(input.params.gameId);

    if (!game) {
      return presenter.present({
        left: new EntityNotFoundError('game not found'),
      });
    }

    this.eventDispatcher.emit(EAppEvent.DISPLAY_GAME, game);

    return presenter.present({
      right: game,
    });
  }
}
