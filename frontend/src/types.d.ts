export interface INews {
    id: string;
    title: string;
    description: string;
    image: string | null;
    date: string;
}

export interface INewsMutation {
    title: string;
    description: string;
    image: File | null;
    date?: string;
}

