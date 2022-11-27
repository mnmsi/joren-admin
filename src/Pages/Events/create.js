import React, {useEffect, useState} from 'react';
import axios from "axios";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useForm, Controller } from "react-hook-form";
import Select from "../../Components/UI/Select";
import {useNavigate} from "react-router";
const EventCreate = () => {
    const navigate = useNavigate()
    const { handleSubmit, reset, setValue,setError ,control,formState:{errors},register } = useForm({ mode:"all" });
    //handle phone input
    //multiple image
    const [multipleImages, setMultipleImages] = useState([]);
    const changeMultipleFiles = (e) => {
        if (e.target.files) {
            const imageArray = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            );
            if(multipleImages.length < 5){
                setMultipleImages([]);
                setMultipleImages((prevImages) => prevImages.concat(imageArray));
            }else{
                setMultipleImages([]);
            }
        }
        if(e.target.files.length > 4){
            setError('images', { type: 'custom', message: 'maximum four images!' });
        }
    };
    const renderImages = (data) => {
        return data.map((image) => {
            return <img style={{objectFit:"cover",height:"100px", width:"100px",border:"1px solid",marginRight:"10px"}} className="image my" src={image} alt="" key={image} />;
        });
    };

     const onsubmit = (data) => {

         let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdlb3NjaWVuY2Uub3JnIiwicm9sZV9pZCI6MSwibmFtZSI6IkFkbWluIiwiaWF0IjoxNjY5MjYyMjQzfQ.3yHmwnI0yJZtC9fEKLhpPxYDqArOF1GGw_Ig0gL8ex4"
         const config = {
             headers: { Authorization: `Bearer ${token}` }
         };

         const formData = new FormData();
         let formatted_data = data.target_audience.replace(/(?:\r\n|\r|\n)/g, '/n');;
         for (const key of Object.keys(multipleImages)) {
             formData.append('banner', data.images[key]);
         }
         formData.append("target_audience",formatted_data)
         formData.append("notes",data?.notes)
         formData.append("phone",data?.phone)
         formData.append("email",data?.email)
         formData.append("title",data.title)
         formData.append("location",data.location)
         formData.append("start_date",data.start_date)
         formData.append("end_date",data.start_date)
         // axios.post(process.env.REACT_APP_API_URL+"/api/admin/event/add",formData,config).then((res)=>{
         //     if(res.data.status === 200){
         //         navigate("/events")
         //     }
         // });
         console.log(data);
     }
    return (
        <div className={`container mb-5`}>
            <div className={`row justify-content-center`}>
                <div className={`col-lg-6 col-12`}>
                    <div className={`card`}>
                        <div className={`card-title p-4 text-center`} style={{fontSize:"35px"}}>Create Event</div>
                        <div className={`card-body`}>
                            <form action="" onSubmit={handleSubmit(onsubmit)}>
                                <div className="form-group mb-3">
                                    <label htmlFor="title" className={`mb-2`}>Title</label>
                                    <Controller
                                        name="title"
                                        control={control}
                                        rules={{ required: "This field is required" }}
                                        render={({ field: {value,onChange} }) => (
                                            <input value={value ?? ""} onChange={onChange} type="text" className={`form-control`}/>
                                        )}
                                    />
                                    <small className={`text-danger mt-2`}>{errors?.title?.message}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="content" className={`mb-2`}>Who Should Attend</label>
                                    <Controller
                                        name="target_audience"
                                        control={control}
                                        rules={{ required: "This field is required" }}
                                        render={({ field: {value,onChange} }) => (
                                            <textarea value={value} onChange={onChange} className={`form-control`} name="" id="" cols="30" rows="10"></textarea>
                                        )}
                                    />
                                    <small className={`text-danger mt-2`}>{errors?.target_audience?.message}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="content" className={`mb-2`}>Note The Followings</label>
                                    <Controller
                                        name="notes"
                                        control={control}
                                        rules={{ required: "This field is required" }}
                                        render={({ field: {value,onChange} }) => (
                                            <textarea value={value} onChange={onChange} className={`form-control`} name="" id="" cols="30" rows="10"></textarea>
                                        )}
                                    />
                                    <small className={`text-danger mt-2`}>{errors?.notes?.message}</small>
                                </div>
                                {/*phone*/}
                                <div className="form-group mb-3">
                                    <label htmlFor="phone" className={`mb-2`}>Phone</label>
                                    <Controller
                                        name="phone"
                                        control={control}
                                        rules={{ required: "This field is required" }}
                                        render={({ field: {value,onChange} }) => (
                                            <input id={`phone`} value={value ?? ""} onChange={(e)=>{
                                                onChange(e);
                                                // handlePhone(e);
                                            }} type="number" className={`form-control`}/>
                                        )}
                                    />
                                    <small className={`text-danger mt-2`}>{errors?.phone?.message}</small>
                                </div>
                                {/*email*/}
                                <div className="form-group mb-3">
                                    <label htmlFor="email" className={`mb-2`}>Email</label>
                                    <Controller
                                        name="email"
                                        control={control}
                                        rules={{ required: "This field is required" }}
                                        render={({ field: {value,onChange} }) => (
                                            <input id={`email`} value={value ?? ""} onChange={(e)=>{
                                                onChange(e);
                                                // handlePhone(e);
                                            }} type="email" className={`form-control`}/>
                                        )}
                                    />
                                    <small className={`text-danger mt-2`}>{errors?.email?.message}</small>
                                </div>
                                {/*location*/}
                                <div className="form-group mb-3">
                                    <label htmlFor="location" className={`mb-2`}>Location</label>
                                    <Controller
                                        name="location"
                                        control={control}
                                        rules={{ required: "This field is required" }}
                                        render={({ field: {value,onChange} }) => (
                                            <input id={`location`} value={value ?? ""} onChange={(e)=>{
                                                onChange(e);
                                                // handlePhone(e);
                                            }} type="text" className={`form-control`}/>
                                        )}
                                    />
                                    <small className={`text-danger mt-2`}>{errors?.location?.message}</small>
                                </div>
                                {/*Start Date*/}
                                <div className="row">
                                    <div className="col-lg-6 col-md-12">
                                        <div className="form-group mb-3">
                                            <label htmlFor="start_date" className={`mb-2`}>Start Date</label>
                                            <Controller
                                                name="start_date"
                                                control={control}
                                                rules={{ required: "This field is required" }}
                                                render={({ field: {value,onChange} }) => (
                                                    <input min={new Date().toISOString().split('T')[0]} id={`start_date`} value={value ?? ""} onChange={(e)=>{
                                                        onChange(e);
                                                        // handlePhone(e);
                                                    }} type="date" className={`form-control`}/>
                                                )}
                                            />
                                            <small className={`text-danger mt-2`}>{errors?.start_date?.message}</small>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12">
                                        <div className="form-group mb-3">
                                            <label htmlFor="end_date" className={`mb-2`}>End Date</label>
                                            <Controller
                                                name="end_date"
                                                control={control}
                                                rules={{ required: "This field is required" }}
                                                render={({ field: {value,onChange} }) => (
                                                    <input min={new Date().toISOString().split('T')[0]} id={`end_date`} value={value ?? ""} onChange={(e)=>{
                                                        onChange(e);
                                                        // handlePhone(e);
                                                    }} type="date" className={`form-control`}/>
                                                )}
                                            />
                                            <small className={`text-danger mt-2`}>{errors?.end_date?.message}</small>
                                        </div>
                                    </div>
                                </div>
                                <div className={`mb-3`}>
                                    <input
                                        type="file"
                                        name="images"
                                        multiple
                                        {...register('images', { required: true })}
                                        onChange={changeMultipleFiles}
                                    />
                                    <small className={`d-block text-danger mt-2`}>{errors?.images?.message}</small>
                                    <div>
                                        {renderImages(multipleImages)}
                                    </div>
                                </div>
                                <button type={`submit`} className={`btn btn-primary`}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCreate;