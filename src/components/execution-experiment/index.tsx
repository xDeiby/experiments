// Components
import Loading from '../loading';
import Welcome from './welcome';
import StepperExperiment from './stepper';
import { ApplicationState } from '../../store';
import { loadExperimentElementsRequest } from '../../store/ducks/executionExperiment';

// Librarys
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

export default function ExecutionExperiment() {
    // Url params
    const { id } = useParams<{ id: string }>();

    const [aceptedTerms, setAceptedTerms] = React.useState<boolean>(false);

    // Store Management
    const dispatch = useDispatch();
    const experiment_elements = useSelector(
        (state: ApplicationState) => state.execution_experiment
    );

    // Effects
    React.useEffect(() => {
        dispatch(loadExperimentElementsRequest(id));
    }, [dispatch, id]);

    // Constants
    const { surveys, quizzes, experiment } = experiment_elements.data;

    return aceptedTerms ? (
        <Loading isLoading={experiment_elements.loading}>
            {/* Forms of Execution Experiment */}
            <StepperExperiment elements={[...surveys, ...quizzes]} />
        </Loading>
    ) : (
        <Loading isLoading={experiment_elements.loading}>
            {/* Welcome and Terms and Conditions */}
            <Welcome
                experiment={experiment}
                setAceptedTerms={() => setAceptedTerms(true)}
            />
        </Loading>
    );
}
