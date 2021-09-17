import React from 'react';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
} from '@material-ui/data-grid';
import api from '../../utils/api.config';
import DatePicker from '../date-picker';

const headers = [
    {
        field: 'creationDate',
        headerName: 'Fecha Creación',
        width: 200,
        type: 'date',
        valueGetter: (e: any) => new Date(e.value).toLocaleString(),
    },
    {
        field: 'modelType',
        headerName: 'Tipo Modelo',
        width: 200,
        type: 'string',
    },
    {
        field: 'username',
        headerName: 'Experimentador',
        width: 200,
        type: 'string',
    },
    {
        field: 'state',
        headerName: 'Estado',
        width: 150,
        type: 'number',
        valueGetter: (e: any) => {
            switch (e.value) {
                case 2:
                    return 'Completo';
                case 1:
                    return 'Incompleto';
                case 0:
                    return 'Fallido';
                default:
                    return e.value;
            }
        },
    },
];

export default function CustomizedTables() {
    // TODO: Pasarlo a redux
    const [rows, setRows] = React.useState<{ data: any[]; total: number }>();
    const [loading, setLoading] = React.useState(false);

    const [filters, setFilters] = React.useState({
        initDate: '',
        endDate: '',
    });

    React.useEffect(() => {
        getData();
    }, []);

    const getData = async (): Promise<void> => {
        setLoading(true);

        try {
            const result = await api.get('answers');
            setRows(result.data);
        } catch {}
        setLoading(false);
    };

    const changeFilters = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const dataFiltered = () => {
        const initDate = filters.initDate
            ? new Date(filters.initDate)
            : new Date('2020-05-03');
        const endDate = filters.endDate
            ? new Date(filters.endDate)
            : new Date();

        return rows?.total
            ? rows.data.filter((answer) => {
                  const creationDate = new Date(answer.creationDate);

                  console.log(creationDate <= endDate, endDate);
                  return creationDate >= initDate && creationDate <= endDate;
              })
            : [];
    };

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    padding: '20px 0',
                }}
            >
                <DatePicker
                    label={'Fecha Inicio'}
                    value={filters.initDate}
                    name={'initDate'}
                    changeValue={changeFilters}
                />

                <DatePicker
                    label={'Fecha Termino'}
                    name={'endDate'}
                    value={filters.endDate}
                    changeValue={changeFilters}
                />
            </div>

            {/* <DatePicker /> */}
            <div style={{ height: 500, width: '80%', margin: 'auto' }}>
                <DataGrid
                    disableColumnMenu
                    loading={loading}
                    rows={dataFiltered()}
                    columns={headers}
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    pagination
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                />
            </div>
        </>
    );
}

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport csvOptions={{ allColumns: true }} />
        </GridToolbarContainer>
    );
}
