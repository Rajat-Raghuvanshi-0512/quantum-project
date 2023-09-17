import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const base = import.meta.env.VITE_APP_BACKEND_URL;

export const addNote = createAsyncThunk(
  'note/add',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${base}/api/notes/add`, userData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return { data: data.data, message: data.message, success: data.success };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err?.response?.data.error);
      }
    }
  }
);

export const getAllNotes = createAsyncThunk(
  'note/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${base}/api/notes/fetch`);
      return { data: data.data, message: data.message, success: data.success };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err?.response?.data.error);
      }
    }
  }
);

export const updateNote = createAsyncThunk(
  'note/update',
  async ({ id, note }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${base}/api/notes/update/${id}`, note);
      return { data: data.user, message: data.message, success: data.success };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err?.response?.data.error);
      }
    }
  }
);

export const deleteNote = createAsyncThunk(
  'note/delete',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${base}/api/notes/delete/${id}`);
      return { message: data.message, success: data.success };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err?.response?.data.error);
      }
    }
  }
);
