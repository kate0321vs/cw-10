import express from "express";
import fileDb from "../fileDb";
import {imagesUpload} from "../multer";
import {TNewsWithoutId} from "../type";

const newsRouter = express.Router();

newsRouter.get("/", async (req, res) => {
    const news = await fileDb.getNews();

    if (news) {
        const newsList = news.map(item => {
            return {
                id: item.id,
                title: item.title,
                image: item.image,
                date: item.date,
            }
        })
        res.send(newsList)
    } else {
        res.sendStatus(404);
    }
});

newsRouter.get('/:id', async (req, res) => {
    const news = await fileDb.getNews();
    const oneNews = news.find(item => item.id === req.params.id);

    if (!oneNews) {
        res.sendStatus(404);
        return;
    }

    res.send(oneNews);
});

newsRouter.post('/', imagesUpload.single('image'), async (req, res) => {

    if (req.body.title.trim().length === 0 || req.body.description.trim().length === 0) {
        res.status(400).send({'error': 'Fields title, description required'});
        return;
    }

    const oneNews: TNewsWithoutId = {
        title: req.body.title,
        description: req.body.description,
        image: req.file ? 'images/' + req.file.filename : null,
    };
    const savedNews = await fileDb.addNews(oneNews)

    res.send(savedNews);
});

newsRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const response = await fileDb.deleteNews(id);
    if (response) {
        res.send({message: `Location was successfully deleted.`});
    } else {
        res.status(404).send({message: `Location cannot be deleted`});
    }
})

export default newsRouter;