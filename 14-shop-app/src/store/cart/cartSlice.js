import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDatasRest, deleteDatasRest, deleteDatasRestBatch } from '../../api';
import { syncCart, updateTotalAndQuantity } from '../../api/firebase';

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
    syncCartAndSlice: (state, action) => {
      state.products = action.payload;
      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },
    getTotalPrice: (state) => {
      state.totalPrice = state.products.reduce(
        (acc, cur) => (acc += cur.total),
        0
      );
    },
    incrementProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      state.products[index].quantity += 1;
      state.products[index].total += state.products[index].price;
      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },
    decrementProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      state.products[index].quantity -= 1;
      state.products[index].total -= state.products[index].price;
      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },
    sendOrder: (state) => {
      state.products = [];
      localStorage.setItem('cartProducts', JSON.stringify(state.products));
    },
  },
});

export const syncCartAndStorage = createAsyncThunk(
  'cart/asyncCartItem',
  async ({ uid, cartItems }, thunkAPI) => {
    try {
      const result = await syncCart(uid, cartItems);
      thunkAPI.dispatch(syncCartAndSlice(result));
    } catch (error) {
      console.error(error);
    }
  }
);

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

      // await addCart(collectionName, addItem);
      await addDatasRest(collectionName, addItem);
    } catch (error) {
      return thunkAPI.rejectWithValue('Error Add Cart Item.');
    }
  }
);

// export const deleteCartItem = createAsyncThunk(
//   'cart/deleteCart',
//   async ({ collectionName, productId }, thunkAPI) => {
//     try {
//       const resultData = await deleteDatas(collectionName, productId);
//       if (resultData) {
//         thunkAPI.dispatch(deleteFromCart(productId));
//       }
//     } catch (error) {
//       return thunkAPI.rejectWithValue('Error Delete Cart Item.');
//     }
//   }
// );

export const deleteCartItem = createAsyncThunk(
  'cart/deleteCart',
  async ({ collectionName, productId }, thunkAPI) => {
    try {
      const resultData = await deleteDatasRest(collectionName);
      if (resultData) {
        thunkAPI.dispatch(deleteFromCart(productId));
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('Error Delete Cart Item.');
    }
  }
);

export const calculateTotalAndQuantity = createAsyncThunk(
  'cart/cartItemCalculate',
  async ({ uid, productId, operator }, thunkAPI) => {
    try {
      await updateTotalAndQuantity(uid, productId, operator);
      if (operator === 'increment') {
        thunkAPI.dispatch(incrementProduct(productId));
      } else {
        thunkAPI.dispatch(decrementProduct(productId));
      }
    } catch (error) {
      console.error(error);
    }
  }
);

// export const postOrder = createAsyncThunk(
//   'cart/createOrder',
//   async ({ uid, cart }, thunkAPI) => {
//     try {
//       // createOrder 함수 호출
//       const result = await createOrder(uid, cart);
//       if (!result) {
//         return;
//       }
//       // cartSlice 의 products 초기화 및 로컬스토리지 초기화
//       thunkAPI.dispatch(sendOrder());
//     } catch (error) {
//       console.error(error);
//     }
//   }
// );

export const postOrder = createAsyncThunk(
  'cart/createOrder',
  async ({ uid, cart }, thunkAPI) => {
    try {
      // createOrder 함수 호출
      const orderObj = {
        cancelYn: 'N',
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        ...cart,
      };

      const result = await addDatasRest(
        `users/${uid}/orders/${crypto.randomUUID().slice(0, 20)}`,
        orderObj
      );

      const deleteResult = await deleteDatasRestBatch(
        `/users/${uid}/cart`,
        cart.products
      );

      if (!result) {
        return;
      }
      // cartSlice 의 products 초기화 및 로컬스토리지 초기화
      thunkAPI.dispatch(sendOrder());
    } catch (error) {
      console.error(error);
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
  syncCartAndSlice,
  sendOrder,
} = cartSlice.actions;
