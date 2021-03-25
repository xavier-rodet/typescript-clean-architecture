import { IPlayer } from "./IPlayer";
import { TPlayerCreationData } from "./TPlayerCreationData";

export type TPlayerInputData = TPlayerCreationData & Partial<IPlayer>;
