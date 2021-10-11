// Librarys
import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@material-ui/core';
import styled from 'styled-components';
import { IExperiment } from '../../../model/experiment';
import { useDispatch } from 'react-redux';
import { modifyExperimentRequest } from '../../../store/ducks/experiment-management/experiment';

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

// Model Props
interface IModalTermsProps {
    experiment: IExperiment;
}

// Component
export default function CreateTerms({ experiment }: IModalTermsProps) {
    // States
    const [open, setOpen] = React.useState(false);
    const [terms, setTerms] = React.useState(
        experiment.terms ? experiment.terms : ''
    );

    const dispatch = useDispatch();

    const onSaveTerms = () => {
        dispatch(
            modifyExperimentRequest({
                id: experiment.id,
                terms: terms,
            } as IExperiment)
        );
        handleClose();
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {/* Init Experiment */}
            <StyledDivConfig
                onClick={() => {
                    setOpen(true);
                }}
            >
                <EditIcon style={{ fontSize: '2.5em' }} />
                <strong>Terminos y Condiciones</strong>
            </StyledDivConfig>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll="paper"
                maxWidth={'sm'}
                fullWidth
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                {/* Title */}
                <DialogTitle id="scroll-dialog-title">
                    Terminos y Condiciones
                </DialogTitle>

                {/* Terms description */}
                <DialogContent dividers={true}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Ingresar terminos y condiciones"
                        fullWidth
                        required
                        value={terms}
                        onChange={(e: any) => setTerms(e.target.value)}
                        variant="standard"
                        multiline
                        rows={30}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={() => onSaveTerms()}
                        color="primary"
                        disabled={!terms || terms === experiment.terms}
                    >
                        {experiment.terms ? 'Modificar' : 'Guardar'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
