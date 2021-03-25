import { IMessage } from "@interfaces/dependencies/broker";

export interface IMessageFactory {
  createMessage(content: unknown, metadata?: unknown): IMessage;
}
