import {Container, Typography} from "@mui/material";
import NewsForm from "./components/NewsForm/NewsForm.tsx";


const AddNews = () => {
    return (
        <Container maxWidth="md">
            <Typography variant="h4" sx={{ my: 3 }} textAlign='center'>Add news</Typography>
            <NewsForm />
        </Container>
    );
};

export default AddNews;