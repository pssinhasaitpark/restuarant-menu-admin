import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../axios/axios";

// Create Menu Item
export const createMenuItem = createAsyncThunk(
  "createmenu/create",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const response = await API.post("/menuManagement", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(getMenuItems());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Update Menu Item
export const updateMenuItem = createAsyncThunk(
  "createmenu/update",
  async ({ id, formData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await API.put(
        `/menuManagement/menuItem/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(getMenuItems());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Delete Menu Item
export const deleteMenuItem = createAsyncThunk(
  "createmenu/delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await API.delete(`/menuManagement/menuItem/${id}`);
      dispatch(getMenuItems());
      return { id, message: response.data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Fetch All Menu Items
export const getMenuItems = createAsyncThunk(
  "createmenu/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/menuManagement");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
// Get Menu Item By ID
export const getMenuItemById = createAsyncThunk(
  "createmenu/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/menuManagement/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Fetch QR Code
export const fetchQrCode = createAsyncThunk(
  "createmenu/fetchQrCode",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/menuManagement/qrCode");
      return response.data.data.qr_code_url;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const createmenuSlice = createSlice({
  name: "createmenu",
  initialState: {
    items: [],
    loading: false,
    error: null,
    success: false,
    deletedId: null,
    qrCodeUrl: null,
    selectedItem: null,
  },
  reducers: {
    resetMenuState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.deletedId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createMenuItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMenuItem.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.items.push(action.payload); // Optional: if you want to update UI instantly
      })
      .addCase(createMenuItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateMenuItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMenuItem.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateMenuItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteMenuItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.deletedId = action.payload.id;
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(deleteMenuItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch
      .addCase(getMenuItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMenuItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getMenuItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Menu Item by ID
      .addCase(getMenuItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedItem = null;
      })
      .addCase(getMenuItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedItem = action.payload;
      })
      .addCase(getMenuItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // QR Code
      .addCase(fetchQrCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQrCode.fulfilled, (state, action) => {
        state.loading = false;
        state.qrCodeUrl = action.payload;
      })
      .addCase(fetchQrCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMenuState } = createmenuSlice.actions;
export default createmenuSlice.reducer;
