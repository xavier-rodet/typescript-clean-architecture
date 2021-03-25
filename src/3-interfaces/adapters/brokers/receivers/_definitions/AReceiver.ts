import {
  ICommands,
  IHandlerWithResponse,
} from "@interfaces/dependencies/broker";
import { IReceiver } from "./IReceiver";

export abstract class AReceiver implements IReceiver {
  protected commands: ICommands;
  protected command: string;

  constructor(events: ICommands, event: string) {
    this.commands = events;
    this.command = event;
  }

  receive(): void {
    this.commands.receive(this.command, this.handler);
  }

  protected abstract handler: IHandlerWithResponse;
}
