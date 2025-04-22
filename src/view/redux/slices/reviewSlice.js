import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../axios/axios";

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/review/restaurant");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch reviews");
    }
  }
);

export const deleteReviews = createAsyncThunk(
  "review/deletereview",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await API.delete(`/review/${id}`);
      dispatch(fetchReviews());
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error occurred");
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    review: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.review = action.payload; // Correct the state key here
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReviews.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted review locally to avoid refetching
        state.review = state.review.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;
