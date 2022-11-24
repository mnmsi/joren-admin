import React from 'react';
import Card from 'react-bootstrap/Card';
import defaultImage from "../../Assets/Images/default-image.jpg"
const NewsCard = ({image,title,date,id,content,handleClick}) => {
    return (
        <Card style={{ width: '100%' }} id={id} onClick={handleClick}>
            <Card.Img variant="top" src={image ? image : defaultImage} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    <div className={`card-text-content`}>
                        {content}
                    </div>
                </Card.Text>
                <div className={`date`}>{date}</div>
            </Card.Body>
        </Card>
    );
};

export default NewsCard;