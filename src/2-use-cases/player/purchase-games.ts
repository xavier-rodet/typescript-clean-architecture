import { Game } from '@entities/game';
import { IPlayerFactory } from '@entities/player';
import {
  ILibraryRepository,
  IPlayerRepository,
} from '@use-cases/_common/database';
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

export type TPurchaseGamesParams = {
  playerId: string;
  games: Game[];
};
export type TPurchaseGamesInput = TAuthentication<TPurchaseGamesParams>;
export type TPurchaseGamesResult = {
  games: Game[];
  playerAccountBalance: number;
};
export type TPurchaseGamesOutput = TEither<
  AuthorizationError | EntityNotFoundError,
  TPurchaseGamesResult
>;

export interface IPurchaseGamesInteractor {
  execute(
    input: TPurchaseGamesInput,
    presenter: IPresenter<TPurchaseGamesOutput>
  ): Promise<void>;
}

export class PurchaseGamesInteractor implements IPurchaseGamesInteractor {
  private authorization: IAuthorization;

  constructor(
    authorizationFactory: IAuthorizationFactory,
    private libraryRepository: ILibraryRepository,
    private playerRepository: IPlayerRepository,
    private playerFactory: IPlayerFactory
  ) {
    this.authorization = authorizationFactory.createAuthorization([
      ERole.PLAYER,
    ]);
  }

  public async execute(
    input: TPurchaseGamesInput,
    presenter: IPresenter<TPurchaseGamesOutput>
  ): Promise<void> {
    if (!this.authorization.isAllowed(input.authentication)) {
      return presenter.present({
        left: this.authorization.createError(),
      });
    }

    const { params } = input;
    const totalGamesPrice = params.games.reduce(
      (sum, game) => sum + game.price,
      0
    );

    const player = await this.playerRepository.findById(params.playerId);
    if (!player) {
      return presenter.present({
        left: new EntityNotFoundError('player not found'),
      });
    }

    const playerNewAccountBalance = player.accountBalance - totalGamesPrice;

    if (playerNewAccountBalance <= 0) {
      return presenter.present({
        left: new AuthorizationError(
          'account balance is too low for this purchase'
        ),
      });
    }

    // TODO: handle multiple repository queries transactionnally
    await Promise.all(
      params.games.map((game) =>
        this.libraryRepository.insert(params.playerId, game.id)
      )
    );

    const updatedPlayer = this.playerFactory.createPlayer({
      ...player,
      accountBalance: playerNewAccountBalance,
    });
    await this.playerRepository.update(updatedPlayer);

    return presenter.present({
      right: {
        games: params.games,
        playerAccountBalance: playerNewAccountBalance,
      },
    });
  }
}
