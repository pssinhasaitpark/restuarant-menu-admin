
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../axios/axios"; 



export const fetchAllStockItems = createAsyncThunk(
    "stock/fetchAll",
    async (_, thunkAPI) => {
      try {
        const res = await API.get("/stock");
        return res.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  

export const fetchStockItemById = createAsyncThunk(
  "stock/fetchById",
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/stock/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createStockItem = createAsyncThunk(
  "stock/create",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/stock", data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateStockItem = createAsyncThunk(
  "stock/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await API.put(`/stock/${id}`, data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteStockItem = createAsyncThunk(
  "stock/delete",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/stock/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
    items: [], // MUST be an array
    currentItem: null,
    loading: false,
    error: null,
  };
  
// Slice
const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    clearCurrentItem: (state) => {
      state.currentItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAllStockItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllStockItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllStockItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch by ID
      .addCase(fetchStockItemById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStockItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload;
      })
      .addCase(fetchStockItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createStockItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Update
      .addCase(updateStockItem.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteStockItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

// Export actions & reducer
export const { clearCurrentItem } = stockSlice.actions;
export default stockSlice.reducer;
