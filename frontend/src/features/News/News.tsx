import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectFetchNewsLoading, selectNews} from "./NewsSlice.ts";
import {useEffect} from "react";
import {fetchNews} from "./NewsThunk.ts";
import {Box, Button, Container, Typography} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import NewsItem from "./components/NewsItem/NewsItem.tsx";

const News = () => {
    const dispatch = useAppDispatch();
    const news = useAppSelector(selectNews);
    const loading = useAppSelector(selectFetchNewsLoading);

    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    return (
        <Container maxWidth="md">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, mb: 2 }}>
            <Typography variant="h3" sx={{ my: 3 }}>Posts</Typography>
                <Button>Add News</Button>
                </Box>
            {loading ? <Spinner/>
                : (news ?
                    news.map((item) => (
                        <NewsItem key={item.id} title={item.title} image={item.image} date={item.date} />
                    )) :
                    <Typography>No notes yet</Typography>)
            }
        </Container>
    );
};

export default News;