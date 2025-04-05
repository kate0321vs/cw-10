import {promises as fs} from 'fs';
import {randomUUID} from "node:crypto";
import {INews, IComment, TNewsWithoutId, TCommentWithoutId} from "./type";
import {existsSync} from "node:fs";

const pathName = './db.json';
let data: { news: INews[], comments: IComment[] } = {
    news: [],
    comments: [],
    };

const fileDb = {
    async init() {
        try {
            if(!existsSync(pathName)) {
                await fs.writeFile(pathName, JSON.stringify(data));
            } else {
            const fileContents = await fs.readFile(pathName);
            data = JSON.parse(fileContents.toString());
            }
        } catch (e) {
            console.error(e);
            data = { news: [], comments: [], };
        }
    },
    async getNews() {
        if (data.news) {
            return data.news;
        } return []
    },

    async addNews(item: TNewsWithoutId) {
        const news = {
            ...item,
            id: randomUUID(),
            date: new Date().toISOString(),
        }
        data.news.push(news);
        await this.save();
        return news;
    },

    async deleteNews(id: string) {
        const deletedNews = data.news.find(item => item.id === id);

        if (!deletedNews) {
            return false;
        }

        data.news = data.news.filter(item => item.id !== id);
        await this.save();
        return true;
    },

    async getComments() {
        if (data.comments) {
            return data.comments;
        } return []
    },

    async addComment(item: TCommentWithoutId) {
        const comment = {
            ...item,
            id: randomUUID(),
        }
        data.comments.push(comment);
        await this.save();
        return comment;
    },

    async deleteComment(id: string) {
        const deletedComment = data.comments.find(item => item.id === id);

        if (!deletedComment) {
            return false;
        }

        data.comments = data.comments.filter(item => item.id !== id);
        await this.save();
        return true;
    },

    async save() {
        await fs.writeFile(pathName, JSON.stringify(data));
    },
}

export default fileDb
