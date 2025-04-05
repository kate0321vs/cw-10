import { configureStore } from '@reduxjs/toolkit';
import {newsReducer} from "../features/News/NewsSlice.ts";
import {commentsReducer} from "../features/Comment/CommentsSlice.ts";

export const store = configureStore({
  reducer: {
     news: newsReducer,
      comments: commentsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;