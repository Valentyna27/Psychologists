import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortType: 'popular',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

export const { setSortType } = filtersSlice.actions;
export default filtersSlice.reducer;
