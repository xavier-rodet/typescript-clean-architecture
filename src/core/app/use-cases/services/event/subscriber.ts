import { EventName } from './event'

// export enum ESubscribertTransport {
//   LOCAL = 'local',
//   NETWORK = 'network',
// }

export type SubscriberHandler<T> = (message: T) => void

export interface ISubscriber<T> {
  // transport: ESubscribertTransport
  event: EventName
  handler: SubscriberHandler<T>
}

export abstract class ASubscriber<T> implements ISubscriber<T> {
  public abstract handler(message: T): void

  constructor(
    // public readonly transport: ESubscribertTransport,
    public readonly event: EventName
  ) {
    Object.freeze(this)
  }
}

// export abstract class ALocalSubscriber<T> extends ASubscriber<T> {
//   constructor(event: EventName) {
//     super(ESubscribertTransport.LOCAL, event)
//   }
// }

// export abstract class ANetworkSubscriber<T> extends ASubscriber<T> {
//   constructor(event: EventName) {
//     super(ESubscribertTransport.NETWORK, event)
//   }
// }
