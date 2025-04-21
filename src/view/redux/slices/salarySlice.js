import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../axios/axios";

// Thunk to fetch salary data
export const fetchSalaryDetails = createAsyncThunk(
  "salary/fetchSalaryDetails",
  async (staffId, thunkAPI) => {
    try {
      const response = await API.get(`/salary/${staffId}`);
      
      return {
        staff: response.data.data.staff,
        salaryDetails: response.data.data.salary_details,
        restaurantDetails: response.data.data.restaurant_details, 
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addSalaryDetails = createAsyncThunk(
  "salary/addSalaryDetails",
  async ({ employeeId, salaryData }, thunkAPI) => {
    try {
      const response = await API.post(`/salary/${employeeId}`, salaryData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const salarySlice = createSlice({
  name: "salary",
  initialState: {
    staff: {},
    restaurantDetails: {},
    salaryDetails: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Salary Details
      .addCase(fetchSalaryDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalaryDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.staff = action.payload.staff;
        state.salaryDetails = action.payload.salaryDetails; 
        state.restaurantDetails = action.payload.restaurantDetails; 
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
        state.salaryDetails.push(action.payload); 
      })
      .addCase(addSalaryDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default salarySlice.reducer;
