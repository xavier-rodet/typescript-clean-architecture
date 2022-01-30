import {
  IBrokerCommands,
  THandlerWithResponse,
} from '@interfaces/_common/broker';

export interface IReceiver {
  receive(): void;
}

export abstract class AReceiver implements IReceiver {
  protected brokerCommands: IBrokerCommands;
  protected command: string;

  constructor(brokerCommands: IBrokerCommands, event: string) {
    this.brokerCommands = brokerCommands;
    this.command = event;
  }

  public receive(): void {
    this.brokerCommands.receive(this.command, this.handler);
  }

  protected abstract handler: THandlerWithResponse;
}
