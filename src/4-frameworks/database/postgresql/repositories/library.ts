import {
  EntityDuplicateError,
  EntityRelationNotFoundError,
  ILibraryRepository,
} from '@use-cases/_common/database';
import Knex from 'knex';
import { TEither } from 'src/_common/typescript';
import { ARepository } from './_common/repository';

export class LibraryRepository
  extends ARepository
  implements ILibraryRepository {
  private readonly TABLE = 'library';

  constructor(private db: Knex) {
    super('Library');
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
      return { right: undefined };
    } catch (error) {
      return {
        left: this.convertDbError<
          EntityDuplicateError | EntityRelationNotFoundError
        >(error as Error),
      };
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
