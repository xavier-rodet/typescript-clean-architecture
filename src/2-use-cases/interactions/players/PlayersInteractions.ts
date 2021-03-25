import {
  IPlayer,
  IPlayerFactory,
  TPlayerCreationData,
  TPlayerModificationData,
} from "@entities/models/player";
import { IPlayersRepository } from "@use-cases/dependencies/repositories/IPlayersRepository";
import { IPlayersInteractions } from "./_definitions/IPlayersInteractions";

export class PlayersInteractions implements IPlayersInteractions {
  private playersRepository: IPlayersRepository;
  private playerFactory: IPlayerFactory;

  constructor(
    playersRepository: IPlayersRepository,
    playerFactory: IPlayerFactory
  ) {
    this.playersRepository = playersRepository;
    this.playerFactory = playerFactory;
  }

  public getPlayer(playerId: string): Promise<IPlayer | undefined> {
    return this.playersRepository.findPlayer(playerId);
  }

  public addPlayer(playerCreationData: TPlayerCreationData): Promise<IPlayer> {
    const player = this.playerFactory.createPlayer(playerCreationData);
    return this.playersRepository.insertPlayer(player);
  }

  public async editPlayer(
    playerId: string,
    playerModificationData: TPlayerModificationData
  ): Promise<IPlayer | undefined> {
    let player = await this.playersRepository.findPlayer(playerId);
    if (!player) return;

    player = this.playerFactory.createPlayer({
      ...player,
      ...playerModificationData,
    });

    return this.playersRepository.updatePlayer(player);
  }

  public removePlayer(playerId: string): Promise<void> {
    return this.playersRepository.deletePlayer(playerId);
  }

  public listPlayers(page: number): Promise<IPlayer[]> {
    return this.playersRepository.findPlayers(page);
  }
}
