// slices/paymentSlice.js
import { createSlice } from '@reduxjs/toolkit';


const getInitialState = () => {
    if (typeof window !== 'undefined') {
        return {
            selectedMethod: localStorage.getItem('paymentMethod') || ''
        };
    } else {
        // Provide a fallback value if localStorage is not available
        return {
            selectedMethod: ''
        };
    }
};

const initialState = getInitialState();

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
