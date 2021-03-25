import { IGame } from "./IGame";
import { TGameInputData } from "./TGameInputData";

export interface IGameFactory {
  createGame(data: TGameInputData): IGame;
}
