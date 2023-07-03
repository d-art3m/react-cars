import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { removeCar } from '../../store/car-slice';

function DeleteDialog({ id, open, setOpen }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(removeCar(id));
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
