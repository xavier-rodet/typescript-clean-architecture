import { IBrokerQueues, THandler } from '@interfaces/_common/broker';

export interface IWorker {
  run(): Promise<void>;
}

export abstract class AWorker implements IWorker {
  constructor(
    protected brokerQueues: IBrokerQueues,
    protected queue: string,
    private maxHandlerProcessTimeSeconds: number
  ) {}

  public async run(): Promise<void> {
    await this.brokerQueues.receiveTransaction(
      this.queue,
      this.handler,
      this.maxHandlerProcessTimeSeconds
    );
    await this.run();
  }

  protected abstract handler: THandler;
}
