import { THandler } from './_common/handler';
import { IMessage, IMessageFactory } from './_common/message';

export interface IBrokerEvents extends IMessageFactory {
  publish(event: string, message: IMessage): Promise<string>;
  subscribe(event: string, handler: THandler): void;
}
