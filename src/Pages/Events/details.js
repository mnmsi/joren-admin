import React from 'react';
import {useLocation} from "react-router";
import Carousel from 'react-bootstrap/Carousel';
import defaultImage from "../../Assets/Images/default-image.jpg"
import {useNavigate} from "react-router";
import axios from "axios";
import { toast } from 'react-toastify';
const EventDetails = () => {
    const notify = () => toast.success("Success!");
    const {state} = useLocation()
    const navigate = useNavigate()
    let data = state[0];
    let renderImage = null;
    if (data.banner) {
        renderImage = data?.banner?.map((item, index) => {
            return (
                <Carousel.Item key={index}>
                    <img
                        height={400}
                        style={{objectFit: "cover"}}
                        className="d-block w-100"
                        src={item}
                        alt="image"
                    />
                </Carousel.Item>
            )
        })
    }
    let renderImageBlock = null;
    if (data?.banner?.length > 1) {
        renderImageBlock = <>
            <Carousel>
                {renderImage}
            </Carousel>
        </>
    } else if (data?.banner?.length === 1) {
        renderImageBlock = <img
            height={400}
            style={{objectFit: "cover"}}
            className="d-block w-100"
            src={data?.banner[0]}
            alt="image"
        />
    } else {
        renderImageBlock = <img
            height={400}
            style={{objectFit: "cover"}}
            className="d-block w-100"
            src={defaultImage} alt="image"/>
    }

    //handle delete

    const handleDelete = () => {
        let token = localStorage.getItem("joren_token") ?? null;
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };

        const bodyParameters = {
            id: data?.id
        };
        axios.post(process.env.REACT_APP_API_URL + "/api/admin/event/remove", bodyParameters, config).then((res) => {
            if (res.data.status === 200) {
                navigate("/news")
                notify();
            }
        });
    }

    //handleEdit

    const handleEdit = () => {
        navigate("/event/edit/", {
            state: data,
        })
    }

    //Handle Participants

    const HandleParticipant = () => {
        navigate("/event/participants",{state:data.id})
    }

    return (
        <div className={`container pb-5`}>
            <div className="row justify-content-center">
                <div className="col-lg-10 col-md-12">
                    {/*category and create delete options*/}
                    <div className={` mb-4 d-flex justify-content-between align-items-center`}>
                        <div className={`d-flex gap-2`}>
                            <div className={`btn btn-success`} style={{cursor: "auto"}}>  {data.start_date}</div>
                            <div className={`btn btn-danger`} style={{cursor: "auto"}}> {data?.end_date}</div>
                            <div className={`btn btn-primary`} style={{cursor: "pointer"}} onClick={HandleParticipant}>View Participants</div>
                        </div>
                        <div className={`d-flex gap-2`}>
                            <button onClick={handleEdit} type="button" className="btn btn-outline-primary details_btn"
                                    id="edit-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-pen" viewBox="0 0 16 16">
                                    <path
                                        d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"></path>
                                </svg>
                                Edit
                            </button>
                            <button onClick={handleDelete} type="button" className="btn btn-outline-danger details_btn"
                                    id="delete-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-trash" viewBox="0 0 16 16">
                                    <path
                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                                    <path fillRule="evenodd"
                                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                                </svg>
                                Delete
                            </button>
                        </div>
                    </div>
                    {renderImageBlock}
                    {/*    date and title */}
                    <div className={` my-4 d-flex justify-content-between align-items-center`}>
                        <h2 className={`fw-bold details_title text-center`}>Who Should Attend</h2>
                    </div>
                    <ul className={``}>
                        {data.target_audience?.map((item, index) => {
                            return (
                                <li className={`mb-2`} key={index}>{item}</li>
                            )
                        })}
                    </ul>
                    <div className={` my-4 mt-5 d-flex justify-content-between align-items-center`}>
                        <h2 className={`fw-bold details_title text-center`}>Who Should Attend</h2>
                    </div>
                    <ul className={``}>
                        {data.notes?.map((item, index) => {
                            return (
                                <li className={`mb-2`} key={index}>{item}</li>
                            )
                        })}
                    </ul>
                    {/* news content */}
                    {/*<div dangerouslySetInnerHTML={{__html: data?.content}}/>*/}
                    <div className={`contact-details`}>
                        <h2>Contact Details</h2>
                        <ul className="list-group">
                            <li className="list-group-item">Email : {data.email}</li>
                            <li className="list-group-item">Phone : {data.phone}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;