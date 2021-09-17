// Components
import ModalTerms from '../../modals/modal-info/ModalTerms';
import { IExperiment } from '../../../model/experiment';

// Librarys
import React from 'react';
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';

// Styles
const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
        marginTop: '100px',
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

// Model props
export interface IWelcomeProps {
    experiment: IExperiment;
    setAceptedTerms: () => void;
}

// Component
export default function Welcome({
    experiment,
    setAceptedTerms,
}: IWelcomeProps) {
    const classes = useStyles();
    return (
        <div>
            {/* <CssBaseline /> */}
            {/* <AppBar position="relative">
                <Toolbar>
                    <ListAltIcon className={classes.icon} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Experimento
                    </Typography>
                </Toolbar>
            </AppBar> */}
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="md">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="textPrimary"
                            gutterBottom
                        >
                            {experiment
                                ? `Bienvenido a ${experiment.title}`
                                : 'No se encontro ningun experimento disponible'}
                        </Typography>
                        {experiment && (
                            <Typography
                                variant="h5"
                                align="center"
                                color="textSecondary"
                                paragraph
                            >
                                {experiment.description}
                            </Typography>
                        )}
                        {/* Terms and Conditions */}
                        {experiment && (
                            <div className={classes.heroButtons}>
                                <Grid container spacing={2} justify="center">
                                    <Grid item>
                                        <ModalTerms acepted={setAceptedTerms} />
                                    </Grid>
                                </Grid>
                            </div>
                        )}
                    </Container>
                </div>
            </main>
        </div>
    );
}