import { ISubscriber } from "./_definitions/ISubscriber";

export class Subscribers implements ISubscriber {
  private subscribers: ISubscriber[];

  constructor(subscribers: ISubscriber[]) {
    this.subscribers = subscribers;
  }
  public subscribe(): void {
    this.subscribers.forEach((subscriber) => subscriber.subscribe());
  }
}
