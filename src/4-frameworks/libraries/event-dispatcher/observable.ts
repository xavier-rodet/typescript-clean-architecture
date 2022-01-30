import { EAppEvent, TEventCallback } from '@use-cases/_common/events';

export class Observable<DTO> {
  public symbol;

  constructor(public event: EAppEvent, public callback: TEventCallback<DTO>) {
    this.symbol = Symbol(event);
  }
}
