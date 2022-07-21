

export interface ICorrelator {
  bindId(work: CallableFunction, id?: string): CallableFunction;
  withId(work: CallableFunction, id?: string): void;
  getId(): string | undefined;
}
