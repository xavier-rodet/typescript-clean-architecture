import { IReview } from "./IReview";
import { TReviewPrivateFields } from "./TReviewPrivateFields";

export type TReviewCreationData = Omit<IReview, TReviewPrivateFields>;
