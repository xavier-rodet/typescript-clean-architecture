import { ISanitizer } from '@entities/_common/libraries/sanitizer';
import { IUid } from '@entities/_common/libraries/uid';
import { EntityError } from '@entities/_common/entity';

export enum EGenre {
  FPS = 'fps',
  TPS = 'tps',
  RTS = 'rts',
  RPG = 'rpg',
  MOBA = 'moba',
}

export enum EPlatform {
  PC = 'pc',
  PLAYSTATION = 'playstation',
  XBOX = 'xbox',
}

export type TGameSource = {
  id?: string;
  name: string;
  price: number;
  genre: EGenre;
  releasedAt?: Date;
  readCount?: number;
  platform: EPlatform;
  createdAt?: Date;
};

export interface IGameFactory {
  createGame(gameSource: TGameSource): Game;
}

export class Game {
  public readonly id: string;
  public readonly name: string;
  public readonly price: number;
  public readonly genre: EGenre;
  public readonly releasedAt?: Date;
  public readonly readCount: number;
  public readonly platform: EPlatform;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(gameSource: TGameSource, uid: IUid, sanitizer: ISanitizer) {
    this.id = gameSource.id ?? uid.generate();
    this.name = sanitizer.sanitize(gameSource.name);
    this.price = gameSource.price;
    this.genre = gameSource.genre;
    this.releasedAt = gameSource.releasedAt;
    this.readCount = gameSource.readCount ?? 0;
    this.platform = gameSource.platform;
    this.createdAt = gameSource.createdAt ?? new Date();
    this.updatedAt = new Date();

    this.validation(uid);
    Object.freeze(this);
  }

  private validation(uid: IUid) {
    if (!uid.validate(this.id)) throw new EntityError('id format is invalid');

    const NAME_MAX_LENGTH = 50;
    if (this.name.length > NAME_MAX_LENGTH) {
      throw new EntityError('name is invalid', {
        maxLength: NAME_MAX_LENGTH,
      });
    }
  }
}
