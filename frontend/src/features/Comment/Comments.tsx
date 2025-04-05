import { Container, Typography} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import CommentItem from "./components/CommentItem/CommentItem.tsx";
import {useAppSelector} from "../../app/hooks.ts";
import {selectComments, selectFetchCommentsLoading} from "./CommentsSlice.ts";

const Comments = () => {
    const comments = useAppSelector(selectComments);
    const loading = useAppSelector(selectFetchCommentsLoading);

    return (
        <Container >
            <Typography variant="h5" component="div" sx={{mb: 1, mt: 3 }}>
                Comments
            </Typography>
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