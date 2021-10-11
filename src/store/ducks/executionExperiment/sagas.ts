import { put, call, takeLatest } from 'redux-saga/effects';
import {
    AnswerElements,
    createExecutionExperimentFailure,
    createExecutionExperimentSuccess,
    EActionExecutionExperiment,
    loadExperimentElementsFailure,
    loadExperimentElementsSuccess,
} from '.';
import { IExecutionExperiment } from '../../../model/experiment/IExecutionExperiment';
import { IRequestStore } from '../../../model/stores';
import api from '../../../utils/api.config';

// Requests functions
function* getExecutionExperiment(action: any) {
    try {
        const response: IRequestStore<AnswerElements> = yield call(
            api.get,
            `answers/model/${action.payload}`
        );
        yield put(loadExperimentElementsSuccess(response.data));
    } catch (error) {
        yield put(loadExperimentElementsFailure());
    }
}

function* createAnswer(action: any) {
    // TODO: Usuario desde front
    try {
        const elements = action.payload as AnswerElements;
        const result: IRequestStore<IExecutionExperiment> = yield call(
            api.post,
            'answers',
            {
                experiment: elements.experiment.id,
                surveys: JSON.stringify(elements.surveys),
                quizzes: JSON.stringify(elements.quizzes),
                userName: 'User test',
            }
        );

        yield put(createExecutionExperimentSuccess(result.data));
    } catch (error) {
        yield put(createExecutionExperimentFailure());
    }
}

// function* modifyInstanceExperiment() {
//     try {
//         const { data } = store.getState()
//             .execution_experiment as IRequestStore<IExecutionExperiment>;

//         yield call(api.put, `answers/${data.id}`, {
//             ...data,
//             experiment: data.experiment.id,
//             survey: JSON.stringify(data.survey),
//             quiz: JSON.stringify(data.quiz),
//             state: 2,
//         });

//         yield put(modifyInstanceSuccess());
//     } catch (error) {
//         yield put(modifyInstanceFailure());
//     }
// }

// Watchers
export function* getExperimentExecutionWatcher(): any {
    yield takeLatest(
        EActionExecutionExperiment.LOAD_REQUEST,
        getExecutionExperiment
    );
}

export function* createExperimentInstanceWatcher(): any {
    yield takeLatest(EActionExecutionExperiment.CREATE_REQUEST, createAnswer);
}

// export function* createExperimentInstanceWatcher(): any {
//     yield takeLatest(
//         EActionExecutionExperiment.CREATE_REQUEST,
//         modifyInstanceExperiment
//     );
// }
