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
      return { data: data.user, isAuthenticated: true };
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
      return { data: data.user, isAuthenticated: true };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err?.response?.data.error);
      }
    }
  }
);

export const updateNote = createAsyncThunk(
  'note/update',
  async (notesData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${base}/api/notes/update/${notesData._id}`,
        notesData
      );
      return { data: data.user, isAuthenticated: data.success };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err?.response?.data.error);
      }
    }
  }
);

export const deleteNote = createAsyncThunk(
  'note/delete',
  async (notesData, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${base}/api/${notesData._id}`);
      return data.message;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err?.response?.data.error);
      }
    }
  }
);
