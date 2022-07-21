/* eslint-disable @typescript-eslint/no-explicit-any */
import correlator from 'correlation-id';
import { ICorrelator } from '../app/services';

export class Correlator implements ICorrelator {
  public bindId(work: CallableFunction, id?: string): CallableFunction {
    return id ? correlator.bindId(id, work as any) : correlator.bindId(work as any);
  }

  public withId(work: CallableFunction, id?: string): void {
    id ? correlator.withId(id, work as any) : correlator.withId(work as any);
  }

  public getId(): string | undefined {
    return correlator.getId();
  }
}
