import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../axios/axios";

export const createMenuItem = createAsyncThunk(
  "createmenu/create",
  async (menuData, { rejectWithValue, dispatch }) => {
    try {
      const response = await API.post("/menu_management", menuData);
      dispatch(fetchMenuItems());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error occurred");
    }
  }
);

export const fetchMenuItems = createAsyncThunk(
  "createmenu/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/menu_management");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error occurred");
    }
  }
);

export const fetchMenuItemById = createAsyncThunk(
  "createmenu/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/menu_items/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error occurred");
    }
  }
);

export const updateMenuItem = createAsyncThunk(
  "createmenu/update",
  async ({ id, menuData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await API.put(`/menu_items/${id}`, menuData);
      dispatch(fetchMenuItems());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error occurred");
    }
  }
);

export const deleteMenuItem = createAsyncThunk(
  "createmenu/delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await API.delete(`/menu_items/${id}`);
      dispatch(fetchMenuItems());
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error occurred");
    }
  }
);

const createMenuSlice = createSlice({
  name: "createmenu",
  initialState: {
    menuItems: [],
    menuItemDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.loading = false;
        state.menuItems = action.payload;
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMenuItemById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenuItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.menuItemDetails = action.payload;
      })
      .addCase(fetchMenuItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default createMenuSlice.reducer;