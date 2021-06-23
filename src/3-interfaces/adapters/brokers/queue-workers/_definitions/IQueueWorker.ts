export interface IQueueWorker {
  run(): Promise<void>;
}
