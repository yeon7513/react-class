import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDatas } from '../../api/firebase';

const initialState = {
  products: [],
  category: '',
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      return 'FETCH Error: ' + error;
    }
  }
);

export default productsSlice.reducer;

export { fetchProducts };
