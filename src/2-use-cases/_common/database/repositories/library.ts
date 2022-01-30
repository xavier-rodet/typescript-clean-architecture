import { TEither } from 'src/_common/typescript';
import { EntityDuplicateError, EntityRelationNotFoundError } from '../error';

export interface ILibraryRepository {
  insert(
    ownerId: string,
    gameId: string
  ): Promise<TEither<EntityDuplicateError | EntityRelationNotFoundError, void>>;
  delete(ownerId: string, gameId: string): Promise<void>;
  deleteGame(gameId: string): Promise<void>;
  findIn(ownerId: string, gameId: string): Promise<boolean>;
}
