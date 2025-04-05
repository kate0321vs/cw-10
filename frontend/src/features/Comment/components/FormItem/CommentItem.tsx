import {Card, CardContent, Typography, Link, CircularProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {selectDeleteCommentsLoading} from "../../CommentsSlice.ts";
import {toast} from "react-toastify";
import {deleteComment, fetchComments} from "../../CommentsThunk.ts";

interface Props {
    author: string;
    message: string;
    id: string;
    id_news: string;
}

const FormItem: React.FC<Props> = ({author, message, id, id_news}) => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectDeleteCommentsLoading);

    const onDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this comment?")){
            await dispatch(deleteComment(id));
            toast.success('News was comment Successfully!');
            await dispatch(fetchComments(id_news));
        }
    }

    return (
        <Card variant="outlined" sx={{ maxWidth: 600, margin: "1rem auto" }}>
            <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body1">
                    <strong>{author}</strong>: {message}
                </Typography>
                <Link onClick={() => onDelete(id)} href="#" underline="hover" sx={{ marginLeft: 2 }}>
                    {loading === id ? <CircularProgress /> : 'Delete'}
                </Link>
            </CardContent>
        </Card>
    );
};

export default FormItem;