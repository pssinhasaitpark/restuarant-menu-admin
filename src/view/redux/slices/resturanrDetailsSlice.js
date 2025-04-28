import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios/axios";
import { useDispatch } from "react-redux";

const initialState = {
  details: null, 
  loading: false,
  error: null,
};

export const fetchAllRestaurantDetails = createAsyncThunk(
  "restaurantDetails/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/restaurantDetails");
      console.log("Fetched restaurant details:", response.data.data[0]);
      return response.data.data[0];
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addOrUpdateRestaurantDetails = createAsyncThunk(
  "restaurantDetails/addOrUpdate",
  async (restaurantDetails, { rejectWithValue,dispatch }) => {
    try {
      const response = await axios.post(
        "/restaurantDetails",
        restaurantDetails,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(fetchAllRestaurantDetails())

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const restaurantDetailsSlice = createSlice({
  name: "restaurantDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRestaurantDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRestaurantDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload; // Store fetched details in state
      })
      .addCase(fetchAllRestaurantDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(addOrUpdateRestaurantDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrUpdateRestaurantDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload; // Update state with new restaurant details
      })
      .addCase(addOrUpdateRestaurantDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default restaurantDetailsSlice.reducer;
