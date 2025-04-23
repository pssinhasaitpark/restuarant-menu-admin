import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axios/axios";

// Fetch social media links
export const fetchSocialMedia = createAsyncThunk(
  "socialMedia/fetch",
  async () => {
    const response = await api.get("/socialMedia");
    return response.data.data;
  }
);

// Update social media links (sending JSON)
export const updateSocialMedia = createAsyncThunk(
  "socialMedia/update",
  async ({ id, updatedLinks }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/socialmedia/${id}`, updatedLinks, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

// Add new social media links (sending JSON)
export const addSocialMedia = createAsyncThunk(
  "socialMedia/add",
  async (newLinks, { rejectWithValue }) => {
    try {
      const response = await api.post("/socialMedia", newLinks, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Adding failed");
    }
  }
);

// Slice
const socialMediaSlice = createSlice({
  name: "socialMedia",
  initialState: {
    links: {},
    id: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSocialMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSocialMedia.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.id) {
          state.id = action.payload.id;
          state.links = {
            whatsapp: action.payload.whatsapp,
            facebook: action.payload.facebook,
            instagram: action.payload.instagram,
            youtube: action.payload.youtube,
          };
        } else {
          state.error = "API response is missing id.";
        }
      })
      .addCase(fetchSocialMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateSocialMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSocialMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.links = {
          whatsapp: action.payload.whatsapp,
          facebook: action.payload.facebook,
          instagram: action.payload.instagram,
          youtube: action.payload.youtube,
        };
      })
      .addCase(updateSocialMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(addSocialMedia.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSocialMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.links = {
          whatsapp: action.payload.whatsapp,
          facebook: action.payload.facebook,
          instagram: action.payload.instagram,
          youtube: action.payload.youtube,
        };
        state.id = action.payload.id;
      })
      .addCase(addSocialMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default socialMediaSlice.reducer;
