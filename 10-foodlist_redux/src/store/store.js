import { configureStore } from '@reduxjs/toolkit';
import foodSlice from './foodSlice';

const store = configureStore({
  reducer: {
    foods: foodSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
