import {createAsyncThunk} from "@reduxjs/toolkit";
import {IComment, ICommentMutation} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchComments = createAsyncThunk<IComment[], string>(
    'comments/fetchAll',
    async (id: string) => {
        const commentsResponse = await axiosApi<IComment[]>(`/comments?newsId=${id}`);
        const comments: IComment[] = commentsResponse.data;
        return comments;
    }
);

export const createComments = createAsyncThunk<void, ICommentMutation>(
    'comments/create',
    async (comment: ICommentMutation) => {
        await axiosApi.post('/comments', comment);
    }
);

export const deleteComment = createAsyncThunk(
    'comments/delete',
    async (id: string) => {
        await axiosApi.delete(`/comments/${id}`);
    }
)