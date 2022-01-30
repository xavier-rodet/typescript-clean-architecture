import { ISanitizer } from '@entities/_common/libraries/sanitizer';
import { IUid } from '@entities/_common/libraries/uid';

import { IReviewFactory, Review, TReviewSource } from '@entities/review';
import { Game, IGameFactory, TGameSource } from '@entities/game';
import { IPlayerFactory, Player, TPlayerSource } from '@entities/player';

export interface IEntityFactory
  extends IGameFactory,
    IPlayerFactory,
    IReviewFactory {}

export class EntityFactory implements IEntityFactory {
  constructor(private uid: IUid, private sanitizer: ISanitizer) {}

  public createGame(data: TGameSource): Game {
    return new Game(data, this.uid, this.sanitizer);
  }

  public createPlayer(data: TPlayerSource): Player {
    return new Player(data, this.uid, this.sanitizer);
  }

  public createReview(data: TReviewSource): Review {
    return new Review(data, this.uid, this.sanitizer);
  }
}
