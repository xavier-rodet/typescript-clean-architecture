import { IHandlerWithResponse } from "./_definitions/IHandlerWithResponse";
import { IMessage } from "./_definitions/IMessage";
import { IBrokerService } from "./_definitions/IBrokerService";

export interface ICommands extends IBrokerService {
  send(command: string, message: IMessage, timeout?: number): Promise<IMessage>;
  receive(
    command: string,
    handler: IHandlerWithResponse,
    timeout?: number
  ): void;
}
