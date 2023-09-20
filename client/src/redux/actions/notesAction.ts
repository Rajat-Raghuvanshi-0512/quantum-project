import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Note, TodoErrorResponse } from '../../misc/types';

const base = import.meta.env.VITE_APP_BACKEND_URL;

export const addNote = createAsyncThunk(
  'note/add',
  async (userData: Note, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${base}/api/notes/add`, userData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return { data: data.data, message: data.message, success: data.success };
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(
        (error?.response?.data as TodoErrorResponse).error
      );
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
      const error = err as AxiosError;
      return rejectWithValue(
        (error?.response?.data as TodoErrorResponse).error
      );
    }
  }
);

export const updateNote = createAsyncThunk(
  'note/update',
  async ({ id, note }: { id: string; note: Note }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${base}/api/notes/update/${id}`, note);
      return { data: data.user, message: data.message, success: data.success };
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(
        (error?.response?.data as TodoErrorResponse).error
      );
    }
  }
);

export const deleteNote = createAsyncThunk(
  'note/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${base}/api/notes/delete/${id}`);
      return { message: data.message, success: data.success };
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(
        (error?.response?.data as TodoErrorResponse).error
      );
    }
  }
);
