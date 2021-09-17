import { Reducer } from 'react';
import { action } from 'typesafe-actions';
import { IModelType } from '../../../model/experiment';
import { IAction, IRequestStore } from '../../../model/stores';

// Action Types
export enum EActionModelTypes {
    LOAD_REQUEST = '@modelTypes/LOAD_REQUEST',
    LOAD_SUCCESS = '@modelTypes/LOAD_SUCCESS',
    LOAD_FAILURE = '@modelTypes/LOAD_FAILURE',
}

// Action creators
const loadModels = (aviables?: boolean) =>
    action(EActionModelTypes.LOAD_REQUEST, aviables);
const loadSuccessModels = (models: IModelType[]) =>
    action(EActionModelTypes.LOAD_SUCCESS, models);
const loadFailureModels = () => action(EActionModelTypes.LOAD_FAILURE);

export { loadModels, loadSuccessModels, loadFailureModels };

// Reducer
const defaultModels: IRequestStore<IModelType[]> = {
    data: [] as IModelType[],
    loading: false,
    error: false,
};

const modelTypesReducer: Reducer<
    IRequestStore<IModelType[]>,
    IAction<EActionModelTypes, IModelType[]>
> = (state = defaultModels, action) => {
    switch (action.type) {
        case EActionModelTypes.LOAD_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case EActionModelTypes.LOAD_SUCCESS:
            return {
                data: action.payload,
                loading: false,
                error: false,
            };

        case EActionModelTypes.LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };

        default:
            return state;
    }
};

export default modelTypesReducer;
