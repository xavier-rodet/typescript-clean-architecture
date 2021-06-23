import { ICommandReceiver } from "./_definitions/ICommandReceiver";

export class CommandReceivers implements ICommandReceiver {
  private receivers: ICommandReceiver[];

  constructor(receivers: ICommandReceiver[]) {
    this.receivers = receivers;
  }

  public receive(): void {
    this.receivers.forEach((receiver) => receiver.receive());
  }
}
