import {
  SubscriberHandler,
  EventName,
  IEvent,
  IEventBus,
  ISubscriber,
} from '@app/use-cases/services/event'

interface IObservable {
  event: EventName
  handler: SubscriberHandler<unknown>
}

export class LocalEventBus implements IEventBus {
  private observables: IObservable[] = []

  public publish(event: IEvent<unknown>): void {
    const isSameEvent = this.isSameEvent
    this.observables.forEach((observable) => {
      if (isSameEvent(event.name, observable.event)) {
        observable.handler(event.message)
      }
    })
  }

  public subscribe(subscriber: ISubscriber<unknown>): void {
    const observable: IObservable = {
      event: subscriber.event,
      handler: subscriber.handler,
    }
    this.observables.push(observable)
  }

  private isSameEvent(eventA: EventName, eventB: EventName): boolean {
    return eventA.domain === eventB.domain && eventA.name === eventA.name
  }
}

// TODO: for microservice project, we should implement a "NetworkEventBus" instead
