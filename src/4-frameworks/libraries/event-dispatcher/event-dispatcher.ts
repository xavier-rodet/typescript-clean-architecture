import {
  EAppEvent,
  IEventDispatcher,
  TEventCallback,
} from '@use-cases/_common/events';
import { remove } from 'lodash';
import { Observable } from './observable';

export class EventDispatcher implements IEventDispatcher {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private listeners: Observable<any>[] = [];

  public emit<DTO>(event: EAppEvent, dto: DTO): void {
    this.listeners.forEach((listener) => {
      if (event === listener.event) listener.callback(dto);
    });
  }

  public addListener<DTO>(
    event: EAppEvent,
    callback: TEventCallback<DTO>
  ): symbol {
    const listener = new Observable<DTO>(event, callback);
    this.listeners.push(listener);

    return listener.symbol;
  }

  public removeListener(symbol: symbol): void {
    remove(this.listeners, (listener) => symbol === listener.symbol);
  }
}
