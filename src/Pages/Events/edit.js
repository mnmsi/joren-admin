import React, {useEffect, useState} from 'react';
import axios from "axios";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {useForm, Controller} from "react-hook-form";
import Select from "../../Components/UI/Select";
import {useNavigate} from "react-router";
import {useLocation} from "react-router";
import moment from "moment";
const EditEvent = () => {
    const navigate = useNavigate()
    const {state} = useLocation()
    const {handleSubmit, reset, setValue, setError, control, formState: {errors}, register} = useForm({mode: "all"});
    //category
    const [oldImages, setOldImages] = useState(state.banner);

    //set default value
    let start_date = moment(new Date(state.start_date)).format('YYYY-MM-DD')
    let end_date = moment(new Date(state.end_date)).format('YYYY-MM-DD')
    let check_end_date = moment(end_date)
    let check_start_date = moment(start_date)
    let now = moment();
    if(now > check_end_date){
        console.log("yes")
    }else{
        console.log("no")
    }
    useEffect(() => {
        setValue('title', state.title, {shouldValidate: true})
        setValue('target_audience', state.target_audience, {shouldValidate: true})
        setValue('notes', state.notes, {shouldValidate: true})
        setValue('phone', state.phone, {shouldValidate: true})
        setValue('email', state.email, {shouldValidate: true})
        setValue('location', state.location, {shouldValidate: true})
        setValue('start_date', start_date, {shouldValidate: true})
        setValue('end_date',end_date, {shouldValidate: true})
        // setValue('images', state.images, {shouldValidate: true})
    }, [state])
    //multiple image

    const [multipleImages, setMultipleImages] = useState([]);
    const changeMultipleFiles = (e) => {
        if (e.target.files) {
            setOldImages([])
            const imageArray = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            );
            if (multipleImages.length < 5) {
                setMultipleImages([]);
                setMultipleImages((prevImages) => prevImages.concat(imageArray));
            } else {
                setMultipleImages([]);
            }
        }
        if (e.target.files.length > 4) {
            setError('images', {type: 'custom', message: 'maximum four images!'});
        }
    };
    const renderImages = (data) => {
        return data.map((image) => {
            return <img
                style={{objectFit: "cover", height: "100px", width: "100px", border: "1px solid", marginRight: "10px"}}
                className="image my" src={image} alt="" key={image}/>;
        });
    };
    let renderOldImage = [];
    if (oldImages.length)
        renderOldImage = oldImages.map((item, index) => {
            return <img
                style={{objectFit: "cover", height: "100px", width: "100px", border: "1px solid", marginRight: "10px"}}
                className="image my" src={item} alt="" key={index}/>
        });

    const onsubmit = (data) => {
        console.log(data)
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdlb3NjaWVuY2Uub3JnIiwicm9sZV9pZCI6MSwibmFtZSI6IkFkbWluIiwiaWF0IjoxNjY5MjYyMjQzfQ.3yHmwnI0yJZtC9fEKLhpPxYDqArOF1GGw_Ig0gL8ex4"
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };

        const formData = new FormData();
        for (const key of Object.keys(multipleImages)) {
            formData.append('images', data.images[key]);
        }
        formData.append("id",state.id)
        formData.append("category_id", data.category_id)
        formData.append("content", data.content)
        formData.append("news_type_id", data.news_type_id)
        formData.append("title", data.title)
        // axios.post(process.env.REACT_APP_API_URL + "/api/admin/event/update", formData, config).then((res) => {
        //     if (res.data.status === 200) {
        //         navigate("/news")
        //     }
        // });
    }
    return (
        <div className={`container`}>
            <div className={`row justify-content-center`}>
                <div className={`col-lg-6 col-12`}>
                    <div className={`card`}>
                        <div className={`card-title p-4 text-center`} style={{fontSize: "35px"}}>Edit News</div>
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
                                    <label htmlFor="notes" className={`mb-2`}>Note The Followings</label>
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
                                            }} type="text" className={`form-control`}/>
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
                                                    <input  asp-format="{0:yyyy-MM-dd}" disabled={now > check_start_date ?? true} min={ new Date().toISOString().split('T')[0]} id={`start_date`} value={value ?? ""} onChange={(e)=>{
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
                                                    <input disabled={now > check_end_date ?? true} min={new Date().toISOString().split('T')[0]} id={`end_date`} value={value ?? ""} onChange={(e)=>{
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
                                        {...register('images', { required: false })}
                                        onChange={changeMultipleFiles}
                                    />
                                    <small className={`d-block text-danger mt-2`}>{errors?.images?.message}</small>
                                    <div>
                                        {renderImages(multipleImages)}
                                        {renderOldImage}
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

export default EditEvent;