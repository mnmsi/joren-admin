import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router";
import axios from "axios";
import {Spinner} from "react-bootstrap";

const EventParticipants = () => {
    const {state} = useLocation();
    let id = state;
    let isAuth = localStorage.getItem("joren_token") ?? null;
    let [participants, setParticipants] = useState([]);
    let [loading,setLoading] = useState(true)
    const config = {
        headers: {Authorization: `Bearer ${isAuth}`}
    };
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/admin/event/check?event_id=${id}`, config).then((res) => {
            if(res.data.status === 200){
                setLoading(false)
                setParticipants(res.data?.data?.registrants);
            }
        });
    }, [state]);
    let renderTable = null;
    if (participants.length) {
        renderTable = (
            <table className={`table table-bordered table-striped`}>
                <thead>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Email
                    </th>
                    <th>
                        Phone
                    </th>
                    <th>
                        City
                    </th>
                    <th>
                        Province
                    </th>
                    <th>
                        Country
                    </th>
                    <th>
                        Postal Code
                    </th>
                    <th>
                        Additional Info
                    </th>
                    <th>
                        Profession
                    </th>
                    <th>
                        Attendance
                    </th>
                    <th>
                        Date
                    </th>
                </tr>
                </thead>
                <tbody>
                {participants.map((item,index)=>{
                    return (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.address}</td>
                            <td>{item.city}</td>
                            <td>{item.province}</td>
                            <td>{item.postalCode}</td>
                            <td>{item.additional_info}</td>
                            <td>{item.profession}</td>
                            <td>{JSON.parse(item.attendance).map((item,index)=>{
                                return (
                                    <div key={index}>{item}</div>
                                )
                            })}</td>
                            <td>{new Date(item.createdAt).toDateString()}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        )
    }else{
        renderTable = <h2 className={`display-4 text-center text-danger`}>No Data Found !</h2>
    }
    return (
        <div className={`container`}>
            {loading ? <div className={`d-flex justify-content-center align-items-center`}> <Spinner /></div> : renderTable}
        </div>
    );
};

export default EventParticipants;