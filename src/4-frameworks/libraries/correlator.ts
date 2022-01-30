import correlator from 'correlation-id';

export interface ICorrelator {
  bindId(work: CallableFunction, id?: string): CallableFunction;
  withId(work: CallableFunction, id?: string): void;
  getId(): string;
}

export class Correlator implements ICorrelator {
  public bindId(work: CallableFunction, id?: string): CallableFunction {
    return id ? correlator.bindId(id, work) : correlator.bindId(work);
  }

  public withId(work: CallableFunction, id?: string): void {
    id ? correlator.withId(id, work) : correlator.withId(work);
  }

  public getId(): string {
    return correlator.getId();
  }
}
