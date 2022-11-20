import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const DialogData = {
  isOpen: false,
  closeDialog: null,
  title: "",
  msg: "",
};

DialogData.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func,
  title: PropTypes.string,
  msg: PropTypes.string,
};

export default function CustomDialog(props) {
  const { isOpen, closeDialog, title, msg } = props.dialogData;

  const handleClose = () => {
    closeDialog();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {msg}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
