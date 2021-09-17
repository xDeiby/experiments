// Components
import Simulator from '../components/simulator';
import AppBarE, { IAppButton } from '../components/app-bar';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import HomeIcon from '@material-ui/icons/Home';
import { Routes } from '../utils/routes.config';

// Librarys
import * as React from 'react';
import { Route } from 'react-router';

// Buttons
const buttons: IAppButton[] = [
    {
        name: 'Inicio',
        path: Routes.home,
        icon: <HomeIcon />,
    },
    {
        name: 'Gestionar Experimentos',
        path: Routes.experiments,
        icon: <SettingsApplicationsIcon />,
    },
    {
        name: 'Exportar Experimentos',
        path: Routes.export,
        icon: <ImportExportIcon />,
    },
];

// Route
const SimulatorRoute: React.FunctionComponent = () => {
    return (
        <Route exact path={Routes.models}>
            <AppBarE title="Simular Experimentos" buttons={buttons}>
                <Simulator />
            </AppBarE>
        </Route>
    );
};

export default SimulatorRoute;
