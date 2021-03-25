import { IReview } from "./IReview";
import { TReviewInputData } from "./TReviewInputData";

export interface IReviewFactory {
  createReview(data: TReviewInputData): IReview;
}
