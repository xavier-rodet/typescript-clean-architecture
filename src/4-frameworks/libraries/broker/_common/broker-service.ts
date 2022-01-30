import { IMessage, IMessageFactory } from '@interfaces/_common/broker';
import { Message } from './message';

export abstract class ABrokerService implements IMessageFactory {
  public createMessage(content: unknown, metadata?: unknown): IMessage {
    return new Message(content, metadata);
  }
}
