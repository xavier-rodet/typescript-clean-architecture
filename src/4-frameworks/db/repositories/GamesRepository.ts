import { EGamePlatform, IGame } from "@entities/models/game";

import { TGameTable } from "./_definitions/TGameTable";

import Knex from "knex";
import { options } from "../config";
import { IGamesRepository } from "@use-cases/dependencies/repositories/IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private db: Knex;
  private readonly TABLE = "games";
  private readonly FIELDS = [
    "id",
    "game",
    "platform",
    "created_at",
    "updated_at",
  ];

  constructor(db: Knex) {
    this.db = db;
  }

  public findGames(page: number, platform: EGamePlatform): Promise<IGame[]> {
    const query = this.db<TGameTable>(this.TABLE)
      .column(this.FIELDS)
      .select()
      .from(this.TABLE)
      .offset(options.ITEM_PER_PAGE * (page - 1))
      .limit(options.ITEM_PER_PAGE)
      .orderBy("id");

    if (platform) {
      query.where("platform", platform);
    }
    return query.then((rows) =>
      rows.map((row) => this.convertGameTableToGame(row))
    );
  }

  public findGame(gameId: string): Promise<IGame | undefined> {
    return this.db<TGameTable>(this.TABLE)
      .column(this.FIELDS)
      .select()
      .from(this.TABLE)
      .where("id", gameId)
      .first()
      .then((row) => (row ? this.convertGameTableToGame(row) : undefined));
  }

  public insertGame(game: IGame): Promise<IGame> {
    const insertData = this.convertGameToGameTable(game);

    return this.db(this.TABLE)
      .insert(insertData)
      .returning<TGameTable[]>(this.FIELDS)
      .then((rows: TGameTable[]) => this.convertGameTableToGame(rows[0]));
  }

  public updateGame(game: IGame): Promise<IGame | undefined> {
    const gameTable = this.convertGameToGameTable(game);

    return this.db(this.TABLE)
      .where("id", game.id)
      .update(gameTable)
      .returning<TGameTable[]>(this.FIELDS)
      .then((rows: TGameTable[]) => {
        return rows.length > 0
          ? this.convertGameTableToGame(rows[0])
          : undefined;
      });
  }

  public deleteGame(gameId: string): Promise<void> {
    return this.db<TGameTable>(this.TABLE).where("id", gameId).delete();
  }

  public findGamesFromPlayerLibrary(
    playerId: string,
    page = 1
  ): Promise<IGame[]> {
    return this.db<TGameTable>(this.TABLE)
      .column(this.FIELDS)
      .select()
      .from(this.TABLE)
      .innerJoin("library", "games.id", "library.game_id")
      .where("library.owner_id", playerId)
      .offset(options.ITEM_PER_PAGE * (page - 1))
      .limit(options.ITEM_PER_PAGE)
      .orderBy("games.created_at")
      .then((rows) => rows.map((row) => this.convertGameTableToGame(row)));
  }

  private convertGameTableToGame(gameTable: TGameTable): IGame {
    const game: IGame = {
      id: gameTable.id,
      ...gameTable.game,
      platform: gameTable.platform,
      createdAt: gameTable.created_at,
      updatedAt: gameTable.updated_at,
    };

    return game;
  }

  private convertGameToGameTable(game: IGame): TGameTable {
    const gameTable: TGameTable = {
      id: game.id,
      game: {
        name: game.name,
        price: game.price,
        genres: game.genres,
        releasedAt: game.releasedAt,
        readCount: game.readCount,
      },
      platform: game.platform,
      created_at: game.createdAt,
      updated_at: game.updatedAt,
    };

    return gameTable;
  }
}
