import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axios/axios";

const initialState = {
  role: "",
  owner_name: "",
  restaurant_name: "",
  role_type: "",
  email: "",
  mobile: "",
  loading: false,
  error: null,
};

export const fetchProfileData = createAsyncThunk(
  "profile/fetchProfileData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/restaurant/me");
      
      // Ensure response has expected structure
      if (!response.data || !response.data.data) {
        throw new Error("Invalid API response structure");
      }

      return response.data.data;
    } catch (error) {
      console.error("Profile API Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch profile data");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.loading = false;
        const { owner_name, restaurant_name, role_type, email, mobile } = action.payload || {};

        state.role = role_type || "";
        state.owner_name = owner_name || "";
        state.restaurant_name = restaurant_name || "";
        state.role_type = role_type || "";
        state.email = email || "";
        state.mobile = mobile || "";
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default profileSlice.reducer;
