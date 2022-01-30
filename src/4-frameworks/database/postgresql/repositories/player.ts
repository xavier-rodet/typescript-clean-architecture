import { IPlayerFactory, Player, TPlayerSource } from '@entities/player';
import {
  EntityDuplicateError,
  IPlayerRepository,
} from '@use-cases/_common/database';
import { UniqueViolationError, wrapError } from 'db-errors';
import Knex from 'knex';
import { snakeCase } from 'lodash';
import { TComplete, TEither } from 'src/_common/typescript';
import { options } from '../config';

export class PlayerRepository implements IPlayerRepository {
  private readonly TABLE = 'players';
  private readonly FIELDS = this.createFields();

  constructor(private db: Knex, private playerFactory: IPlayerFactory) {}

  public async insert(
    player: Player
  ): Promise<TEither<EntityDuplicateError, void>> {
    try {
      await this.db(this.TABLE).insert(player);

      return {
        right: undefined,
      };
    } catch (error) {
      const wrappedError = wrapError(error as Error);
      switch (wrappedError.constructor) {
        case UniqueViolationError:
          return {
            left: new EntityDuplicateError('player already exist'),
          };

        default:
          throw wrappedError;
      }
    }
  }

  public update(player: Player): Promise<void> {
    return this.db(this.TABLE).where('id', player.id).update(player);
  }

  public delete(playerId: string): Promise<void> {
    return this.db(this.TABLE).where('id', playerId).delete();
  }

  public find(page = 1): Promise<Player[]> {
    return this.db(this.TABLE)
      .select<TPlayerSource[]>(this.FIELDS)
      .from(this.TABLE)
      .offset(options.ITEM_PER_PAGE * (page - 1))
      .limit(options.ITEM_PER_PAGE)
      .orderBy('id')
      .then((rows) => rows.map((row) => this.playerFactory.createPlayer(row)));
  }

  public findById(playerId: string): Promise<Player | undefined> {
    return this.db(this.TABLE)
      .select<TPlayerSource>(this.FIELDS)
      .from(this.TABLE)
      .where('id', playerId)
      .first()
      .then((row) => (row ? this.playerFactory.createPlayer(row) : row));
  }

  /***** Trick to generate string array of ISkillRight properties keys *****/
  /* Note: This is necessary to ensure our repository field selection is corresponding to our query right */
  /**********/
  private createFields(): string[] {
    const fields: TComplete<TPlayerSource> = {
      id: '',
      name: '',
      avatar: '',
      accountBalance: 0,
    };

    return Object.keys(fields).map(
      (field) => `${this.TABLE}.${snakeCase(field)}`
    );
  }
}
