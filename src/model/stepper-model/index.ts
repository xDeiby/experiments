import { ISection } from '../experiment';

export interface IStepModel {
    step: number;
    init: number;
    surv_limit: number;
    limit: number;
    next: number;
    back: number;
    data: ISection;
    subStep: ISubStep;
}

export interface ISubStep {
    init: number;
    step: number;
    next: number;
    limit: number;
}
