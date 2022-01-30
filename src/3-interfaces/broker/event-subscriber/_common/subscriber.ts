import { IBrokerEvents, THandler } from '@interfaces/_common/broker';

export interface ISubscriber {
  subscribe(): void;
}

export abstract class ASubscriber implements ISubscriber {
  protected brokerEvents: IBrokerEvents;
  protected event: string;

  constructor(brokerEvents: IBrokerEvents, event: string) {
    this.brokerEvents = brokerEvents;
    this.event = event;
  }

  public subscribe(): void {
    this.brokerEvents.subscribe(this.event, this.handler);
  }

  protected abstract handler: THandler;
}
