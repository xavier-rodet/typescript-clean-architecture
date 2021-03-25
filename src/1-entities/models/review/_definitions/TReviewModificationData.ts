import { IReview } from "./IReview";
import { TReviewPrivateFields } from "./TReviewPrivateFields";

export type TReviewModificationData = Partial<
  Omit<IReview, TReviewPrivateFields>
>;
