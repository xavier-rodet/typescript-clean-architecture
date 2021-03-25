import { IEvents, IHandler } from "@interfaces/dependencies/broker";
import { ISubscriber } from "./ISubscriber";

export abstract class ASubscriber implements ISubscriber {
  protected events: IEvents;
  protected event: string;

  constructor(events: IEvents, event: string) {
    this.events = events;
    this.event = event;
  }

  subscribe(): void {
    this.events.subscribe(this.event, this.handler);
  }

  protected abstract handler: IHandler;
}
