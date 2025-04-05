import React, { useState } from "react";
import { ICommentMutation } from "../../../../types";
import { useAppDispatch } from "../../../../app/hooks";
import {Button, Container, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import {createComments, fetchComments} from "../../CommentsThunk.ts";


interface Props{
    id_news: string
}

const FromAddComment: React.FC <Props> = ({id_news}) => {
    const initialState: ICommentMutation ={
        author: '',
        message: '',
        id_news: id_news
    }
    const [state, setState] = useState<ICommentMutation>({...initialState});
    const dispatch = useAppDispatch();

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setState((prev) => ({...prev, [name]: value}));
    }

    const onSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(createComments(state))
        await dispatch(fetchComments(id_news))
        setState({ ...initialState });
    };

    return (
        <Container>
            <Typography variant="h4" sx ={{ marginBottom: 2,}} component="h1">
                Add comment
            </Typography>
            <form onSubmit={onSubmitForm}>
                <Grid container direction="column" spacing={2}>
                    <Grid>
                        <TextField
                            sx = {{width: "50%"}}
                            id="author"
                            name="author"
                            label="Author"
                            value={state.author}
                            onChange={onInputChange}
                            placeholder="Enter your name (optional)"
                            fullWidth
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            sx = {{width: "50%"}}
                            multiline
                            id="message"
                            name="message"
                            label="Message"
                            value={state.message}
                            onChange={onInputChange}
                            placeholder="Enter your description "
                            fullWidth
                        />
                    </Grid>
                    <Grid>
                        <Button type="submit" variant="contained" color="primary">
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default FromAddComment;