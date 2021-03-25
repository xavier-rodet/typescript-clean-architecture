import { IReceiver } from "./_definitions/IReceiver";

export class Receivers implements IReceiver {
  private receivers: IReceiver[];

  constructor(receivers: IReceiver[]) {
    this.receivers = receivers;
  }

  public receive(): void {
    this.receivers.forEach((receiver) => receiver.receive());
  }
}
