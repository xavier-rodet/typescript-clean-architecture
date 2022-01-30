import { IReceiver } from './_common/receiver';

export class BrokerCommandReceiver implements IReceiver {
  constructor(private receivers: IReceiver[]) {}

  public receive(): void {
    this.receivers.forEach((receiver) => receiver.receive());
  }
}
