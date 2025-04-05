import {Container, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectOneNews} from "./NewsSlice.ts";
import { useParams } from "react-router-dom";
import {fetchOneNews} from "./NewsThunk.ts";
import {fetchComments} from "../Comment/CommentsThunk.ts";
import {useEffect} from "react";
import dayjs from "dayjs";
import Comments from "../Comment/Comments.tsx";
import FormComments from "../Comment/components/FormComments/FormComments.tsx";

const FullNews = () => {
    const dispatch = useAppDispatch();
    const oneFullNews = useAppSelector(selectOneNews);
    const { id_news } = useParams() as { id_news: string };

    useEffect(() => {
            dispatch(fetchOneNews(id_news));
            dispatch(fetchComments(id_news));
    }, [dispatch, id_news]);

    return (
        <>
            {oneFullNews ? (
            <Container>
                <Typography variant="h4" component="div" sx={{ fontWeight: "bold", mb: 1, }}>
                    {oneFullNews?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  At {dayjs(oneFullNews?.date).format("DD.MM.YYYY HH:mm")}
                </Typography>
                <Typography component="p">
                    {oneFullNews?.description}
                </Typography>
                <Comments/>
                <FormComments id_news={id_news}/>
            </Container>
            ) : <p>Not Found</p> }
        </>

    );
};

export default FullNews;