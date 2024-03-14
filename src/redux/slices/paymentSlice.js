// slices/paymentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedMethod: localStorage.getItem('paymentMethod') || ''
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setSelectedPaymentMethod(state, action) {
            state.selectedMethod = action.payload;
            // localStorage.setItem('selectedPaymentMethod', action.payload);
        }
    }
});

export const { setSelectedPaymentMethod } = paymentSlice.actions;

export default paymentSlice.reducer;
