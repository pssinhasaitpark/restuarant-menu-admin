import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../axios/axios"; 


export const createTable = createAsyncThunk(
  "table/create",
  async (tableData, { rejectWithValue, dispatch }) => {
    try {
      const response = await API.post("/tables", tableData);
      dispatch(fetchTables());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error occurred");
    }
  }
);

export const fetchTables = createAsyncThunk(
  "table/fetchAll",
  async (_, { rejectWithValue }) => {
    try { 
      const response = await API.get("/tables");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error occurred");
    }
  }
);

// Async thunk to fetch table by ID
export const fetchTableById = createAsyncThunk(
  "table/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/tables/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error occurred");
    }
  }
);

// Async thunk to update table details
export const updateTable = createAsyncThunk(
  "table/update",
  async ({ id, tableData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await API.put(`/tables/${id}`, tableData);
      dispatch(fetchTables());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error occurred");
    }
  }
);


export const deleteTable = createAsyncThunk(
  "table/delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await API.delete(`/tables/${id}`);
      dispatch(fetchTables()); 
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error occurred");
    }
  }
);

// Table slice
const tableSlice = createSlice({
  name: "table",
  initialState: {
    tables: [],
    tableDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTables.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTables.fulfilled, (state, action) => {
        state.loading = false;
        state.tables = action.payload;
      })
      .addCase(fetchTables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTableById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTableById.fulfilled, (state, action) => {
        state.loading = false;
        state.tableDetails = action.payload;
      })
      .addCase(fetchTableById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tableSlice.reducer;
