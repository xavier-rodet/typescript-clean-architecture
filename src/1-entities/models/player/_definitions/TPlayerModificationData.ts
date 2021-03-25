import { IPlayer } from "./IPlayer";
import { TPlayerPrivateFields } from "./TPlayerPrivateFields";

export type TPlayerModificationData = Partial<
  Omit<IPlayer, TPlayerPrivateFields>
>;
