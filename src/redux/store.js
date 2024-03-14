// store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import paymentReducer from './slices/paymentSlice';

const store = configureStore({
    reducer: {
        products: productReducer,
        paymentMethod: paymentReducer
    },
});

export default store;
