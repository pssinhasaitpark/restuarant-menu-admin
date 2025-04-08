import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios/axios'; 

export const createRestaurant = createAsyncThunk(
  'restaurant/create',
  async (restaurantData, { rejectWithValue, dispatch }) => {
    try {
      const response = await API.post('/restaurant/create', restaurantData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(fetchRestaurants()); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error occurred');
    }
  }
);

export const fetchRestaurants = createAsyncThunk(
  'restaurant/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/restaurant');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error occurred');
    }
  }
);
export const fetchRestaurantById = createAsyncThunk(
  "restaurant/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/restaurant/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error occurred");
    }
  }
);

export const updateRestaurant = createAsyncThunk(
  'restaurant/update',
  async ({ id, restaurantData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await API.put(`/restaurant/${id}`, restaurantData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(fetchRestaurants()); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error occurred');
    }
  }
);

export const deleteRestaurant = createAsyncThunk(
  'restaurant/delete',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await API.delete(`/restaurant/${id}`);
      dispatch(fetchRestaurants()); 
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error occurred');
    }
  }
);

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: { restaurants: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => { state.loading = true; })
      .addCase(fetchRestaurants.fulfilled, (state, action) => { state.loading = false; state.restaurants = action.payload; })
      .addCase(fetchRestaurants.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(fetchRestaurantById.pending, (state) => { state.loading = true; })
      .addCase(fetchRestaurantById.fulfilled, (state, action) => { 
        state.loading = false;
        state.restaurantDetails = action.payload;
      })
      .addCase(fetchRestaurantById.rejected, (state, action) => { 
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

export default restaurantSlice.reducer;


