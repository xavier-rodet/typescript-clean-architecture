import {
  EntityDuplicateError,
  EntityRelationNotFoundError,
  ILibraryRepository,
} from '@use-cases/_common/database';
import {
  ForeignKeyViolationError,
  UniqueViolationError,
  wrapError,
} from 'db-errors';
import Knex from 'knex';
import { TEither } from 'src/_common/typescript';

export class LibraryRepository implements ILibraryRepository {
  private db: Knex;
  private readonly TABLE = 'library';

  constructor(db: Knex) {
    this.db = db;
  }

  public async insert(
    ownerId: string,
    gameId: string
  ): Promise<
    TEither<EntityDuplicateError | EntityRelationNotFoundError, void>
  > {
    try {
      await this.db(this.TABLE).insert({
        owner_id: ownerId,
        game_id: gameId,
      });

      return {
        right: undefined,
      };
    } catch (error) {
      const wrappedError = wrapError(error as Error);
      switch (wrappedError.constructor) {
        case UniqueViolationError:
          return {
            left: new EntityDuplicateError('game already owned by player'),
          };

        case ForeignKeyViolationError:
          return {
            left: new EntityRelationNotFoundError(
              'game or owner does not exist'
            ),
          };

        default:
          throw wrappedError;
      }
    }
  }

  public delete(ownerId: string, gameId: string): Promise<void> {
    return this.db(this.TABLE)
      .where('owner_id', ownerId)
      .andWhere('game_id', gameId)
      .delete();
  }

  public deleteGame(gameId: string): Promise<void> {
    return this.db(this.TABLE).where('game_id', gameId).delete();
  }

  public async findIn(ownerId: string, gameId: string): Promise<boolean> {
    const row = await this.db(this.TABLE)
      .from(this.TABLE)
      .where('owner_id', ownerId)
      .andWhere('game_id', gameId)
      .first();

    return !!row;
  }
}
