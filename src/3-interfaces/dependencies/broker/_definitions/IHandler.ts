import { IMessage } from "./IMessage";

export interface IHandler {
  (message: IMessage): Promise<void>;
}
