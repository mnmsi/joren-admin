import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Spinner} from "react-bootstrap";
import NewsCard from "../../Components/Card/Card";
import NotFound from "../../Components/NotFound/NotFound";
import EventCard from "../../Components/Card/EventCard";
import {useNavigate} from "react-router";
const EventIndex = () => {
    const navigate = useNavigate();
    let baseUrl = process.env.REACT_APP_API_URL;
    let [event,setEvent] = useState([])
    useEffect(()=>{
        axios.get(baseUrl+"/api/users/events/get/lists?live=true&page=0&size=10").then(res=>{
            // console.log(res.data.data.rows)
            setEvent(res.data.data.rows)
        })
    },[])
    console.log(event)
    //single news functionality

    const handleNews = (id) => {
       let singleData = event?.filter(news => news.id === id);
        navigate('/news/details',{state:singleData})
    }
    let renderNews = <div className={`d-flex justify-content-center align-items-center`}> <Spinner /></div>
    console.log(event,255)
    if(event?.length){
        console.log(event,121)
        renderNews = event?.map((item,index)=>{
           return (
               <div className={`col-lg-4 mb-4`} key={index}>
                   <EventCard banner={item.banner[0]} title={item.title} location={item.location} start_date={item.start_date} end_date={item.end_date}/>

                   {/*<NewsCard content={item.content.length > 300 ? item.content?.replace(/(<([^>]+)>)/ig, '')?.substring(0,300)  + "..." : item.content?.replace(/(<([^>]+)>)/ig, '')?.substring(0,300) } image={item?.images[0]} date={new Date(item?.createdAt).toDateString()} handleClick={()=>handleNews(item.id)} title={item.title} />*/}
               </div>
           )
        })
    }

    return (
        <div className={`container`}>
            <div className="row">
                {renderNews ? renderNews : <NotFound text={`No Data Found`} />}
            </div>
        </div>
    );
};

export default EventIndex;

