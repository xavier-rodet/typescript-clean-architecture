import { EGamePlatform, IGame } from "@entities/models/game";

export interface IGamesRepository {
  findGames(page: number, platform?: EGamePlatform): Promise<IGame[]>;
  findGame(gameId: string): Promise<IGame | undefined>;
  insertGame(game: IGame): Promise<IGame>;
  updateGame(game: IGame): Promise<IGame | undefined>;
  deleteGame(gameId: string): Promise<void>;

  findGamesFromPlayerLibrary(playerId: string, page?: number): Promise<IGame[]>;
}
