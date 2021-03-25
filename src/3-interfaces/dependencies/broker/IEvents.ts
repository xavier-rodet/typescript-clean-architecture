import { IHandler } from "./_definitions/IHandler";
import { IMessage } from "./_definitions/IMessage";
import { IBrokerService } from "./_definitions/IBrokerService";

export interface IEvents extends IBrokerService {
  subscribe(event: string, handler: IHandler): void;
  publish(event: string, message: IMessage): Promise<string>;
}
