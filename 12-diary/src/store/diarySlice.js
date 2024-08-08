import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDatas, deleteDatas, getDatas, updateDatas } from '../api/firebase';

const diarySlice = createSlice({
  name: 'diary',
  initialState: {
    items: [],
    error: null,
    status: 'welcome',
  },
  reducers: {
    // reducers : 동기 작업 함수들
  },
  // extraReducers : 비동기 작업 함수들
  extraReducers: (builder) => {
    // 비동기 작업은 actionCreator를 자동으로 만들어주지 못한다.
    // 그래서 createAsyncThunk를 사용하여 actionCreator함수를 만들어줘야한다.
    builder
      .addCase(fetchItems.pending, (state, action) => {
        // pending : 로딩중 (작업중)
        state.status = 'Loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        // fulfilled : 작업완료
        state.items = action.payload;
        state.status = 'Complete';
      })
      .addCase(fetchItems.rejected, (state, action) => {
        // rejected : 작업실패
        state.status = 'Fail';
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = 'Complete';
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        // 1. map 사용
        // state.items = state.items.map((item) =>
        //   item.id === action.payload.id ? action.payload : item
        // );

        // 2. findIndex 사용
        // => 바뀐 요소의 인덱스를 찾아 바꿔준다.
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;

        state.status = 'Complete';
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.docId !== action.payload
        );
        state.status = 'Complete';
      });
  },
});

// createAsyncThunk("type", payload를 만들어주는 함수)
// 단, 파라미터를 하나만 사용할 수 있기 때문에
// 여러 개의 파라미터를 사용할 경우, 구조분해형태로 파라미터를 받아 사용한다.
const fetchItems = createAsyncThunk(
  'items/fetchAllItems',
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      console.log('FETCH Error', error);
    }
  }
);

const addItem = createAsyncThunk(
  'items/addItem',
  async ({ collectionName, addObj }) => {
    try {
      const resultData = await addDatas(collectionName, addObj);
      return resultData;
    } catch (error) {
      console.log('ADD Error', error);
    }
  }
);

const updateItem = createAsyncThunk(
  'items/updateItem',
  async ({ collectionName, docId, updateObj }) => {
    try {
      const resultData = await updateDatas(collectionName, docId, updateObj);
      return resultData;
    } catch (error) {
      console.log('UPDATE Error', error);
    }
  }
);

const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async ({ collectionName, docId }) => {
    try {
      const result = await deleteDatas(collectionName, docId);
      if (result) {
        return docId;
      }
    } catch (error) {
      console.log('DELETE Error', error);
    }
  }
);

export default diarySlice;

export { addItem, deleteItem, fetchItems, updateItem };
