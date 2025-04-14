// redux/slices/supportquerySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios/axios'; 

export const fetchSupportQuery = createAsyncThunk(
  'support/fetchSupportQuery',
  async () => {
    const response = await API.get('/support'); 
    return response.data.data;
  }
);

export const deleteSupportQuery = createAsyncThunk(
  'support/deleteSupportQuery',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await API.delete(`/support/${id}`);
      dispatch(fetchSupportQuery());
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error occurred');
    }
  }
);
const supportquerySlice = createSlice({
  name: 'supportquery',
  initialState: {
    support: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupportQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSupportQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.support = action.payload;
      })
      .addCase(fetchSupportQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteSupportQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSupportQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.support = state.support.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteSupportQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default supportquerySlice.reducer;
