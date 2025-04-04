
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios/axios'; 

export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
    const response = await API.get('/booking'); 
    return response.data.data;
});

const customerSlice = createSlice({
    name: 'customers',
    initialState: {
        customers: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = action.payload;
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default customerSlice.reducer;