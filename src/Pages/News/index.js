import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Spinner} from "react-bootstrap";
import NewsCard from "../../Components/Card/Card";
import NotFound from "../../Components/NotFound/NotFound";
import {useNavigate} from "react-router";
import Pagination from "../../Components/Pagination/Pagination";

const NewsIndex = () => {

    const navigate = useNavigate();
    let baseUrl = process.env.REACT_APP_API_URL;
    let [news,setNews] = useState([])
    let [pagination,setPagination] = useState(0);
    let [load,setLoad]  = useState(true);
    useEffect(()=>{
        window.scroll({top:0})
        axios.get(baseUrl+`/api/users/news/get?page=${0}&size=9`).then(res=>{
            if(res.data){
                setLoad(false);
                setNews(res.data?.data?.data?.rows)
                setPagination(res.data?.data?.totalPages)
            }
        })
    },[])
    //single news functionality

    const handleNews = (id) => {
       let singleData = news?.filter(news => news.id === id);
        navigate('/news/details',{state:singleData})
    }

    //handle page click
    const PaginationClick = (e) => {
        // setCount(e.selected);
        axios.get(baseUrl+`/api/users/news/get?page=${e.selected}&size=9`).then(res=>{
            if(res.data){
                window.scroll({top:0})
            }
            setNews(res.data?.data?.data?.rows)
            setPagination(res.data?.data?.totalPages)
        })
    }
    // console.log(count)
    let renderNews = <div className={`d-flex justify-content-center align-items-center`}> <Spinner /></div>
    if(news.length){
        renderNews = news?.map((item,index)=>{
           return (
               <div className={`col-lg-4 mb-4`} key={index}>
                   <NewsCard content={item.content.length > 300 ? item.content?.replace(/(<([^>]+)>)/ig, '')?.substring(0,300)  + "..." : item.content?.replace(/(<([^>]+)>)/ig, '')?.substring(0,300) } image={item?.images[0]} date={new Date(item?.createdAt).toDateString()} handleClick={()=>handleNews(item.id)} title={item.title} />
               </div>
           )
        })
    }

    return (
        <div className={`container`}>
            <div className="row">
                {renderNews ? renderNews : <NotFound text={`No Data Found`} />}
                {!load && <Pagination pageFirstShow={0}   handlePageClick={(e) => PaginationClick(e)} pageCount={pagination} />}
            </div>
        </div>
    );
};

export default NewsIndex;

