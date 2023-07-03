import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import SplitButton from './SplitButton';

function Car(props) {
  const {
    id,
    car: company,
    car_model: model,
    car_vin: vin,
    car_color: color,
    car_model_year: year,
    price,
    availability,
  } = props;

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell> {company} </TableCell>
      <TableCell> {model} </TableCell>
      <TableCell> {vin} </TableCell>
      <TableCell> {color} </TableCell>
      <TableCell> {year} </TableCell>
      <TableCell> {price} </TableCell>
      <TableCell> {availability ? 'available' : 'not available'} </TableCell>
      <TableCell>
        <SplitButton car={{id, company, model, vin, color, year, price, availability}}/>
      </TableCell>
    </TableRow>
  );
}

export default Car;
