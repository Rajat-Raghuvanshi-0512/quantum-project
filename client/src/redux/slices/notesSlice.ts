import { createSlice } from '@reduxjs/toolkit';
import {
  addNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from '../actions/notesAction';

interface notesState {
  loading: boolean;
  error: string | null;
  isAdded: boolean | null;
  isUpdated: boolean | null;
  isDeleted: boolean | null;
  isAuthenticated: boolean | undefined;
  notes: [];
}

// Define the initial state using that type
const initialState: notesState = {
  loading: false,
  error: null,
  isAdded: null,
  isUpdated: null,
  isDeleted: null,
  isAuthenticated: false,
  notes: [],
};

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearUpdatedState: (state) => {
      state.isUpdated = null;
    },
    clearDeletedState: (state) => {
      state.isDeleted = null;
    },
    clearAddedState: (state) => {
      state.isAdded = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addNote.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addNote.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = action?.payload?.success;
    });
    builder.addCase(addNote.rejected, (state, action) => {
      state.loading = false;
      state.error = String(action?.payload);
    });
    builder.addCase(getAllNotes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllNotes.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = action?.payload?.data;
    });
    builder.addCase(getAllNotes.rejected, (state, action) => {
      state.loading = false;
      state.error = String(action?.payload);
    });
    builder.addCase(updateNote.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateNote.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = action?.payload?.success;
    });
    builder.addCase(updateNote.rejected, (state, action) => {
      state.loading = false;
      state.error = String(action?.payload);
    });
    builder.addCase(deleteNote.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      state.loading = false;
      state.isDeleted = action?.payload?.success;
    });
    builder.addCase(deleteNote.rejected, (state, action) => {
      state.loading = false;
      state.error = String(action?.payload);
    });
  },
});

export const {
  clearErrors,
  clearAddedState,
  clearDeletedState,
  clearUpdatedState,
} = noteSlice.actions;
export const notesReducer = noteSlice.reducer;
