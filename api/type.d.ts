export interface INews {
    id: string;
    title: string;
    description: string;
    image: string | null;
    date?: string;
}

export type TNewsWithoutId = Omit<INews, 'id'>

export interface IComment {
    id: string;
    id_news: string;
    author: string;
    message: string;
}

export type TCommentWithoutId = Omit<IComment, 'id'>;