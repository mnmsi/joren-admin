import React from 'react';
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

const Layout = ({children}) => {
    return (
        <>
            <Header />
                <main className={`mt-5`}>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;