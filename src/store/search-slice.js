import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    setQuery: (_, action) => {
      return action.payload;
    },
  },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice;
