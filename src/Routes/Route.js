import React from 'react';
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
const Route = ({auth}) => {
    console.log(auth)
    let route = null;
    if(auth)
    {
        route = <PrivateRoute />
    }else{
        route = <PublicRoute />
    }
    return (
        <>
            {route}
        </>
    );
};

export default Route;