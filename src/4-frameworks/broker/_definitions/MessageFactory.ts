import { IMessage } from "@interfaces/dependencies/broker";
import { IMessageFactory } from "./IMessageFactory";
import { Message } from "./Message";

export class MessageFactory implements IMessageFactory {
  public createMessage(content: unknown, metadata?: unknown): IMessage {
    return new Message(content, metadata);
  }
}
