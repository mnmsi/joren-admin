import React from 'react';

const NotFound = ({text}) => {
    return (
        <div className={`text-danger text-center display-4`}>
            {text}
        </div>
    );
};

export default NotFound;