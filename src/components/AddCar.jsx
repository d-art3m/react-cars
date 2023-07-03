import { useState } from 'react';
import AddEditDialog from './dialogs/AddEditDialog';
import { Button } from '@mui/material';

function AddCar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="outlined"
        sx={{ width: '50%', my: 2 }}
        onClick={() => setOpen(true)}
      >
        ADD CAR
      </Button>
      <AddEditDialog open={open} setOpen={setOpen} car={{ id: null }} />
    </>
  );
}

export default AddCar;
