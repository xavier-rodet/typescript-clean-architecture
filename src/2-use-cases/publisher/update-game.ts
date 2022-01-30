import { EGenre, EPlatform, Game, IGameFactory } from '@entities/game';
import { IGameRepository } from '@use-cases/_common/database';
import { EntityNotFoundError } from '@use-cases/_common/database/error';
import { IPresenter } from '@use-cases/_common/presenter';
import {
  AuthorizationError,
  ERole,
  IAuthorization,
  IAuthorizationFactory,
  TAuthentication,
} from '@use-cases/_common/security';
import { TEither } from 'src/_common/typescript';

export type TUpdateGameParams = {
  id: string;
  name?: string;
  price?: number;
  genres?: EGenre[];
  releasedAt?: Date;
  readCount?: number;
  platform?: EPlatform;
};

export type TUpdateGameInput = TAuthentication<TUpdateGameParams>;
export type TUpdateGameResult = Game;
export type TUpdateGameOutput = TEither<
  AuthorizationError | EntityNotFoundError,
  TUpdateGameResult
>;

export interface IUpdateGameInteractor {
  execute(
    input: TUpdateGameInput,
    presenter: IPresenter<TUpdateGameOutput>
  ): Promise<void>;
}

export class UpdateGameInteractor implements IUpdateGameInteractor {
  private authorization: IAuthorization;

  constructor(
    authorizationFactory: IAuthorizationFactory,
    private gameFactory: IGameFactory,
    private gameRepository: IGameRepository
  ) {
    this.authorization = authorizationFactory.createAuthorization([
      ERole.PUBLISHER,
    ]);
  }

  public async execute(
    input: TUpdateGameInput,
    presenter: IPresenter<TUpdateGameOutput>
  ): Promise<void> {
    if (!this.authorization.isAllowed(input.authentication)) {
      return presenter.present({
        left: this.authorization.createError(),
      });
    }

    const { params } = input;
    const game = await this.gameRepository.findById(params.id);

    if (!game) {
      return presenter.present({
        left: new EntityNotFoundError('game not found'),
      });
    }

    const updatedGame = this.gameFactory.createGame({
      ...game,
      ...params,
    });
    await this.gameRepository.update(updatedGame);

    presenter.present({
      right: updatedGame,
    });
  }
}
