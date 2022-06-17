import { IEvent } from './event'
import { ISubscriber } from './subscriber'

export interface IEventBus {
  publish(event: IEvent<unknown>): void
  subscribe(subscriber: ISubscriber<unknown>): void
}

// export class GlobalEventBus implements IEventBus {
//   constructor(
//     private localEventBus: IEventBus,
//     private networkEventBus: IEventBus
//   ) {}

//   public publish(event: IEvent<unknown>): void {
//     switch (event.transport) {
//       case EEventTransport.LOCAL:
//         this.localEventBus.publish(event)
//         break

//       case EEventTransport.NETWORK:
//         this.networkEventBus.publish(event)
//         break

//       case EEventTransport.LOCAL_AND_NETWORK:
//         this.localEventBus.publish(event)
//         this.networkEventBus.publish(event)
//         break
//     }
//   }

//   public subscribe(subscriber: ISubscriber<unknown>): void {
//     switch (subscriber.transport) {
//       case EEventTransport.LOCAL:
//         this.localEventBus.subscribe(subscriber)
//         break

//       case EEventTransport.NETWORK:
//         this.networkEventBus.subscribe(subscriber)
//         break

//       case EEventTransport.LOCAL_AND_NETWORK:
//         this.localEventBus.subscribe(subscriber)
//         this.networkEventBus.subscribe(subscriber)
//         break
//     }
//   }
// }
