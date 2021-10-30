// Components
// import AppBarE, { IAppButton } from '../components/app-bar';
// import HomeIcon from '@material-ui/icons/Home';
import ExecutionExperiment from '../components/execution-experiment';
import { Routes } from '../utils/routes.config';

// Librarys
import * as React from 'react';
import { Route } from 'react-router';

// Buttons
// const buttons: IAppButton[] = [
//     {
//         name: 'Inicio',
//         path: Routes.home,
//         icon: <HomeIcon />,
//     },
// ];

// Route
const ExecutionRoute: React.FunctionComponent = () => {
    return (
        <Route exact path={`${Routes.execution}/:id`}>
            <ExecutionExperiment />
        </Route>
    );
};

export default ExecutionRoute;
