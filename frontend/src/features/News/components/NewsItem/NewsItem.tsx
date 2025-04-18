import {Card, CardMedia, Box, Typography, Button, CircularProgress} from "@mui/material";
import {baseURL} from "../../../../globalConstants.ts";
import {NavLink} from "react-router-dom";
import {selectDeleteNewsLoading} from "../../NewsSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {deleteNews, fetchNews} from "../../NewsThunk.ts";
import dayjs from "dayjs";
import {toast} from "react-toastify";

interface Props {
    image: string | null;
    title: string;
    date: string;
    id: string;
}

const NewsItem: React.FC<Props> = ({image, title, date, id }) => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectDeleteNewsLoading);

    const onDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this news?")){
            await dispatch(deleteNews(id));
            toast.success('News was deleted Successfully!');
            await dispatch(fetchNews());
        }
    };

    let newsImage = null;

    if (image) {
        newsImage = baseURL + '/' + image;
    }

    return (
        <Card sx={{ display: 'flex', alignItems: 'center', p: 2, mb: 3 }}>
            {newsImage && (
                <CardMedia
                    sx={{ width: 100, height: 100, mr: 2, border: '1px solid #ccc', borderRadius: '5px' }}
                    image={newsImage}
                />
            )}
            <Box sx={{ flex: 1 }}>
                <Typography sx={{mb: '15px'}} variant="h5" fontWeight={500}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    At {dayjs(date).format('DD.MM.YYYY HH:mm')}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    <Button variant="text" size="small" component={NavLink} to={`news/${id}`}>
                        Read Full Post
                    </Button>
                    <Button variant="text" size="small" color="error" onClick={() => onDelete(id)}>
                        {loading === id ? <CircularProgress /> : 'Delete'}
                    </Button>
                </Box>
            </Box>
        </Card>
    );
};

export default NewsItem;