import {
  EGamePlatform,
  IGame,
  IGameFactory,
  TGameCreationData,
  TGameModificationData,
} from "@entities/models/game";
import { IGamesRepository } from "@use-cases/dependencies/repositories/IGamesRepository";

import EventEmitter from "events";
import { IGamesInteractions } from "./_definitions/IGamesInteractions";

enum EVENTS {
  GAME_READ = "game.read",
}

export class GamesInteractions
  extends EventEmitter
  implements IGamesInteractions {
  private gamesRepository: IGamesRepository;
  private gameFactory: IGameFactory;

  public static EVENTS = EVENTS;

  constructor(gamesRepository: IGamesRepository, gameFactory: IGameFactory) {
    super();

    this.gamesRepository = gamesRepository;
    this.gameFactory = gameFactory;
  }

  public async getGame(gameId: string): Promise<IGame | undefined> {
    const game = await this.gamesRepository.findGame(gameId);

    if (game) this.emit(GamesInteractions.EVENTS.GAME_READ, game);

    return game;
  }

  public addGame(gameCreationData: TGameCreationData): Promise<IGame> {
    const game = this.gameFactory.createGame(gameCreationData);
    return this.gamesRepository.insertGame(game);
  }

  public async editGame(
    gameId: string,
    gameModificationData: TGameModificationData
  ): Promise<IGame | undefined> {
    let game = await this.gamesRepository.findGame(gameId);
    if (!game) return;

    game = this.gameFactory.createGame({
      ...game,
      ...gameModificationData,
    });

    return this.gamesRepository.updateGame(game);
  }

  public removeGame(gameId: string): Promise<void> {
    return this.gamesRepository.deleteGame(gameId);
  }

  public async listGames(
    page: number,
    platform?: EGamePlatform
  ): Promise<IGame[]> {
    const games = await this.gamesRepository.findGames(page, platform);
    games.forEach((game) =>
      this.emit(GamesInteractions.EVENTS.GAME_READ, game)
    );

    return games;
  }

  public async listGamesFromPlayerLibrary(
    playerId: string,
    page: number
  ): Promise<IGame[]> {
    const games = await this.gamesRepository.findGamesFromPlayerLibrary(
      playerId,
      page
    );

    games.forEach((game) =>
      this.emit(GamesInteractions.EVENTS.GAME_READ, game)
    );

    return games;
  }
}
