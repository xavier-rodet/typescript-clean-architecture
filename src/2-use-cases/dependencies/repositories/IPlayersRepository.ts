import { IPlayer } from "@entities/models/player";

export interface IPlayersRepository {
  findPlayers(page: number): Promise<IPlayer[]>;
  findPlayer(playerId: string): Promise<IPlayer | undefined>;
  insertPlayer(player: IPlayer): Promise<IPlayer>;
  updatePlayer(player: IPlayer): Promise<IPlayer | undefined>;
  deletePlayer(playerId: string): Promise<void>;
}
