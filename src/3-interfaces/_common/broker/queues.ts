import { THandler } from './_common/handler';
import { IMessage, IMessageFactory } from './_common/message';

export interface IBrokerQueues extends IMessageFactory {
  send(queue: string, message: IMessage): Promise<string>;
  // receive is only 100% delivery (if process fails we lose the job)
  receive(queue: string, handler: THandler): Promise<void>;
  // receiveTransaction is a 100% delivery AND Process guaranty but requires a maximum process time
  receiveTransaction(
    queue: string,
    handler: THandler,
    maxHandlerProcessTimeSeconds: number
  ): Promise<void>;
}
