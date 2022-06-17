import { IEventBus, ISubscriber } from '@app/use-cases/services/event'

export class AppSubscriber {
  constructor(
    private eventBus: IEventBus,
    private subscribers: ISubscriber<any>[]
  ) {}

  public subscribe(): void {
    this.subscribers.forEach((subscriber) => {
      this.eventBus.subscribe(subscriber)
    })
  }
}
