import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getData } from '../../api/firebase';

const initialState = {
  product: {},
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getData(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      return 'FETCH Error: ' + error;
    }
  }
);

export default productSlice.reducer;

export { fetchProduct };
