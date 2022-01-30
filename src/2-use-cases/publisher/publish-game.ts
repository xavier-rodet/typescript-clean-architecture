import { EGenre, EPlatform, Game, IGameFactory } from '@entities/game';
import { IGameRepository } from '@use-cases/_common/database';
import { IPresenter } from '@use-cases/_common/presenter';
import {
  AuthorizationError,
  ERole,
  IAuthorization,
  IAuthorizationFactory,
  TAuthentication,
} from '@use-cases/_common/security';
import { TEither } from 'src/_common/typescript';

export type TPublishGameParams = {
  name: string;
  price: number;
  genre: EGenre;
  releasedAt?: Date;
  platform: EPlatform;
};
export type TPublishGameInput = TAuthentication<TPublishGameParams>;
export type TPublishGameResult = Game;
export type TPublishGameOutput = TEither<AuthorizationError, Game>;

export interface IPublishGameInteractor {
  execute(
    input: TPublishGameInput,
    presenter: IPresenter<TPublishGameOutput>
  ): Promise<void>;
}

export class PublishGameInteractor implements IPublishGameInteractor {
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
    input: TPublishGameInput,
    presenter: IPresenter<TPublishGameOutput>
  ): Promise<void> {
    if (!this.authorization.isAllowed(input.authentication)) {
      return presenter.present({
        left: this.authorization.createError(),
      });
    }

    const { params } = input;
    const game = this.gameFactory.createGame(params);
    await this.gameRepository.insert(game);

    return presenter.present({
      right: game,
    });
  }
}
