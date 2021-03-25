import { IMessage } from "./IMessage";

export interface IHandlerWithResponse {
  (message: IMessage): Promise<IMessage>;
}
