
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductData } from '../dataType/dataType';
import { Dispatch } from 'redux';

// Initial state for ProductData
const initialState: ProductData = {
	id: '',
	title: '',
	image: '',
	subtitle: '',
	brand: '',
	reviews: [],
	retailer: '',
	details: [],
	tags: [],
	sales: [],
}

export const fetchProductData =  () => {
	return async (dispatch: Dispatch) => {
		try
		{
			const response = await fetch('../../data/assessment-data.json');
			if (!response.ok) {
				throw new Error('Failed to fetch data from json file');
			}
			const data = await response.json();
			dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data });
		} catch (error) {
			dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: "" });
		}
	}
};

const appSlice = createSlice({
	name: 'product',
	initialState: {
		loading: false,
		...initialState,
	},
	reducers: {
		// Reducer to set the product data
		setData(state, action: PayloadAction<ProductData>) {
			const productDetails = action.payload;
			return { ...state, ...productDetails };
		},
	},
});


export const { setData } = appSlice.actions;
export default appSlice.reducer;