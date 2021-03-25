import { IGame } from "./IGame";
import { TGamePrivateFields } from "./TGamePrivateFields";

export type TGameModificationData = Partial<Omit<IGame, TGamePrivateFields>>;
