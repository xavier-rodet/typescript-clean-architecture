import {
  IReview,
  IReviewFactory,
  TReviewCreationData,
  TReviewModificationData,
} from "@entities/models/review";
import { IReviewsRepository } from "@use-cases/dependencies/repositories/IReviewsRepository";
import { IReviewsInteractions } from "./_definitions/IReviewsInteractions";

export class ReviewsInteractions implements IReviewsInteractions {
  private reviewsRepository: IReviewsRepository;
  private reviewFactory: IReviewFactory;

  constructor(
    reviewsRepository: IReviewsRepository,
    reviewFactory: IReviewFactory
  ) {
    this.reviewsRepository = reviewsRepository;
    this.reviewFactory = reviewFactory;
  }

  public getReview(reviewId: string): Promise<IReview | undefined> {
    return this.reviewsRepository.findReview(reviewId);
  }
  public listReviews(gameId: string, page: number): Promise<IReview[]> {
    return this.reviewsRepository.findReviews(gameId, page);
  }
  public addReview(reviewCreationData: TReviewCreationData): Promise<IReview> {
    const review = this.reviewFactory.createReview(reviewCreationData);
    return this.reviewsRepository.insertReview(review);
  }
  public async editReview(
    reviewId: string,
    reviewModificationData: TReviewModificationData
  ): Promise<IReview | undefined> {
    let review = await this.reviewsRepository.findReview(reviewId);
    if (!review) return;

    review = this.reviewFactory.createReview({
      ...review,
      ...reviewModificationData,
    });

    return this.reviewsRepository.updateReview(review);
  }
  public removeReview(reviewId: string): Promise<void> {
    return this.reviewsRepository.deleteReview(reviewId);
  }
}
