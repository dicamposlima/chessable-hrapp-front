import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const Modal = props => {
    const [open, setOpen] = React.useState(true);
    const cancelarAcao = () => {
      setOpen(false);
      props.fecharModal()
    };
    const confirmarAcao = () => {
      setOpen(false);
      props.fecharModal()
      props.acaoModal()
    };
    return (
        <React.Fragment>
          <Dialog
            open={open}
            onClose={cancelarAcao}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{props.dialogTitle}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
               {props.dialogContentText}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelarAcao} color="primary">
                Cancelar
              </Button>
              <Button onClick={confirmarAcao} color="primary" autoFocus>
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      );
}

export default Modal;