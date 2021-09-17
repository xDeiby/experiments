// Librarys
import React from 'react';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogProps,
    DialogTitle,
    FormControlLabel,
} from '@material-ui/core';

// Model Props
interface IModalTermsProps {
    acepted: () => void;
}

// Component
export default function ModalTerms({ acepted }: IModalTermsProps) {
    // States
    const [open, setOpen] = React.useState(false);
    const [isAcepted, setIsAcepted] = React.useState(false);

    // Methods
    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef<HTMLElement>(null);

    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            {/* Init Experiment */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen('paper')}
            >
                Iniciar Experimento
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll="paper"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                {/* Title */}
                <DialogTitle id="scroll-dialog-title">
                    Terminos y Condiciones
                </DialogTitle>

                {/* Terms description */}
                <DialogContent dividers={true}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {[...new Array(50)]
                            .map(
                                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
                            )
                            .join('\n')}
                    </DialogContentText>
                </DialogContent>
                {/* Checkbox to accept conditions */}
                <div style={{ marginLeft: '20px' }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isAcepted}
                                onChange={({ target }) =>
                                    setIsAcepted(target.checked)
                                }
                                name="checkedB"
                                color="primary"
                                size="small"
                            />
                        }
                        label="Estoy de acuerdo y acepto los terminos y condiciones"
                    />
                </div>

                {/* Acept or Decline */}
                <DialogActions>
                    <Button
                        color="secondary"
                        onClick={handleClose}
                        startIcon={<CancelOutlinedIcon />}
                    >
                        No Acepto
                    </Button>
                    <Button
                        startIcon={<CheckCircleOutlineOutlinedIcon />}
                        onClick={() => {
                            setOpen(false);
                            acepted();
                        }}
                        color="primary"
                        disabled={!isAcepted}
                    >
                        Acepto
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
