import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axios/axios";

export const fetchCustomerOrdersCount = createAsyncThunk(
    "dashboard/fetchCustomerOrdersCount",
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.get("/booking");
        return response.data.data.length; 
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch Customer Orders"
        );
      }
    }
);

export const fetchStaffCount = createAsyncThunk(
  "dashboard/fetchStaffCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/staff");
      return response.data.data.length;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch staff"
      );
    }
  }
);

export const fetchtablecount = createAsyncThunk(
  "dashboard/fetchtablecount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/tables");
      return response.data.data.length;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tables"
      );
    }
  }
);

export const fetchSupportCount = createAsyncThunk(
  "dashboard/fetchSupportCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/support");
      return response.data.data.length;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch support"
      );
    }
  }
);

// Initial state
const initialState = {
  totalCustomerOrders: 0,
  totalStaff: 0,
  totaltable: 0,
  totalSupport: 0,
  loading: false,
  error: null,
};

// Create the slice
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerOrdersCount.fulfilled, (state, action) => {
        state.totalCustomerOrders = action.payload; // Correct state update
        state.loading = false;
      })
      .addCase(fetchStaffCount.fulfilled, (state, action) => {
        state.totalStaff = action.payload; // Correct state update
        state.loading = false;
      })
      .addCase(fetchtablecount.fulfilled, (state, action) => {
        state.totaltable = action.payload; // Correct state update
        state.loading = false;
      })
      .addCase(fetchSupportCount.fulfilled, (state, action) => {
        state.totalSupport = action.payload; // Correct state update
        state.loading = false;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default dashboardSlice.reducer;
