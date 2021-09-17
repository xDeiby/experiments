import { all } from 'redux-saga/effects';
import {
    createExperimentInstanceWatcher,
    getExperimentExecutionWatcher,
} from './executionExperiment/sagas';
import {
    getExperimentManageWatcher,
    modifyExperimentManageWatcher,
} from './experiment-management/experiment/sagas';
import {
    createImageManageWatcher,
    getImageManageWatcher,
    removeImageManageWatcher,
} from './experiment-management/images-model/sagas';

import {
    createLogManageWatcher,
    modifyLogManageWatcher,
} from './experiment-management/log-changes/sagas';

import {
    addQuestionManageWatcher,
    getQuestionManageWatcher,
    modifyQuestionManageWatcher,
    removeQuestionManageWatcher,
} from './experiment-management/questions/saga';

import {
    addSectionManageWatcher,
    getSectionManageWatcher,
    modifySectionManageWatcher,
    removeSectionManageWatcher,
} from './experiment-management/sections/saga';

import {
    getExperimentsWatcher,
    createExperimentWatcher,
} from './experiment/sagas';

import { getModelTypesWatcher } from './modelType/sagas';

export default function* rootSaga(): any {
    return yield all([
        // ModelType Watchers
        getModelTypesWatcher(),

        // Experiment Watchers
        getExperimentsWatcher(),
        modifyExperimentManageWatcher(),
        createExperimentWatcher(),
        getExperimentManageWatcher(),

        // Questions Watchers
        getQuestionManageWatcher(),
        modifyQuestionManageWatcher(),
        addQuestionManageWatcher(),

        // Section Watchers
        getSectionManageWatcher(),
        modifySectionManageWatcher(),
        addSectionManageWatcher(),

        // Log Watchers
        createLogManageWatcher(),
        modifyLogManageWatcher(),

        // Execution Watchers
        getExperimentExecutionWatcher(),
        createExperimentInstanceWatcher(),
        removeQuestionManageWatcher(),
        removeSectionManageWatcher(),

        // Image Watchers
        getImageManageWatcher(),
        removeImageManageWatcher(),
        createImageManageWatcher(),
    ]);
}
