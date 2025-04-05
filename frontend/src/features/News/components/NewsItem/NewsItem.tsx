import {Card, CardMedia, Box, Typography, Button} from "@mui/material";
import {baseURL} from "../../../../globalConstants.ts";

interface Props {
    image: string | null;
    title: string;
    date: string;
}

const NewsItem: React.FC<Props> = ({image, title, date }) => {
    let newsImage = null;

    if (image) {
        newsImage = baseURL + '/' + image;
    }

    const onDelete = () => {

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
                    At {date}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    <Button variant="text" size="small" >
                        Read Full Post
                    </Button>
                    <Button variant="text" size="small" color="error" onClick={onDelete}>
                        Delete
                    </Button>
                </Box>
            </Box>
        </Card>
    );
};

export default NewsItem;