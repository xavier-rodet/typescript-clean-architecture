import { IGame } from "./IGame";
import { TGameCreationData } from "./TGameCreationData";

export type TGameInputData = TGameCreationData & Partial<IGame>;
