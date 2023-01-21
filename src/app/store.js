import { configureStore } from '@reduxjs/toolkit';
import countryReducer from '../features/country/countryListSlice';

export const store = configureStore({
  reducer: {
    country: countryReducer,
  },
});
