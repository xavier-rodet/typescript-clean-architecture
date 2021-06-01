import correlator from "correlation-id";

import { ICorrelator } from "@frameworks/correlator";

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
