import {
  ICommands,
  IHandlerWithResponse,
} from "@interfaces/dependencies/broker";
import { ICommandReceiver } from "./ICommandReceiver";

export abstract class ACommandReceiver implements ICommandReceiver {
  protected commands: ICommands;
  protected command: string;

  constructor(events: ICommands, event: string) {
    this.commands = events;
    this.command = event;
  }

  public receive(): void {
    this.commands.receive(this.command, this.handler);
  }

  protected abstract handler: IHandlerWithResponse;
}
