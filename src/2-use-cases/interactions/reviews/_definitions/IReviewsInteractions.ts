import {
  IReview,
  TReviewCreationData,
  TReviewModificationData,
} from "@entities/models/review";

export interface IReviewsInteractions {
  getReview(reviewId: string): Promise<IReview | undefined>;
  listReviews(gameId: string, page: number): Promise<IReview[]>;
  addReview(reviewCreationData: TReviewCreationData): Promise<IReview>;
  editReview(
    reviewId: string,
    reviewModificationData: TReviewModificationData
  ): Promise<IReview | undefined>;
  removeReview(reviewId: string): Promise<void>;
}
