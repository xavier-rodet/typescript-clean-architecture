import { IPlayer } from "./IPlayer";
import { TPlayerPrivateFields } from "./TPlayerPrivateFields";

export type TPlayerCreationData = Omit<IPlayer, TPlayerPrivateFields>;
