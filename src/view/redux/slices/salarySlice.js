// salarySlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../axios/axios";

// Thunk to fetch salary data
export const fetchSalaryDetails = createAsyncThunk(
  "salary/fetchSalaryDetails",
  async (staffId, thunkAPI) => {
    try {
      const response = await API.get(`/salary/${staffId}`);
      return response.data.data; // Assuming response contains a `data` property with the data we need
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk to add salary details (new POST action)
export const addSalaryDetails = createAsyncThunk(
  "salary/addSalaryDetails",
  async ({ employeeId, salaryData }, thunkAPI) => {
    try {
      // Send the employeeId as part of the URL and salaryData in the body
      const response = await API.post(`/salary/${employeeId}`, salaryData);
      return response.data.data; // Assuming response contains a `data` property with the added salary data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const salarySlice = createSlice({
  name: "salary",
  initialState: {
    staff: {},
    salaryDetails: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalaryDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalaryDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.staff = action.payload.staff;
        state.salaryDetails = action.payload.salary_details; // Assuming the API returns this structure
      })
      .addCase(fetchSalaryDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addSalaryDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSalaryDetails.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally, you can append the new salary data to the list
        state.salaryDetails.push(action.payload);
      })
      .addCase(addSalaryDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default salarySlice.reducer;
