import { IModelType } from ".";
import { ETypeStateExperiment } from "./enum-types";

export interface IExperiment {
    readonly id: string;
    title: string;
    creationDate: Date;
    description?: string;
    modelType: string | IModelType;
    state?: ETypeStateExperiment;
}
