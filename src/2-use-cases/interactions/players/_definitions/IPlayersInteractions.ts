import {
  IPlayer,
  TPlayerCreationData,
  TPlayerModificationData,
} from "@entities/models/player";

export interface IPlayersInteractions {
  getPlayer(playerId: string): Promise<IPlayer | undefined>;
  listPlayers(page: number): Promise<IPlayer[]>;
  addPlayer(playerCreationData: TPlayerCreationData): Promise<IPlayer>;
  editPlayer(
    playerId: string,
    playerModificationData: TPlayerModificationData
  ): Promise<IPlayer | undefined>;
  removePlayer(playerId: string): Promise<void>;
}
