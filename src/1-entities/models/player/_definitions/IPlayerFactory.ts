import { IPlayer } from "./IPlayer";
import { TPlayerInputData } from "./TPlayerInputData";

export interface IPlayerFactory {
  createPlayer(data: TPlayerInputData): IPlayer;
}
