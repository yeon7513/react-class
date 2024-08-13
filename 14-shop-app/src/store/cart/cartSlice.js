import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addCart, deleteDatas } from '../../api/firebase';

const initialState = {
  products: localStorage.getItem('cartProducts')
    ? JSON.parse(localStorage.getItem('cartProducts'))
    : [],
  totalPrice: 0,
  userId: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.products.push({
        ...action.payload,
        quantity: 1,
        total: action.payload.price,
      });
      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },
    deleteFromCart: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },
    getTotalPrice: (state) => {
      state.totalPrice = state.products.reduce(
        (acc, cur) => (acc += cur.total),
        0
      );
    },
    incrementProduct: (state, action) => {
      const idx = state.products.findIndex(
        (product) => product.id === action.payload
      );
      const target = state.products[idx];
      target.quantity += 1;
      target.total += target.price;
      // state.products[idx].quantity += 1;
      // state.products[idx].total += state.products[idx].total;
    },
    decrementProduct: (state, action) => {
      const idx = state.products.findIndex(
        (product) => product.id === action.payload
      );
      const target = state.products[idx];
      target.quantity -= 1;
      target.total -= target.price;
    },
  },
});

export const addCartItem = createAsyncThunk(
  'cart/addCart',
  async ({ collectionName, product }, thunkAPI) => {
    try {
      thunkAPI.dispatch(addToCart(product));
      const {
        cartSlice: { products },
      } = thunkAPI.getState();

      const addItem = products.find(
        (sliceProduct) => sliceProduct.id === product.id
      );

      await addCart(collectionName, addItem);
    } catch (error) {
      return thunkAPI.rejectWithValue('Error Add Cart Item.');
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  'cart/deleteCart',
  async ({ collectionName, productId }, thunkAPI) => {
    try {
      const resultData = await deleteDatas(collectionName, productId);
      if (resultData) {
        thunkAPI.dispatch(deleteFromCart(productId));
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('Error Delete Cart Item.');
    }
  }
);

export default cartSlice.reducer;
export const {
  addToCart,
  deleteFromCart,
  getTotalPrice,
  incrementProduct,
  decrementProduct,
} = cartSlice.actions;
