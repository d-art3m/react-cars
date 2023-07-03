import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';

const carSlice = createSlice({
  name: 'cars',
  initialState: {
    items: null,
    loading: false,
    error: false,
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setItems: (state, action) => {
      state.loading = false;
      state.error = false;
      state.items = action.payload;
    },
    setError: (state) => {
      state.loading = false;
      state.error = true;
    },
    addCar: {
      reducer: (state, action) => {
        if (state.items === null) {
          state.items = [];
          state.error = false;
        }
        state.items.push(action.payload);
      },
      prepare: (car) => ({
        payload: {
          id: nanoid(),
          ...car,
        },
      }),
    },
    removeCar: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((car) => car.id !== id);
    },
    editCar: (state, action) => {
      const { id, color, price, availability } = action.payload;
      const item = state.items.find((item) => item.id === id);
      item.car_color = color;
      item.price = price;
      item.availability = availability;
    },
  },
});

export const fetchData = createAsyncThunk(
  'cars/fetchData',
  async (_, { dispatch, getState }) => {
    const { cars } = getState();
    if (cars.items === null) {
      dispatch(setLoading());
      try {
        const res = await fetch('https://myfakeapi.com/api/cars/');
        const data = await res.json();
        dispatch(setItems(data.cars));
      } catch (err) {
        dispatch(setError());
      }
    }
  }
);

export const search = (state, query) => {
  if (!query) return state.cars.items;
  return state.cars.items.filter(
    (item) =>
      item.car.includes(query) ||
      item.car_model.includes(query) ||
      item.car_vin.includes(query) ||
      item.car_color.includes(query) ||
      item.car_model_year.toString().includes(query) ||
      item.price.includes(query)
  );
};

export const { addCar, removeCar, editCar, setLoading, setItems, setError } = carSlice.actions;
export default carSlice;
