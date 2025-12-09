import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser } from './operations';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { name: null, email: null },
    isLoggedIn: false,
    isRefreshing: true,
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
    },
    clearUser(state) {
      state.user = { name: null, email: null };
      state.isLoggedIn = false;
      state.isRefreshing = false;
    },
  },
  extraReducers: builder => {
    builder
      // Registration
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      // Log In
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      //  Log Out
      .addCase(logoutUser.fulfilled, state => {
        state.user = { name: null, email: null };
        state.isLoggedIn = false;
        state.isRefreshing = false;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
