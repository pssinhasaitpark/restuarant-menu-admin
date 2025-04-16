import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios/axios'; 

// Async thunk to fetch orders
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => {
    const response = await API.get('/order');
    console.log("Response ===", response);
    return response.data.data; // Accessing orders directly from `data.data`
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [], // Initialize orders as an empty array
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload; // Payload now directly contains the orders array
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Capture error message if failed
      });
  },
});

export default ordersSlice.reducer;
