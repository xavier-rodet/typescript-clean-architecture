import { IEventSubscriber } from "./_definitions/IEventSubscriber";

export class EventSubscribers implements IEventSubscriber {
  private subscribers: IEventSubscriber[];

  constructor(subscribers: IEventSubscriber[]) {
    this.subscribers = subscribers;
  }
  public subscribe(): void {
    this.subscribers.forEach((subscriber) => subscriber.subscribe());
  }
}
