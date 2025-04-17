// src/redux/slices/staffSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../axios/axios";

export const createStaff = createAsyncThunk("staff/create", async (staffData, { rejectWithValue,dispatch }) => {
  try {
  
    
    const formData = new FormData();
    for (const key in staffData) {
      if (staffData[key]) {
        formData.append(key, staffData[key]);
      }
    }
  
    const response = await API.post("/staff", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(fetchAllStaff())
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const fetchAllStaff = createAsyncThunk("staff/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await API.get("/staff");
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const fetchStaffById = createAsyncThunk("staff/fetchById", async (id, { rejectWithValue }) => {
  try {
    const response = await API.get(`/staff/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});
export const updateStaff = createAsyncThunk("staff/updateStaff", async ({ id, staffData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in staffData) {
        if (staffData[key]) {
          formData.append(key, staffData[key]);
        }
      }
      const response = await API.put(`/staff/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  });
  

export const deleteStaff = createAsyncThunk("staff/delete", async (id, { rejectWithValue }) => {
  try {
    await API.delete(`/staff/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const staffSlice = createSlice({
  name: "staff",
  initialState: {
    staffList: [],
    selectedStaff: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedStaff: (state) => {
      state.selectedStaff = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Staff
      .addCase(createStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staffList.push(action.payload);
      })
      .addCase(createStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch All
      .addCase(fetchAllStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staffList = action.payload;
      })
      .addCase(fetchAllStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch By ID
      .addCase(fetchStaffById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStaffById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedStaff = action.payload;
      })
      .addCase(fetchStaffById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Staff
      .addCase(deleteStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staffList = state.staffList.filter((staff) => staff.id !== action.payload);
      })
      .addCase(deleteStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedStaff } = staffSlice.actions;
export default staffSlice.reducer;
