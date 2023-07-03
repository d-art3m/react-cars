import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Car from './Car';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, search, setItems } from '../store/car-slice';
import { useEffect, useState } from 'react';
import Search from './Search';
import AddCar from './AddCar';
import Preloader from './ui/Preloader';
import { Box, Button, Typography } from '@mui/material';

function Cars() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.cars.loading);
  const error = useSelector((state) => state.cars.error);
  const query = useSelector((state) => state.search);
  const cars = useSelector((state) => search(state, query));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = cars !== null? cars.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage): [];
  if (visibleRows.length === 0 && page > 0) setPage(page - 1);

  if (error) {
    return (
      <>
        <Typography variant="h3" sx={{ my: 2 }}>
          Error loading data
        </Typography>
        <Button variant="outlined" onClick={() => dispatch(fetchData())}>
          Retry
        </Button>
        <Button
          variant="outlined"
          sx={{ ml: 2 }}
          onClick={() => dispatch(setItems([]))}
        >
          Ignore
        </Button>
      </>
    );
  }

  return loading ? (
    <Preloader />
  ) : (
    <>
      <Search setPage={setPage} />
      <Box display="flex" justifyContent="space-between">
        <AddCar />
        {cars !== null && visibleRows.length !== 0 && (
          <TablePagination
            sx={{ my: 2 }}
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={cars.length}
            rowsPerPage={rowsPerPage}
            page={page}
            showFirstButton={true}
            showLastButton={true}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Box>
      {!visibleRows.length ? (
        <Typography variant="h3">Nothing to show</Typography>
      ) : (
        <TableContainer sx={{ mb: 2 }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell> Company </TableCell>
                <TableCell> Model </TableCell>
                <TableCell> VIN </TableCell>
                <TableCell> Color </TableCell>
                <TableCell> Year </TableCell>
                <TableCell> Price </TableCell>
                <TableCell> Availability </TableCell>
                <TableCell> Actions columns </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((item) => (
                <Car key={item.id} {...item} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default Cars;
