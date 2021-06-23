import { IEvents, IHandler } from "@interfaces/dependencies/broker";
import { IEventSubscriber } from "./IEventSubscriber";

export abstract class AEventSubscriber implements IEventSubscriber {
  protected events: IEvents;
  protected event: string;

  constructor(events: IEvents, event: string) {
    this.events = events;
    this.event = event;
  }

  public subscribe(): void {
    this.events.subscribe(this.event, this.handler);
  }

  protected abstract handler: IHandler;
}
