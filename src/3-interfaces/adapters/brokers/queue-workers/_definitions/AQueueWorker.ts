import { IQueues, IHandler } from "@interfaces/dependencies/broker";
import { IQueueWorker } from "./IQueueWorker";

export abstract class AQueueWorker implements IQueueWorker {
  protected queues: IQueues;
  protected queue: string;
  private maxHandlerProcessTimeSeconds: number;

  constructor(
    queues: IQueues,
    queue: string,
    maxHandlerProcessTimeSeconds: number
  ) {
    this.queues = queues;
    this.queue = queue;
    this.maxHandlerProcessTimeSeconds = maxHandlerProcessTimeSeconds;
  }

  public async run(): Promise<void> {
    await this.queues.receiveTransaction(
      this.queue,
      this.handler,
      this.maxHandlerProcessTimeSeconds
    );
    await this.run();
  }

  protected abstract handler: IHandler;
}
