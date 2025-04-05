import {INews, INewsMutation} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createNews, deleteNews, fetchNews, fetchOneNews} from "./NewsThunk.ts";
import {RootState} from "../../app/store.ts";

interface NewsState {
    news: INews[],
    oneNews: INewsMutation | null,
    fetchLoading: boolean,
    fetchOneLoading: boolean,
    createLoading: boolean,
    deleteLoading: boolean | string,
}

const initialState: NewsState = {
    news: [],
    oneNews: null,
    fetchLoading: false,
    fetchOneLoading: true,
    createLoading: false,
    deleteLoading: false,
};

export const NewsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNews.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchNews.fulfilled, (state, {payload: news}) => {
            state.fetchLoading = false;
            state.news = news
        });
        builder.addCase(fetchNews.rejected, (state) => {
            state.fetchLoading = false;
        });

        builder.addCase(fetchOneNews.pending, (state) => {
            state.fetchOneLoading = true;
        });
        builder.addCase(fetchOneNews.fulfilled, (state, {payload: oneNews}) => {
            state.fetchOneLoading = false;
            state.oneNews = oneNews;
        });
        builder.addCase(fetchOneNews.rejected, (state) => {
            state.fetchOneLoading = false;
        });

        builder.addCase(createNews.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createNews.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(createNews.rejected, (state) => {
            state.createLoading = false;
        });

        builder.addCase(deleteNews.pending, (state, action) => {
            state.deleteLoading = action.meta.arg;
        });
        builder.addCase(deleteNews.fulfilled, (state) => {
            state.deleteLoading = false;
        });
        builder.addCase(deleteNews.rejected, (state) => {
            state.deleteLoading = false;
        });
    }
})

export const selectNews = (state: RootState) => state.news.news;
export const selectOneNews = (state: RootState) => state.news.oneNews;
export const selectFetchNewsLoading = (state: RootState) => state.news.fetchLoading;
export const selectFetchOneNewsLoading = (state: RootState) => state.news.fetchOneLoading;
export const selectCreateNewsLoading = (state: RootState) => state.news.createLoading;
export const selectDeleteNewsLoading = (state: RootState) => state.news.deleteLoading;

export const newsReducer = NewsSlice.reducer;