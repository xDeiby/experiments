// Components
import Loading from '../loading';
import { IModelType } from '../../model/experiment';

// Librarys
import React from 'react';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Container,
    Grid,
    makeStyles,
    Typography,
} from '@material-ui/core';
import { Routes } from '../../utils/routes.config';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../store';
import { loadModels } from '../../store/ducks/modelType';
import { useHistory } from 'react-router';

export interface ISimulatorProps {}

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
}));

export default function Simulator(props: ISimulatorProps) {
    const classes = useStyles();

    const models = useSelector((state: ApplicationState) => state.modelTypes);
    const dispatch = useDispatch();
    const history = useHistory();

    React.useEffect(() => {
        dispatch(loadModels(false));
    }, [dispatch]);

    const handleClick = async (model: IModelType) => {
        history.push(`${Routes.execution}/${model.id}`);
    };

    return (
        <Loading isLoading={models.loading}>
            <Container
                maxWidth="sm"
                component="main"
                className={classes.heroContent}
            >
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="textPrimary"
                    gutterBottom
                >
                    Experimentos
                </Typography>
                <Typography
                    variant="h5"
                    align="center"
                    color="textSecondary"
                    component="p"
                >
                    En esta vista se simulara la creación de un experimento
                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {models.data.map((model) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid
                            item
                            key={model.id}
                            xs={12}
                            // sm={tier.title === "Enterprise" ? 12 : 6}
                            md={4}
                        >
                            <Card>
                                <CardHeader
                                    title={'Experimento'}
                                    subheader={model.abbreviation}
                                    titleTypographyProps={{ align: 'center' }}
                                    subheaderTypographyProps={{
                                        align: 'center',
                                    }}
                                    // action={
                                    //     tier.title === "Pro" ? (
                                    //         <StarIcon />
                                    //     ) : null
                                    // }
                                    className={classes.cardHeader}
                                />
                                <CardContent>
                                    <div className={classes.cardPricing}>
                                        <Typography
                                            component="h4"
                                            variant="h4"
                                            color="textPrimary"
                                        >
                                            {model.name}
                                        </Typography>
                                    </div>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        fullWidth
                                        variant={'contained'}
                                        onClick={() => handleClick(model)}
                                        color="primary"
                                        startIcon={<PlayCircleOutlineIcon />}
                                    >
                                        {'Iniciar experimento'}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>{' '}
        </Loading>
    );
}
