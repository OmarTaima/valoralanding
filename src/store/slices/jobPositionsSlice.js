import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchJobPositions } from '../../api/jobPositionsApi';

// Async thunk to fetch job positions
export const getJobPositions = createAsyncThunk(
  'jobPositions/getJobPositions',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchJobPositions();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const jobPositionsSlice = createSlice({
  name: 'jobPositions',
  initialState: {
    positions: [],
    loading: false,
    error: null,
    selectedPosition: null,
  },
  reducers: {
    setSelectedPosition: (state, action) => {
      state.selectedPosition = action.payload;
    },
    clearSelectedPosition: (state) => {
      state.selectedPosition = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJobPositions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobPositions.fulfilled, (state, action) => {
        state.loading = false;
        state.positions = action.payload.data?.jobs || [];
        state.error = null;
      })
      .addCase(getJobPositions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch job positions';
      });
  },
});

export const { setSelectedPosition, clearSelectedPosition, clearError } = jobPositionsSlice.actions;

export default jobPositionsSlice.reducer;
