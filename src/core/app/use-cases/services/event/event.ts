// export enum EEventTransport {
//   LOCAL = 'local',
//   NETWORK = 'network',
//   LOCAL_AND_NETWORK = 'local-and-network',
// }

export type EventName = {
  domain: string
  name: string
}

export interface IEvent<T> {
  // transport: EEventTransport
  name: EventName
  message: T
}

export abstract class AEvent<T> implements IEvent<T> {
  constructor(
    // public readonly transport: EEventTransport,
    public readonly name: EventName,
    public readonly message: T
  ) {
    Object.freeze(this)
  }
}

// export abstract class ALocalEvent<T> extends AEvent<T> {
//   constructor(name: EventName, message: T) {
//     super(EEventTransport.LOCAL, name, message)
//   }
// }

// export abstract class ANetworkEvent<T> extends AEvent<T> {
//   constructor(name: EventName, message: T) {
//     super(EEventTransport.NETWORK, name, message)
//   }
// }

// export abstract class ALocalAndNetworkEvent<T> extends AEvent<T> {
//   constructor(name: EventName, message: T) {
//     super(EEventTransport.LOCAL_AND_NETWORK, name, message)
//   }
// }
