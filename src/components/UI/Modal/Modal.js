import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const Modal = props => {
    const [open, setOpen] = React.useState(true);
    const cancelAction = () => {
      setOpen(false);
      props.closeModal()
    };
    const confirmarAcao = () => {
      setOpen(false);
      props.closeModal()
      props.actionModal()
    };
    return (
        <React.Fragment>
          <Dialog
            open={open}
            onClose={cancelAction}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{props.dialogTitle}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
               {props.dialogContentText}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={cancelAction} color="primary">
                Cancel
              </Button>
              <Button onClick={confirmarAcao} color="primary" autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      );
}

export default Modal;