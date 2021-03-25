import { IReview } from "@entities/models/review";
import { IReviewsRepository } from "@use-cases/dependencies/repositories/IReviewsRepository";
import Knex from "knex";
import { options } from "../config";

export class ReviewsRepository implements IReviewsRepository {
  private db: Knex;
  private readonly table = "reviews";

  constructor(db: Knex) {
    this.db = db;
  }

  public findReview(reviewId: string): Promise<IReview | undefined> {
    return this.db<IReview>(this.table).where("id", reviewId).first();
  }
  public findReviews(gameId: string, page: number): Promise<IReview[]> {
    return this.db<IReview>(this.table)
      .where("gameId", gameId)
      .offset(options.ITEM_PER_PAGE * (page - 1))
      .limit(options.ITEM_PER_PAGE);
  }
  public insertReview(review: IReview): Promise<IReview> {
    return this.db<IReview>(this.table)
      .insert(review)
      .returning<IReview[]>("*")
      .then((items: IReview[]) => {
        return items[0];
      });
  }
  public updateReview(review: IReview): Promise<IReview | undefined> {
    return this.db<IReview>(this.table)
      .where("id", review.id)
      .update(review)
      .returning<IReview[]>("*")
      .then((items: IReview[]) => {
        return items.length > 0 ? items[0] : undefined;
      });
  }
  public deleteReview(reviewId: string): Promise<void> {
    return this.db<IReview>(this.table).where("id", reviewId).delete();
  }
}
