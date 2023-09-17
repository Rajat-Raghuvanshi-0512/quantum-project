import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const base = import.meta.env.VITE_APP_BACKEND_URL;

export const registerUser = createAsyncThunk(
  'user/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${base}/api/auth/signup`, userData);
      return { data: data.user, isAuthenticated: true };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err?.response?.data.error);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${base}/api/auth/login`, userData);
      return { data: data.user, isAuthenticated: true };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err?.response?.data.error);
      }
    }
  }
);

export const getUser = createAsyncThunk(
  'user/getInfo',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${base}/api/auth/getuser`);
      return { data: data.user, isAuthenticated: data.success };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err?.response?.data.error);
      }
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${base}/api/auth/logout`);
      return data.message;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err?.response?.data.error);
      }
    }
  }
);
