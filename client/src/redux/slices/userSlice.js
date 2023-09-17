import { createSlice } from '@reduxjs/toolkit';
import { getUser, loginUser, registerUser } from '../actions/userActions';
// Define the initial state using that type
const initialState = {
  loading: false,
  error: null,
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action?.payload?.data;
      state.isAuthenticated = action?.payload?.isAuthenticated;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action?.payload?.data;
      state.isAuthenticated = action?.payload?.isAuthenticated;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.payload;
    });
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action?.payload?.data;
      state.isAuthenticated = action?.payload?.isAuthenticated;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { clearErrors } = userSlice.actions;
export const userReducer = userSlice.reducer;
