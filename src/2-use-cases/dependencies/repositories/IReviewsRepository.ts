import { IReview } from "@entities/models/review";

export interface IReviewsRepository {
  findReview(reviewId: string): Promise<IReview | undefined>;
  findReviews(gameId: string, page: number): Promise<IReview[]>;
  insertReview(review: IReview): Promise<IReview>;
  updateReview(review: IReview): Promise<IReview | undefined>;
  deleteReview(reviewId: string): Promise<void>;
}
