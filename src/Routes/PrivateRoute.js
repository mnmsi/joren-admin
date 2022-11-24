import React from 'react';
import {Route, Routes} from "react-router-dom"
import NewsIndex from "../Pages/News";
import NewsEdit from "../Pages/News/edit";
import NewsDetails from "../Pages/News/details";
import NewsCreate from "../Pages/News/create";
import EventIndex from "../Pages/Events";
import EventCreate from "../Pages/Events/create";
import EventDetails from "../Pages/Events/details";
import EditEvent from "../Pages/Events/edit";
const PrivateRoute = () => {
    return (
        <Routes>
            {/*News*/}
            <Route path="/news" element={<NewsIndex/>}/>
            <Route path="/news/create" element={<NewsCreate/>}/>
            <Route path="/news/details" element={<NewsDetails/>}/>
            <Route path="/news/edit/" element={<NewsEdit/>}/>

            {/*Event*/}
            <Route path="/events" element={<EventIndex/>}/>
            <Route path="/event/create" element={<EventCreate/>}/>
            <Route path="/event/details" element={<EventDetails/>}/>
            <Route path="/event/edit/" element={<EditEvent/>}/>

        </Routes>
    );
};

export default PrivateRoute;