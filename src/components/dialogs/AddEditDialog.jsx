import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { addCar, editCar } from '../../store/car-slice';
import { Box, InputLabel, NativeSelect, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function AddEditDialog({ open, setOpen, car }) {
  const dispatch = useDispatch();
  const isNew = car.id === null;

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const color = event.target.color.value;
    const price = `$${Number.parseFloat(event.target.price.value).toFixed(2)}`;
    const availability = !!Number(event.target.availability.value);

    if (isNew) {
      dispatch(
        addCar({
          car: event.target.company.value,
          car_model: event.target.model.value,
          car_color: color,
          car_model_year: Number(event.target[8].value),
          car_vin: event.target.vin.value,
          price,
          availability,
        })
      );
    } else {
      dispatch(
        editCar({
          id: car.id,
          color,
          price,
          availability,
        })
      );
    }
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{isNew ? 'Add car' : 'Edit car'}</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              sx={{ mt: 1 }}
              name="company"
              label="Company"
              required
              defaultValue={isNew ? '' : car.company}
              disabled={!isNew}
            />
            <TextField
              sx={{ mt: 1 }}
              name="model"
              label="Model"
              required
              defaultValue={isNew ? '' : car.model}
              disabled={!isNew}
            />
            <TextField
              sx={{ mt: 1 }}
              name="vin"
              label="VIN"
              required
              defaultValue={isNew ? '' : car.vin}
              disabled={!isNew}
            />
            <TextField
              sx={{ mt: 1 }}
              name="color"
              label="Color"
              required
              defaultValue={isNew ? '' : car.color}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Year"
                inputProps={{
                  id: 'year',
                  name: 'year',
                }}
                sx={{ mt: 1 }}
                disabled={!isNew}
                views={['year']}
                defaultValue={isNew ? dayjs() : dayjs().year(Number(car.year))}
                minDate={dayjs().year(1900)}
                maxDate={dayjs()}
                slotProps={{
                  textField: {
                    readOnly: true,
                  },
                }}
              />
            </LocalizationProvider>
            <TextField
              sx={{ mt: 1 }}
              name="price"
              label="Price"
              required
              type="number"
              defaultValue={isNew ? '' : car.price.replace('$', '')}
              inputProps={{ min: '0.01', step: '0.01' }}
              onKeyDown={(e) => {
                if (e.key === 'e' || e.key === 'E' || e.key === '-')
                  e.preventDefault();
              }}
            />
            <InputLabel htmlFor="availability" sx={{ mt: 1, px: 1 }}>
              Availability
            </InputLabel>
            <NativeSelect
              sx={{ px: 1 }}
              defaultValue={isNew ? 1 : Number(car.availability)}
              inputProps={{
                name: 'availability',
                id: 'availability',
              }}
            >
              <option value={1}>available</option>
              <option value={0}>not available</option>
            </NativeSelect>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default AddEditDialog;
