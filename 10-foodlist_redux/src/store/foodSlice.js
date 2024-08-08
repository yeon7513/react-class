import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addDatas,
  deleteDatas,
  getDatasByOrderLimit,
  updateDatas,
} from '../api/firebase';

const foodSlice = createSlice({
  name: 'food',
  initialState: {
    items: [],
    lq: undefined,
    isLoading: true,
    status: 'ready',
    loadingError: '',
    order: 'createdAt',
    hasNext: true,
  },
  reducers: {
    setOrder(state, action) {
      state.order = action.payload;
    },
    setHasNext(state, action) {
      state.hasNext = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadItems.pending, (state, action) => {
        state.isLoading = true;
        state.status = 'Loading...';
      })
      .addCase(loadItems.fulfilled, (state, action) => {
        // handleMoreClick 실행 시 이어서 추가하는 방법 1
        // state.items = [...state.items, ...action.payload.resultData];

        // handleMoreClick 실행 시 이어서 추가하는 방법 2
        if (action.payload.isReset) {
          state.items = action.payload.resultData;
        } else {
          action.payload.resultData.forEach((data) => {
            state.items.push(data);
          });
        }

        state.lq = action.payload.lastQuery;
        // state.hasNext = action.payload.lastQuery ? true : false;
        state.hasNext = !!action.payload.lastQuery;

        state.isLoading = false;
        state.status = 'Complete!';
      })
      .addCase(loadItems.rejected, (state, action) => {
        state.isLoading = true;
        state.loadingError = action.payload;
        state.status = 'Fail...';
      })
      .addCase(addItem.pending, (state, action) => {
        state.isLoading = true;
        state.status = 'Loading...';
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.isLoading = false;
        state.status = 'Complete!';
      })
      .addCase(updateItem.pending, (state, action) => {
        state.isLoading = true;
        state.status = 'Loading...';
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const idx = state.items.findIndex(
          (food) => food.id === action.payload.id
        );
        state.items[idx] = action.payload;
        state.isLoading = false;
        state.status = 'Complete!';
      })
      .addCase(deleteItem.pending, (state, action) => {
        state.isLoading = true;
        state.status = 'Loading...';
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (food) => food.docId !== action.payload
        );
        state.isLoading = false;
        state.status = 'Complete!';
      });
  },
});

const loadItems = createAsyncThunk(
  'foods/loadItems',
  async ({ collectionName, options }) => {
    try {
      const resultData = await getDatasByOrderLimit(collectionName, options);
      resultData.isReset = !options.lastQuery ? true : false;
      return resultData;
    } catch (error) {
      return 'LOAD Error: ' + error;
    }
  }
);

const addItem = createAsyncThunk(
  'foods/addItem',
  async ({ collectionName, addObj }) => {
    try {
      const resultData = await addDatas(collectionName, addObj);
      return resultData;
    } catch (error) {
      return 'ADD Error: ' + error;
    }
  }
);

const updateItem = createAsyncThunk(
  'foods/updateItem',
  async ({ collectionName, updateObj, docId, imgUrl }) => {
    try {
      const resultData = await updateDatas(
        collectionName,
        updateObj,
        docId,
        imgUrl
      );
      return resultData;
    } catch (error) {
      return 'UPDATE Error: ' + error;
    }
  }
);

const deleteItem = createAsyncThunk(
  'foods/deleteItem',
  async ({ collectionName, docId, imgUrl }) => {
    try {
      await deleteDatas(collectionName, docId, imgUrl);
      return docId;
    } catch (error) {
      return 'DELETE Error: ' + error;
    }
  }
);

export default foodSlice;
export { addItem, deleteItem, loadItems, updateItem };
export const { setOrder, setHasNext } = foodSlice.actions;
