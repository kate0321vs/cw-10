import { Container, Typography} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import CommentItem from "./components/FormItem/CommentItem.tsx";
import {useAppSelector} from "../../app/hooks.ts";
import {selectComments, selectFetchCommentsLoading} from "./CommentsSlice.ts";

const Comments = () => {
    const comments = useAppSelector(selectComments);
    const loading = useAppSelector(selectFetchCommentsLoading);

    return (
        <Container maxWidth="md">
                <Typography variant="h3" sx={{ my: 3 }}>Posts</Typography>
            {loading ? <Spinner/>
                : (comments ?
                    comments.map((item) => (
                        <CommentItem key={item.id} author={item.author} message={item.message} id_news={item.id_news} id={item.id} />
                    )) :
                    <Typography>No notes yet</Typography>)
            }
        </Container>
    );
};

export default Comments;