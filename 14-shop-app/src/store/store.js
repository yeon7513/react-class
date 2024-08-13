import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart/cartSlice';
import categoriesSlice from './categories/categoriesSlice';
import productSlice from './products/productSilce';
import productsSlice from './products/productsSlice';
import userSlice from './user/userSlice';

const store = configureStore({
  reducer: {
    productSlice,
    productsSlice,
    categoriesSlice,
    cartSlice,
    userSlice,
  },
});

export default store;
