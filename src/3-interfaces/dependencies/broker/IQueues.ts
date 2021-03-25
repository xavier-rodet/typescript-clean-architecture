import { IHandler } from "./_definitions/IHandler";
import { IMessage } from "./_definitions/IMessage";
import { IBrokerService } from "./_definitions/IBrokerService";

export interface IQueues extends IBrokerService {
  // receive is only 100% delivery (if process fails we lose the job)
  receive(queue: string, handler: IHandler): Promise<void>;
  // receiveTransaction is a 100% delivery AND Process guaranty but requires a maximum process time
  receiveTransaction(
    queue: string,
    handler: IHandler,
    maxHandlerProcessTimeSeconds: number
  ): Promise<void>;
  send(queue: string, message: IMessage): Promise<string>;
}
