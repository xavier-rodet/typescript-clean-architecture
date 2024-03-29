import { IReviewFactory, Review, TReviewSource } from '@entities/review';
import {
  IReviewRepository,
  EntityDuplicateError,
  EntityRelationNotFoundError,
} from '@use-cases/_common/database';
import Knex from 'knex';
import { snakeCase } from 'lodash';
import { TComplete, TEither } from 'src/_common/typescript';
import { options } from '../config';
import { ARepository } from './_common/repository';

export class ReviewRepository extends ARepository implements IReviewRepository {
  private readonly TABLE = 'reviews';
  private readonly FIELDS = this.createFields();

  constructor(private db: Knex, private reviewFactory: IReviewFactory) {
    super(Review.name);
  }

  public async insert(
    review: Review
  ): Promise<
    TEither<EntityDuplicateError | EntityRelationNotFoundError, void>
  > {
    try {
      await this.db(this.TABLE).insert(review);
      return { right: undefined };
    } catch (error) {
      return {
        left: this.convertDbError<
          EntityDuplicateError | EntityRelationNotFoundError
        >(error as Error),
      };
    }
  }

  public update(review: Review): Promise<void> {
    return this.db(this.TABLE).where('id', review.id).update(review);
  }

  public delete(reviewId: string): Promise<void> {
    return this.db(this.TABLE).where('id', reviewId).delete();
  }

  public findById(reviewId: string): Promise<Review | undefined> {
    return this.db(this.TABLE)
      .select<TReviewSource>(this.FIELDS)
      .from(this.TABLE)
      .where('id', reviewId)
      .first()
      .then((row) => (row ? this.reviewFactory.createReview(row) : row));
  }

  public findByGame(gameId: string, page = 1): Promise<Review[]> {
    return this.db(this.TABLE)
      .select<TReviewSource[]>(this.FIELDS)
      .from(this.TABLE)
      .where(`${this.TABLE}.game_id`, gameId)
      .offset(options.ITEM_PER_PAGE * (page - 1))
      .limit(options.ITEM_PER_PAGE)
      .orderBy('id')
      .then((rows) => rows.map((row) => this.reviewFactory.createReview(row)));
  }

  /***** Trick to generate string array of ISkillRight properties keys *****/
  /* Note: This is necessary to ensure our repository field selection is corresponding to our query right */
  /**********/
  private createFields(): string[] {
    const fields: TComplete<TReviewSource> = {
      id: '',
      gameId: '',
      reviewerId: '',
      message: '',
      rating: 0,
    };

    return Object.keys(fields).map(
      (field) => `${this.TABLE}.${snakeCase(field)}`
    );
  }
}
