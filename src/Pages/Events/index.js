import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Spinner} from "react-bootstrap";
import NewsCard from "../../Components/Card/Card";
import NotFound from "../../Components/NotFound/NotFound";
import EventCard from "../../Components/Card/EventCard";
import {useNavigate} from "react-router";
import Pagination from "../../Components/Pagination/Pagination";
const EventIndex = () => {
    const navigate = useNavigate();
    let baseUrl = process.env.REACT_APP_API_URL;
    let [event,setEvent] = useState([])
    let [load,setLoad]  = useState(true);
    let [pagination,setPagination] = useState(0);
    useEffect(()=>{
        axios.get(baseUrl+"/api/users/events/get/lists?&page=0&size=9").then(res=>{
            if(res.data){
                window.scroll({top:0})
                setLoad(false);
                setPagination(res.data?.data?.totalPages)
                setEvent(res.data?.data?.data?.rows)
            }

        })
    },[])
    //single news functionality

    const handleEvents = (id) => {
       let singleData = event?.filter(event => event.id === id);
        navigate('/event/details',{state:singleData})
    }
    let renderEvents = <div className={`d-flex justify-content-center align-items-center`}> <Spinner /></div>
    if(event?.length){
        renderEvents = event?.map((item,index)=>{
           return (
               <div className={`col-lg-4 mb-4`} key={index}>
                   <EventCard banner={item.banner[0]} title={item.title} location={item.location} start_date={item.start_date} end_date={item.end_date} handleClick={()=>handleEvents(item.id)}/>

                   {/*<NewsCard content={item.content.length > 300 ? item.content?.replace(/(<([^>]+)>)/ig, '')?.substring(0,300)  + "..." : item.content?.replace(/(<([^>]+)>)/ig, '')?.substring(0,300) } image={item?.images[0]} date={new Date(item?.createdAt).toDateString()} handleClick={()=>handleNews(item.id)} title={item.title} />*/}
               </div>
           )
        })
    }
    //handle page click
    const PaginationClick = (e) => {
        // setCount(e.selected);
        axios.get(baseUrl+`/api/users/events/get/lists?page=${e.selected}&size=9`).then(res=>{
            if(res.data){
                window.scroll({top:0})
            }
            setEvent(res.data?.data?.data?.rows)
            setPagination(res.data?.data?.totalPages)
        })
    }
    return (
        <div className={`container`}>
            <div className="row">
                {renderEvents ? renderEvents : <NotFound text={`No Data Found`} />}
                {!load && <Pagination pageFirstShow={0}   handlePageClick={(e) => PaginationClick(e)} pageCount={pagination} />}
            </div>
        </div>
    );
};

export default EventIndex;

