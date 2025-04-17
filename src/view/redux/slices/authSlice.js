import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../axios/axios";

// Async thunk for user login
export const loginUser  = createAsyncThunk(
  "auth/loginUser ",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.post("/restaurant/login", credentials);
      const { encryptedToken, role_type } = response.data.data;
      localStorage.setItem("authToken", encryptedToken);
      localStorage.setItem("userType", role_type);

      return { token: encryptedToken, userType: role_type };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("authToken") || null,
    userType: localStorage.getItem("userType") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userType = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("userType");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser .pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser .fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userType = action.payload.userType;
      })
      .addCase(loginUser .rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;