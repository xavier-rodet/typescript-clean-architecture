import { IListener } from "./_definitions.ts/IListener";

export class Listeners implements IListener {
  private listeners: IListener[];

  constructor(listeners: IListener[]) {
    this.listeners = listeners;
  }

  public listen(): void {
    this.listeners.forEach((listener) => listener.listen());
  }
}
