import { IListener } from './_common/listener';

export class AppListener implements IListener {
  constructor(private listeners: IListener[]) {}

  public listen(): void {
    this.listeners.forEach((listener) => listener.listen());
  }
}
