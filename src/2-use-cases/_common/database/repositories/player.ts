import { Player } from '@entities/player';
import { TEither } from 'src/_common/typescript';
import { EntityDuplicateError } from '../error';

export interface IPlayerRepository {
  insert(player: Player): Promise<TEither<EntityDuplicateError, void>>;
  update(player: Player): Promise<void>;
  delete(playerId: string): Promise<void>;
  find(page?: number): Promise<Player[]>;
  findById(playerId: string): Promise<Player | undefined>;
}
