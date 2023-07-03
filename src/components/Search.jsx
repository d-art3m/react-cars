import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setQuery } from '../store/search-slice';

function Search({ setPage }) {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setQuery(value));
  }, [dispatch, value]);

  return (
    <TextField
      type="search"
      placeholder="Search"
      autoFocus={true}
      fullWidth={true}
      sx={{ mt: 2 }}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
        setPage(0);
      }}
    />
  );
}

export default Search;
