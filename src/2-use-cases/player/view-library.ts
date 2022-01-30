import { Game } from '@entities/game';
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

export type TViewLibraryParams = {
  playerId: string;
  page?: number;
};
export type TViewLibraryInput = TAuthentication<TViewLibraryParams>;
export type TViewLibraryResult = Game[];
export type TViewLibraryOutput = TEither<
  AuthorizationError,
  TViewLibraryResult
>;

export interface IViewLibraryInteractor {
  execute(
    input: TViewLibraryInput,
    presenter: IPresenter<TViewLibraryOutput>
  ): Promise<void>;
}

export class ViewLibraryInteractor implements IViewLibraryInteractor {
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
    input: TViewLibraryInput,
    presenter: IPresenter<TViewLibraryOutput>
  ): Promise<void> {
    if (!this.authorization.isAllowed(input.authentication)) {
      return presenter.present({
        left: this.authorization.createError(),
      });
    }

    const games = await this.gameRepository.findByPlayer(
      input.params.playerId,
      input.params.page
    );

    games.forEach((game) =>
      this.eventDispatcher.emit(EAppEvent.DISPLAY_GAME, game)
    );

    return presenter.present({
      right: games,
    });
  }
}
