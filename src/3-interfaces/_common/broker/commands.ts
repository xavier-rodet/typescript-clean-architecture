import { THandlerWithResponse } from './_common/handler';
import { IMessage, IMessageFactory } from './_common/message';

export interface IBrokerCommands extends IMessageFactory {
  send(command: string, message: IMessage, timeout?: number): Promise<IMessage>;
  receive(
    command: string,
    handler: THandlerWithResponse,
    timeout?: number
  ): void;
}
