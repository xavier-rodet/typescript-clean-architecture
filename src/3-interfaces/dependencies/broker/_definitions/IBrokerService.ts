import { IMessage } from "@interfaces/dependencies/broker";

export interface IBrokerService {
  createMessage(content: unknown, metadata?: unknown): IMessage;
}
