import { IGame } from "./IGame";
import { TGamePrivateFields } from "./TGamePrivateFields";

export type TGameCreationData = Omit<
  IGame,
  TGamePrivateFields | "platform" | "readCount"
>;
