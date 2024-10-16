import { configureStore, createReducer } from '@reduxjs/toolkit';
import userReducer from './redux/userSlice';
import productReducer from './redux/productSlice';



import createSlice from './redux/createSlice';
import orderSlice from './redux/orderSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    cart: createSlice,
    orders: orderSlice,
  },
});

export default store;
