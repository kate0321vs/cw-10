import {createAsyncThunk} from "@reduxjs/toolkit";
import {INews, INewsMutation} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchNews = createAsyncThunk<INews[]>(
    'news/fetchAll',
    async () => {
        const newsResponse = await axiosApi<INews[]>('/news');
        const news: INews[] = newsResponse.data;
        return news;
    }
);

export const fetchOneNews = createAsyncThunk<INewsMutation, string>(
    'news/fetchOne',
    async (id: string) => {

        const oneNewsResponse = await axiosApi<INewsMutation | null>(`/news/${id}`);
        const oneNews = oneNewsResponse.data;
        if(!oneNews) {
            throw new Error("Not Found!");
        }
        return oneNews;
    }
);

export const createNews = createAsyncThunk<void, INewsMutation>(
    'news/create',
    async (INewsMutation) => {
        const formData = new FormData();
        const keys = Object.keys(INewsMutation) as (keyof INewsMutation)[];

        keys.forEach((key) => {
            const value = INewsMutation[key];

            if (value !== null) {
                formData.append(key, value);
            }
        })

        try {
            await axiosApi.post('/news', formData);
        } catch (error) {
            console.log(error);
        }
    }
);

export const deleteNews = createAsyncThunk(
    "news/delete",
    async (id: string) => {
        await axiosApi.delete(`/news/${id}`);
    }
)