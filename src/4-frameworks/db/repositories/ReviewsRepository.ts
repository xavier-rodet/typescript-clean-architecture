import { IReview } from "@entities/models/review";
import { IReviewsRepository } from "@use-cases/dependencies/repositories/IReviewsRepository";
import Knex from "knex";
import { options } from "../config";

export class ReviewsRepository implements IReviewsRepository {
  private db: Knex;
  private readonly TABLE = "reviews";
  private readonly FIELDS = ["id", "gameId", "reviewerId", "message", "rating"];

  constructor(db: Knex) {
    this.db = db;
  }

  public findReview(reviewId: string): Promise<IReview | undefined> {
    return this.db<IReview>(this.TABLE)
      .column(this.FIELDS)
      .select()
      .from(this.TABLE)
      .where("id", reviewId)
      .first();
  }
  public findReviews(gameId: string, page: number): Promise<IReview[]> {
    return this.db<IReview>(this.TABLE)
      .column(this.FIELDS)
      .select()
      .from(this.TABLE)
      .where("gameId", gameId)
      .offset(options.ITEM_PER_PAGE * (page - 1))
      .limit(options.ITEM_PER_PAGE);
  }
  public insertReview(review: IReview): Promise<IReview> {
    return this.db<IReview>(this.TABLE)
      .insert(review)
      .returning<IReview[]>(this.FIELDS)
      .then((items: IReview[]) => {
        return items[0];
      });
  }
  public updateReview(review: IReview): Promise<IReview | undefined> {
    return this.db<IReview>(this.TABLE)
      .where("id", review.id)
      .update(review)
      .returning<IReview[]>(this.FIELDS)
      .then((items: IReview[]) => {
        return items.length > 0 ? items[0] : undefined;
      });
  }
  public deleteReview(reviewId: string): Promise<void> {
    return this.db<IReview>(this.TABLE).where("id", reviewId).delete();
  }
}
