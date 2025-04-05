import Layout from "./components/Layout/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import News from "./features/News/News.tsx";
import AddNews from "./features/News/AddNews.tsx";
import FullNews from "./features/News/FullNews.tsx";

const App = () => {
    return (
        <>
            <Layout/>
            <Routes>
                <Route path="/" element={(<News />)}/>
                <Route path="/news" element={(<News />)}/>
                <Route path="/add-news" element={(<AddNews/>)}/>
                <Route path='/news/:id' element={<FullNews/>}/>
                <Route path="*" element={(<h1>Not page found</h1>)}/>
            </Routes>
       </>
    );
};

export default App;