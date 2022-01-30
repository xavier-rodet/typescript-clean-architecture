import { Review } from '@entities/review';
import { TEither } from 'src/_common/typescript';
import { EntityDuplicateError, EntityRelationNotFoundError } from '../error';

export interface IReviewRepository {
  insert(
    review: Review
  ): Promise<TEither<EntityDuplicateError | EntityRelationNotFoundError, void>>;
  update(review: Review): Promise<void>;
  delete(reviewId: string): Promise<void>;
  findById(reviewId: string): Promise<Review | undefined>;
  findByGame(gameId: string, page?: number): Promise<Review[]>;
}
