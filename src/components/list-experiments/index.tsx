// Components
import CardExperiment from '../card-experiment';
import CreateExperiment from '../modals/modal-create/CreateExperiment';
import { ApplicationState } from '../../store';
import { loadExperiments } from '../../store/ducks/experiment';
import Loading from '../loading';

// Librarys
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ListExperiment() {
    // Store Management
    const experiments = useSelector(
        (state: ApplicationState) => state.experiments
    );
    const dispatch = useDispatch();

    // UseEffect
    React.useEffect(() => {
        if (experiments.data.length === 0) {
            dispatch(loadExperiments());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    // Component
    return (
        // Loading Context
        <Loading isLoading={experiments.loading}>
            {/* List Content */}
            <div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        flexWrap: 'wrap',
                        flexBasis: '200px',
                        padding: 20,
                    }}
                >
                    {/* Content */}
                    {experiments.data.map((experiment) => (
                        <CardExperiment
                            key={experiment.id}
                            experiment={experiment}
                        />
                    ))}
                </div>

                <CreateExperiment
                    name={'Nuevo Experimento'}
                    title={'Crear Experimento'}
                    description={
                        'Para crear un experimento ingrese el nombre del experimento, su descripción y el tipo de modelo al que pertenece'
                    }
                />
            </div>
        </Loading>
    );
}
