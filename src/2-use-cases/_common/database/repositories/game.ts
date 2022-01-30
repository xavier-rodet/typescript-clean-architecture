import { EPlatform, Game } from '@entities/game';
import { TEither } from 'src/_common/typescript';
import { EntityDuplicateError } from '../error';

export interface IGameRepository {
  insert(game: Game): Promise<TEither<EntityDuplicateError, void>>;
  update(game: Game): Promise<void>;
  delete(gameId: string): Promise<void>;
  find(page?: number, platform?: EPlatform): Promise<Game[]>;
  findById(gameId: string): Promise<Game | undefined>;
  findByPlayer(playerId: string, page?: number): Promise<Game[]>;
}
