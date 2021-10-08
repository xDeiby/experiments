// Components
import Loading from '../loading';
import FormManagement from './survey-and-quiz';
import { ApplicationState } from '../../store';
import { loadRequestExperimentManage } from '../../store/ducks/experiment-management/experiment';

// Librarys
import * as React from 'react';
import styled from 'styled-components';
import SettingsIcon from '@material-ui/icons/Settings';
import { Container, makeStyles, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

// Views to management
export enum EViewManage {
    SURVEY,
    QUIZ,
    EXPERIMENT,
}

// Styles
const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
}));

const StyledDivConfig = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 240px;
    align-items: center;
    border-radius: 15px;
    padding: 20px;
    -webkit-box-shadow: 0px 10px 13px -7px #000000,
        5px 5px 14px 4px rgba(0, 0, 0, 0);
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 14px 4px rgba(0, 0, 0, 0);
    box-sizing: border-box;
    &:hover {
        font-size: 1.1em;
        transition: linear 0.2s;
        cursor: pointer;
    }
`;

// Component
export default function ExperimentManage() {
    // States
    const [view, setView] = React.useState<EViewManage>(EViewManage.EXPERIMENT);
    const classes = useStyles();

    // Path param
    const id = useParams<{ id: string }>().id;

    // Store Mnanagement
    const dispatch = useDispatch();
    const currentExperiment = useSelector(
        (state: ApplicationState) => state.experiment_manage
    );

    // Effects
    React.useEffect(() => {
        if (id !== currentExperiment.data.id) {
            dispatch(loadRequestExperimentManage(id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, id]);

    // Switch view component

    // Manage Sections
    if (view === EViewManage.SURVEY || view === EViewManage.QUIZ) {
        return (
            <>
                {/* <MenuBar /> */}
                <div style={{ height: '30px' }}></div>
                <div
                    style={{
                        width: '60%',
                        margin: 'auto',
                    }}
                >
                    <FormManagement
                        setMainView={() => setView(EViewManage.EXPERIMENT)}
                        idExperiment={id}
                        typeForm={view as number}
                    />
                </div>
            </>
        );

        // Experiment Manage
    } else {
        return (
            <>
                {/* <MenuBar /> */}
                <Loading isLoading={currentExperiment.loading}>
                    <div className={classes.heroContent}>
                        <Container maxWidth="md">
                            <Typography
                                component="h1"
                                variant="h2"
                                align="center"
                                color="textPrimary"
                                gutterBottom
                            >
                                {currentExperiment.data.title}
                            </Typography>
                            <Typography
                                variant="h5"
                                align="center"
                                color="textSecondary"
                                paragraph
                            >
                                {currentExperiment.data.description}
                            </Typography>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-evenly',
                                    marginTop: '50px',
                                }}
                            >
                                <StyledDivConfig
                                    onClick={() => setView(EViewManage.SURVEY)}
                                >
                                    <SettingsIcon
                                        style={{ fontSize: '2.5em' }}
                                    />
                                    <strong>Configurar Encuestas</strong>
                                </StyledDivConfig>
                                <StyledDivConfig
                                    onClick={() => setView(EViewManage.QUIZ)}
                                >
                                    <SettingsIcon
                                        style={{ fontSize: '2.5em' }}
                                    />
                                    <strong>Configurar Evaluación</strong>
                                </StyledDivConfig>
                            </div>
                        </Container>
                    </div>
                </Loading>
            </>
        );
    }
}
