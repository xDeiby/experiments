import { Reducer } from 'react';
import { action } from 'typesafe-actions';
import store from '../..';
import { IExperiment, IQuestion, ISection } from '../../../model/experiment';
import {
    IExecutionExperiment,
    IFormElements,
} from '../../../model/experiment/IExecutionExperiment';
import { IAction, IRequestStore } from '../../../model/stores';
import { initStep } from '../stepper';

// Action Types
export enum EActionExecutionExperiment {
    LOAD_REQUEST = '@experiment-execution/LOAD_REQUEST',
    LOAD_SUCCESS = '@experiment-execution/LOAD_SUCCESS',
    LOAD_FAILURE = '@experiment-execution/LOAD_FAILURE',
    CREATE_REQUEST = '@experiment-execution/CREATE_REQUEST',
    CREATE_SUCCESS = '@experiment-execution/CREATE_SUCCESS',
    CREATE_FAILURE = '@experiment-execution/CREATE_FAILURE',

    SELECT_OPTION = '@experiment-execution/SELECT_OPTION',
    RESET_OPTIONS = '@experiment-execution/RESET_OPTIONS',

    MODIFY_QUIZ = '@experiment-execution/MODIFY_QUIZ',
}

// Action async creators

// Get
const loadExperimentElementsRequest = (modelId: string) =>
    action(EActionExecutionExperiment.LOAD_REQUEST, modelId);

const loadExperimentElementsSuccess = (experiment: AnswerElements) => {
    store.dispatch(
        initStep({
            init: 0,
            limit: (experiment.surveys.length +
                experiment.quizzes.length) as number,
            surv_limit: experiment.surveys.length as number,
        })
    );

    return action(EActionExecutionExperiment.LOAD_SUCCESS, experiment);
};

const loadExperimentElementsFailure = () =>
    action(EActionExecutionExperiment.LOAD_FAILURE);

// Create
const createExecutionExperimentRequest = () => {
    const execution = (
        store.getState()
            .execution_experiment as IRequestStore<IExecutionExperiment>
    ).data;

    return action(EActionExecutionExperiment.CREATE_REQUEST, execution);
};

const createExecutionExperimentSuccess = (
    executionSave: IExecutionExperiment
) => action(EActionExecutionExperiment.CREATE_SUCCESS, executionSave);

const createExecutionExperimentFailure = () =>
    action(EActionExecutionExperiment.CREATE_FAILURE);

// Modify
// TODO: Implementar
// const modifyInstanceRequest = () =>
//     action(EActionExecutionExperiment.CREATE_REQUEST);

// const modifyInstanceSuccess = () =>
//     action(EActionExecutionExperiment.CREATE_SUCCESS);

// const modifyInstanceFailure = () =>
//     action(EActionExecutionExperiment.CREATE_FAILURE);

// Action sync creators

const selectAlternative = (question: IQuestion) =>
    action(EActionExecutionExperiment.SELECT_OPTION, question);

const quizModify = (section: ISection) =>
    action(EActionExecutionExperiment.MODIFY_QUIZ, section);

const resetOptions = () => action(EActionExecutionExperiment.RESET_OPTIONS);

export {
    loadExperimentElementsRequest,
    loadExperimentElementsSuccess,
    loadExperimentElementsFailure,
    createExecutionExperimentRequest,
    createExecutionExperimentSuccess,
    createExecutionExperimentFailure,
    selectAlternative,
    resetOptions,
    quizModify,
};

// Reducer
export type AnswerElements = Omit<
    IExecutionExperiment,
    'id' | 'userName' | 'userEmail' | 'creationDate'
>;

const defaultExperiment: IRequestStore<AnswerElements> = {
    data: {
        experiment: {} as IExperiment,
        surveys: [] as IFormElements[],
        quizzes: [] as IFormElements[],
    },
    loading: false,
    error: false,
};

// Method
const change_alternative = (
    form: IFormElements[],
    question_m: IQuestion
): IFormElements[] =>
    form.reduce<IFormElements[]>((elems, elem) => {
        const new_questions = elem.questions.map((question) =>
            question.id === question_m.id ? question_m : question
        );
        return [...elems, { ...elem, questions: new_questions }];
    }, []);

const experimentExecutionReducer: Reducer<
    IRequestStore<IExecutionExperiment | AnswerElements>,
    IAction<
        EActionExecutionExperiment,
        IExecutionExperiment | AnswerElements | IQuestion | ISection
    >
> = (state = defaultExperiment, action) => {
    switch (action.type) {
        case EActionExecutionExperiment.CREATE_REQUEST:
        case EActionExecutionExperiment.LOAD_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case EActionExecutionExperiment.LOAD_SUCCESS:
            return {
                data: action.payload as IExecutionExperiment,
                loading: false,
                error: false,
            };

        case EActionExecutionExperiment.CREATE_FAILURE:
        case EActionExecutionExperiment.LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };

        case EActionExecutionExperiment.SELECT_OPTION:
            const question_m = action.payload as IQuestion;
            if (
                state.data.quizzes.find(
                    (elem) => elem.section.id === question_m.section
                )
            ) {
                return {
                    ...state,
                    data: {
                        ...state.data,
                        quizzes: change_alternative(
                            state.data.quizzes,
                            question_m
                        ),
                    },
                };
            } else {
                return {
                    ...state,
                    data: {
                        ...state.data,
                        surveys: change_alternative(
                            state.data.surveys,
                            question_m
                        ),
                    },
                };
            }
        case EActionExecutionExperiment.CREATE_SUCCESS:
            return {
                data: action.payload as IExecutionExperiment,
                loading: false,
                error: false,
            };

        case EActionExecutionExperiment.MODIFY_QUIZ:
            const quiz_m = action.payload as ISection;
            return {
                ...state,
                data: {
                    ...state.data,
                    quizzes: state.data.quizzes.reduce<IFormElements[]>(
                        (elements, element) => {
                            if (element.section.id === quiz_m.id) {
                                return [
                                    ...elements,
                                    { ...element, section: quiz_m },
                                ];
                            }
                            return [...elements, element];
                        },
                        []
                    ),
                },
            };

        default:
            return state;
    }
};

export default experimentExecutionReducer;
