import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
import { notesReducer } from './slices/notesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
