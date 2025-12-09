import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ref, get } from 'firebase/database';
import { db } from '../../firebase/firebase';

export const fetchPsychologists = createAsyncThunk(
  'phychologists/fetchAll',
  async (_, thunkAPI) => {
    try {
      const snapshot = await get(ref(db, '/'));
      if (!snapshot.exists()) return [];

      const data = snapshot.val();

      if (typeof data === 'object' && data !== null) {
        return Object.entries(data).map(([key, item]) => ({
          id: key,
          ...item,
        }));
      }

      return [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const slice = createSlice({
  name: 'psychologists',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchPsychologists.pending, state => {
        state.loading = true;
      })
      .addCase(fetchPsychologists.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPsychologists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export default slice.reducer;
