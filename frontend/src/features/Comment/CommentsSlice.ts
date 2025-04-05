import {IComment} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {createComments, deleteComment, fetchComments} from "./CommentsThunk.ts";

interface CommentsState {
    comments: IComment[],
    fetchLoading: boolean,
    createLoading: boolean,
    deleteLoading: boolean | string,
}

const initialState: CommentsState = {
    comments: [],
    fetchLoading: false,
    createLoading: false,
    deleteLoading: false,
};

export const CommentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchComments.pending, (state) => {
         state.fetchLoading = true;
        });
        builder.addCase(fetchComments.fulfilled, (state, {payload: comments}) => {
            state.fetchLoading = false;
            state.comments = comments
        });
        builder.addCase(fetchComments.rejected, (state) => {
            state.fetchLoading = false;
        });

        builder.addCase(createComments.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createComments.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createComments.rejected, (state) => {
            state.createLoading = false;
        });

        builder.addCase(deleteComment.pending, (state, action) => {
            state.deleteLoading = action.meta.arg;
        });
        builder.addCase(deleteComment.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteComment.rejected, (state) => {
            state.deleteLoading = false;
        });
    }
});

export const selectComments = (state: RootState) => state.comments.comments;
export const selectFetchCommentsLoading = (state: RootState) => state.comments.fetchLoading;
export const selectCreateCommentLoading = (state: RootState) => state.comments.createLoading;
export const selectDeleteCommentsLoading = (state: RootState) => state.comments.deleteLoading;

export const commentsReducer = CommentsSlice.reducer;