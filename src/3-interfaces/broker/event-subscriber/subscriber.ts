import { ISubscriber } from './_common/subscriber';

export class BrokerEventSubscriber implements ISubscriber {
  constructor(private subscribers: ISubscriber[]) {}

  public subscribe(): void {
    this.subscribers.forEach((subscriber) => subscriber.subscribe());
  }
}
