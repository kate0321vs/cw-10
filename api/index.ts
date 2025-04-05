import express from "express";
import fileDb from "./fileDb";
import newsRouter from "./routers/news";

const app = express();
const port = 8080;

app.use(express.static("public"));
app.use(express.json());
app.use('/news', newsRouter);


const run = async () => {
    await fileDb.init();

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
};

run().catch((err) => console.error(err));