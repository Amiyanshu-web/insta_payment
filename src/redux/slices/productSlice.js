// slices/productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    products: [],
    methods: null,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProductsStart(state) {
            state.loading = true;
        },
        fetchProductsSuccess(state, action) {
            state.loading = false;
            state.products = action.payload.products;
            state.methods = action.payload.paymentMethods;
            state.error = null;
        },
        fetchProductsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailure,
} = productSlice.actions;


export const fetchProducts = () => async (dispatch) => {
    try {
        dispatch(fetchProductsStart());
        const cachedProducts = localStorage.getItem('data');
        if (cachedProducts) {
            const parsedProducts = JSON.parse(cachedProducts);
            dispatch(fetchProductsSuccess(parsedProducts));
        }
        else {

            const response = await fetch('https://groww-intern-assignment.vercel.app/v1/api/order-details');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            console.log(data);
            dispatch(fetchProductsSuccess(data));
        }
    } catch (error) {
        dispatch(fetchProductsFailure(error.message));
    }
};

export default productSlice.reducer;
