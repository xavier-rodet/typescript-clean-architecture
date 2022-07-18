import { ICorrelator } from '../core/app/services';
export declare class Correlator implements ICorrelator {
    bindId(work: CallableFunction, id?: string): CallableFunction;
    withId(work: CallableFunction, id?: string): void;
    getId(): string;
}
