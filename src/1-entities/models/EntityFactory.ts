import { ISanitizer } from "@entities/dependencies/sanitizer";
import { IUid } from "@entities/dependencies/uid";
import { Game, IGame, IGameFactory, TGameInputData } from "./game";
import {
  ILibrary,
  ILibraryFactory,
  Library,
  TLibraryInputData,
} from "./library";
import { IPlayer, IPlayerFactory, Player, TPlayerInputData } from "./player";
import { IReview, IReviewFactory, Review, TReviewInputData } from "./review";

export class EntityFactory
  implements IGameFactory, IPlayerFactory, ILibraryFactory, IReviewFactory {
  private uid: IUid;
  private sanitizer: ISanitizer;

  constructor(uid: IUid, sanitizer: ISanitizer) {
    this.uid = uid;
    this.sanitizer = sanitizer;
  }

  public createGame(data: TGameInputData): IGame {
    return new Game(data, this.uid, this.sanitizer);
  }
  public createLibrary(data: TLibraryInputData): ILibrary {
    return new Library(data, this.uid);
  }
  public createPlayer(data: TPlayerInputData): IPlayer {
    return new Player(data, this.uid, this.sanitizer);
  }
  public createReview(data: TReviewInputData): IReview {
    return new Review(data, this.uid, this.sanitizer);
  }
}
