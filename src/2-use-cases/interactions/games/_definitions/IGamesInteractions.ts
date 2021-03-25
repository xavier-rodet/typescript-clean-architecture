import {
  EGamePlatform,
  IGame,
  TGameCreationData,
  TGameModificationData,
} from "@entities/models/game";
import { EventEmitter } from "events";

export interface IGamesInteractions extends EventEmitter {
  getGame(gameId: string): Promise<IGame | undefined>;
  listGames(page: number, platform?: EGamePlatform): Promise<IGame[]>;
  addGame(gameCreationData: TGameCreationData): Promise<IGame>;
  editGame(
    gameId: string,
    gameModificationData: TGameModificationData
  ): Promise<IGame | undefined>;
  removeGame(gameId: string): Promise<void>;

  listGamesFromPlayerLibrary(playerId: string, page: number): Promise<IGame[]>;
}
