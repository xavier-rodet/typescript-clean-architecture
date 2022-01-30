import {
  EGenre,
  EPlatform,
  Game,
  IGameFactory,
  TGameSource,
} from '@entities/game';

import Knex from 'knex';
import { options } from '../config';
import { IGameRepository } from '@use-cases/_common/database';

import { wrapError, UniqueViolationError } from 'db-errors';

import { EntityDuplicateError } from '@use-cases/_common/database';
import { TComplete, TEither } from 'src/_common/typescript';
import { snakeCase } from 'lodash';

export class GameRepository implements IGameRepository {
  private readonly TABLE = 'games';
  private readonly FIELDS = this.createFields();

  constructor(private db: Knex, private gameFactory: IGameFactory) {}

  public async insert(
    game: Game
  ): Promise<TEither<EntityDuplicateError, void>> {
    try {
      await this.db(this.TABLE).insert(game);

      return {
        right: undefined,
      };
    } catch (error) {
      const wrappedError = wrapError(error as Error);

      switch (wrappedError.constructor) {
        case UniqueViolationError:
          return {
            left: new EntityDuplicateError('game already exist'),
          };

        default:
          throw wrappedError;
      }
    }
  }

  public update(game: Game): Promise<void> {
    return this.db(this.TABLE).where('id', game.id).update(game);
  }

  public delete(gameId: string): Promise<void> {
    return this.db(this.TABLE).where('id', gameId).delete();
  }

  public find(page = 1, platform?: EPlatform): Promise<Game[]> {
    const query = this.db(this.TABLE)
      .select<TGameSource[]>(this.FIELDS)
      .from(this.TABLE)
      .offset(options.ITEM_PER_PAGE * (page - 1))
      .limit(options.ITEM_PER_PAGE)
      .orderBy('id');

    if (platform) {
      query.where('platform', platform);
    }

    return query.then((rows) =>
      rows.map((row) => this.gameFactory.createGame(row))
    );
  }

  public findById(gameId: string): Promise<Game | undefined> {
    return this.db(this.TABLE)
      .select<TGameSource>(this.FIELDS)
      .from(this.TABLE)
      .where('id', gameId)
      .first()
      .then((row) => (row ? this.gameFactory.createGame(row) : undefined));
  }

  public findByPlayer(playerId: string, page = 1): Promise<Game[]> {
    return this.db(this.TABLE)
      .select<TGameSource[]>(this.FIELDS)
      .from(this.TABLE)
      .innerJoin('library', 'library.game_id', 'games.id')
      .where('library.player_id', playerId)
      .offset(options.ITEM_PER_PAGE * (page - 1))
      .limit(options.ITEM_PER_PAGE)
      .then((rows) => rows.map((row) => this.gameFactory.createGame(row)));
  }

  /***** Trick to generate string array of ISkillResult properties keys *****/
  /* Note: This is necessary to ensure our repository field selection is corresponding to our query result */
  /**********/
  private createFields(): string[] {
    const fields: TComplete<TGameSource> = {
      id: '',
      name: '',
      price: 0,
      genre: EGenre.FPS,
      releasedAt: new Date(),
      readCount: 0,
      platform: EPlatform.PC,
      createdAt: new Date(),
    };

    return Object.keys(fields).map(
      (field) => `${this.TABLE}.${snakeCase(field)}`
    );
  }
}
