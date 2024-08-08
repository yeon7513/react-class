import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { plus: 0, minus: 50 },
  reducers: {
    up: (state, action) => {
      state.plus += action.payload;
    },
    down: (state, action) => {
      state.minus -= action.payload;
    },
  },
});

export default counterSlice;

// 구조 분해도 된다. => 구조분해 할 때는 reducers가 아닌 actions로 구조분해하기!!
export const { up, down } = counterSlice.actions;
