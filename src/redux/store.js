// store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import paymentReducer from './slices/paymentSlice';
import merchantReducer from './slices/merchantSlice';

const store = configureStore({
    reducer: {
        products: productReducer,
        paymentMethod: paymentReducer,
        merchant: merchantReducer
    },
});

export default store;
