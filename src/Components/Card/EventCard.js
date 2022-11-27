import React from 'react';
import {Card} from "react-bootstrap";
import defaultImage from "../../Assets/Images/default-image.jpg";
import mapIcon from "../../Assets/Images/mapIcon.png";

const EventCard = ({title,location, handleClick, banner, start_date,end_date}) => {
    return (
        <>
            <Card style={{ width: "100%" }} onClick={handleClick}>
                <Card.Img variant="top" src={banner ? banner : defaultImage} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <div className={`d-flex align-items-center gap-1 mt-3`}>
                        <img style={{height:"25px", width:"25px", objectFit:"contain"}}src={mapIcon} alt="icon"/>
                        <div>{location}</div>
                    </div>
                    <div className={`d-flex mt-3 justify-content-between align-items-center`}>
                        <p><strong>Start Date : </strong> {start_date}</p>
                        <p><strong>End Date : </strong>{end_date}</p>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default EventCard;