// See: https://www.thisdot.co/blog/how-to-implement-an-event-bus-in-typescript

// export interface Registry {
//   unregister(): void
// }

// export interface Callable {
//   [key: string]: Function
// }

// export interface Subscriber {
//   [key: string]: Callable
// }

// export interface IEventBus {
//   dispatch<T>(domain: string, event: string, arg?: T): void
//   register(domain: string, event: string, callback: Function): Registry
// }

export type Callback = (payload: unknown) => void

export default interface IObservable {
  identifier: symbol
  event: string
  callback: Callback
}

export interface IEventBus {
  pub(domain: string, event: string, payload?: unknown): void
  sub(domain: string, event: string, callback: Callback): symbol
  unsub(identifier: symbol): void
}

export class MemoryEventBus implements IEventBus {
  private observables: IObservable[] = []

  public pub(domain: string, event: string, payload?: unknown): void {
    event = `${domain}.${event}`

    this.observables.forEach((obs) => {
      if (event === obs.event) obs.callback(payload)
    })
  }

  public sub(domain: string, event: string, callback: Callback): symbol {
    event = `${domain}.${event}`

    const observable: IObservable = { event, callback, identifier: Symbol() }
    this.observables.push(observable)

    return observable.identifier
  }

  public unsub(identifier: symbol): void {
    const index = this.observables.findIndex(
      (observable) => identifier === observable.identifier
    )

    if (index > -1) {
      this.observables.splice(index, 1)
    }
  }
}
