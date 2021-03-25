import { ISanitizer } from "@entities/dependencies/sanitizer";
import { IUid } from "@entities/dependencies/uid";
import { EntityValidationError } from "../_definitions/EntityValidationError";
import { IReview } from "./_definitions/IReview";
import { TReviewInputData } from "./_definitions/TReviewInputData";

export class Review implements IReview {
  public id: string;
  public gameId: string;
  public reviewerId: string;
  public message?: string;
  public rating: number;

  constructor(data: TReviewInputData, uid: IUid, sanitizer: ISanitizer) {
    this.id = data.id ?? uid.generate();
    this.gameId = data.gameId;
    this.reviewerId = data.reviewerId;
    if (data.message) this.message = sanitizer.sanitize(data.message);
    this.rating = data.rating;

    this.validateWith(uid);

    Object.freeze(this);
  }

  private validateWith(uid: IUid) {
    if (!uid.validate(this.id))
      throw new EntityValidationError("id format is invalid");

    if (!uid.validate(this.gameId))
      throw new EntityValidationError("gameId format is invalid");

    if (!uid.validate(this.reviewerId))
      throw new EntityValidationError("reviewerId format is invalid");

    const MESSAGE_MIN_LENGTH = 10;
    if (this.message && this.message.length < MESSAGE_MIN_LENGTH) {
      throw new EntityValidationError("message is invalid", {
        minLength: MESSAGE_MIN_LENGTH,
      });
    }
  }
}
