// slices/merchantSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    merchantName: '',
    merchantLogo:'',
    error: null,
};

const merchantSlice = createSlice({
    name: 'merchant',
    initialState,
    reducers: {
        fetchMerchantStart(state) {
            state.loading = true;
        },
        fetchMerchantSuccess(state, action) {
            state.loading = false;
            state.merchantName = action.payload.merchantName;
            state.merchantLogo = action.payload.merchantLogo;
            state.error = null;
        },
        fetchMerchantFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchMerchantStart,
    fetchMerchantSuccess,
    fetchMerchantFailure,
} = merchantSlice.actions;


export const fetchMerchant = () => async (dispatch) => {
    try {
        dispatch(fetchMerchantStart());

            const response = await fetch('https://groww-intern-assignment.vercel.app/v1/api/merchant-metadata');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            console.log(data);
            dispatch(fetchMerchantSuccess(data));
    } catch (error) {
        dispatch(fetchMerchantFailure(error.message));
    }
};

export default merchantSlice.reducer;
