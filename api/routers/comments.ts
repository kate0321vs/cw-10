import express from "express";
import fileDb from "../fileDb";
import {TCommentWithoutId} from "../type";

const commentsRouter = express.Router();

commentsRouter.get("/", async (req, res) => {
    const {id_news} = req.query;

    const comments = await fileDb.getComments();
    let commentsOfNews = comments;

    if (id_news) {
        commentsOfNews = comments.filter(comment => comment.id_news === id_news.toString())
    }

    const commentsList = commentsOfNews.map(item => {
        return {
            id: item.id,
            author: item.author,
            message: item.message,
            id_news: item.id_news,
        }
    })
    res.send(commentsList)
});


commentsRouter.post('/', async (req, res) => {

    if (req.body.message.trim() === '' || !req.body.id_news) {
        res.status(400).send({'error': 'Author, description, id_news required'});
        return;
    }

    const newsList = await fileDb.getNews();
    const newsExists = newsList.find(news => news.id === req.body.id_news);

    if (!newsExists) {
        res.status(400).send({ error: 'News with this ID does not exist' });
        return;
    }

    const comment: TCommentWithoutId = {
        id_news: req.body.id_news,
        message: req.body.message,
        author: req.body.author ? req.body.author : 'Anonymous',
    };
    const savedComment = await fileDb.addComment(comment)

    res.send(savedComment);
});

commentsRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const response = await fileDb.deleteComment(id);
    if (response) {
        res.send({message: `Comment was successfully deleted.`});
    } else {
        res.status(404).send({message: `Comment cannot be deleted`});
    }
})

export default commentsRouter;