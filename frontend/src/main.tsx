import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {CssBaseline} from "@mui/material";
import {store} from "./app/store.ts";
import {ToastContainer} from "react-toastify";


createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <ToastContainer autoClose={1000}/>
            <CssBaseline/>
            <App />
        </BrowserRouter>
    </Provider>
)
