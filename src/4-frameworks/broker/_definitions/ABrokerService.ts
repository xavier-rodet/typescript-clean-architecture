import { IMessage } from "@interfaces/dependencies/broker";
import { IBrokerService } from "@interfaces/dependencies/broker/_definitions/IBrokerService";
import { IMessageFactory } from "./IMessageFactory";

export abstract class ABrokerService implements IBrokerService {
  private messageFactory: IMessageFactory;

  constructor(messageFactory: IMessageFactory) {
    this.messageFactory = messageFactory;
  }

  public createMessage(content: unknown, metadata?: unknown): IMessage {
    return this.messageFactory.createMessage(content, metadata);
  }
}
