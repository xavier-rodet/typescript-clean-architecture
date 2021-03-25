import { IReview } from "./IReview";
import { TReviewCreationData } from "./TReviewCreationData";

export type TReviewInputData = TReviewCreationData & Partial<IReview>;
