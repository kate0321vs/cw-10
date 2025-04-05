import * as React from "react";
import AppToolbar from "../UI/AppToolbar/AppToolbar.tsx";


const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
    return (
        <>
            <header className="mb-5">
                <AppToolbar />
            </header>
            <main className="container">
                {children}
            </main>
        </>
    );
};

export default Layout;