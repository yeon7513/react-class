import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart/cartSlice';
import categoriesSlice from './categories/categoriesSlice';
import orderSlice from './order/orderSlice';
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
    orderSlice,
  },
});

export default store;
