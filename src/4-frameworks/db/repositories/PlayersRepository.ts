import Knex from "knex";

import { options } from "../config";

import { IPlayer } from "@entities/models/player";
import { IPlayersRepository } from "@use-cases/dependencies/repositories/IPlayersRepository";

export class PlayersRepository implements IPlayersRepository {
  private db: Knex;
  private readonly table = "players";

  constructor(db: Knex) {
    this.db = db;
  }

  public findPlayers(page: number): Promise<IPlayer[]> {
    return this.db<IPlayer>(this.table)
      .offset(options.ITEM_PER_PAGE * (page - 1))
      .limit(options.ITEM_PER_PAGE);
  }

  public findPlayer(playerId: string): Promise<IPlayer | undefined> {
    return this.db<IPlayer>(this.table).where("id", playerId).first();
  }

  public insertPlayer(player: IPlayer): Promise<IPlayer> {
    return this.db<IPlayer>(this.table)
      .insert(player)
      .returning<IPlayer[]>("*")
      .then((items: IPlayer[]) => {
        return items[0];
      });
  }

  public updatePlayer(player: IPlayer): Promise<IPlayer | undefined> {
    return this.db<IPlayer>(this.table)
      .where("id", player.id)
      .update(player)
      .returning<IPlayer[]>("*")
      .then((items: IPlayer[]) => {
        return items.length > 0 ? items[0] : undefined;
      });
  }

  public deletePlayer(playerId: string): Promise<void> {
    return this.db<IPlayer>(this.table).where("id", playerId).delete();
  }
}
