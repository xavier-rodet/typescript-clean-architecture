import { ISanitizer } from '@entities/_common/libraries/sanitizer';
import { IUid } from '@entities/_common/libraries/uid';
import { EntityError } from '@entities/_common/entity';

export type TReviewSource = {
  id?: string;
  gameId: string;
  reviewerId: string;
  message?: string;
  rating: number;
};

export interface IReviewFactory {
  createReview(reviewSource: TReviewSource): Review;
}

export class Review {
  public readonly id: string;
  public readonly gameId: string;
  public readonly reviewerId: string;
  public readonly message?: string;
  public readonly rating: number;

  constructor(reviewSource: TReviewSource, uid: IUid, sanitizer: ISanitizer) {
    this.id = reviewSource.id ?? uid.generate();
    this.gameId = reviewSource.gameId;
    this.reviewerId = reviewSource.reviewerId;
    if (reviewSource.message)
      this.message = sanitizer.sanitize(reviewSource.message);
    this.rating = reviewSource.rating;

    this.validation(uid);

    Object.freeze(this);
  }

  private validation(uid: IUid) {
    if (!uid.validate(this.id)) throw new EntityError('id format is invalid');

    if (!uid.validate(this.gameId))
      throw new EntityError('gameId format is invalid');

    if (!uid.validate(this.reviewerId))
      throw new EntityError('reviewerId format is invalid');

    const MESSAGE_MIN_LENGTH = 10;
    if (this.message && this.message.length < MESSAGE_MIN_LENGTH) {
      throw new EntityError('message is invalid', {
        minLength: MESSAGE_MIN_LENGTH,
      });
    }
  }
}
