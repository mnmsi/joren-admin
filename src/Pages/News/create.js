import React, {useEffect, useState} from 'react';
import axios from "axios";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useForm, Controller } from "react-hook-form";
import Select from "../../Components/UI/Select";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
const NewsCreate = () => {
    const notify = () => toast.success("Success!");
    const navigate = useNavigate()
    const { handleSubmit, reset, setValue,setError ,control,formState:{errors},register } = useForm({ mode:"all" });
    //category
     const [category,setCategory] = useState([])
    useEffect(()=>{
        axios.get(process.env.REACT_APP_API_URL+"/api/users/news/get/categories_list").then((res)=>{
            setCategory(res.data.data)
        })
    },[])
    let category_element = [{ value: '', option: 'Select an option' }]
    if (category.length) {
        category.map((item) => {
            const data = { value: item.id, option: item.title }
            category_element.push(data)
        })
    }
    //news type
    const [newsType,setNewsType] = useState([])
    //
    useEffect(()=>{
        axios.get(process.env.REACT_APP_API_URL+"/api/users/news/get/all_news_type").then((res)=>{
            setNewsType(res.data.data)
        })
    },[])
    let newsType_element = [{ value: '', option: 'Select an option' }]
    if (newsType.length) {
        newsType.map((item) => {
            const data = { value: item.id, option: item.title }
            newsType_element.push(data)
        })
    }
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

         let token = localStorage.getItem("joren_token") ?? null;
         const config = {
             headers: { Authorization: `Bearer ${token}` }
         };

         const formData = new FormData();
         for (const key of Object.keys(multipleImages)) {
             formData.append('images', data.images[key]);
         }
         formData.append("category_id",data.category_id)
         formData.append("content",data.content)
         formData.append("news_type_id",data.news_type_id)
         formData.append("title",data.title)


         axios.post(process.env.REACT_APP_API_URL+"/api/admin/add_news",formData,config).then((res)=>{
             if(res.data.status === 200){
                 navigate("/news")
                 notify()
             }
         });
     }
    return (
        <div className={`container`}>
            <div className={`row justify-content-center`}>
                <div className={`col-lg-6 col-12`}>
                    <div className={`card`}>
                        <div className={`card-title p-4 text-center`} style={{fontSize:"35px"}}>Create News</div>
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
                                    <label htmlFor="content" className={`mb-2`}>Content</label>
                                    <Controller
                                        name="content"
                                        control={control}
                                        rules={{ required: "This field is required" }}
                                        render={({ field: {value,onChange} }) => (
                                            <textarea value={value} onChange={onChange} className={`form-control`} name="" id="" cols="30" rows="10"></textarea>
                                        )}
                                    />
                                    <small className={`text-danger mt-2`}>{errors?.content?.message}</small>
                                </div>
                                {/*category*/}
                                <div className={`mb-3`}>
                                    <Controller
                                        rules={{
                                            required: 'Please select an option',
                                        }}
                                        control={control}
                                        name={`category_id`}
                                        render={({ field: { onChange, value, ref } }) => (
                                            <Select
                                                options={category_element}
                                                label={"Category"}
                                                value={value ?? ''}
                                                onChange={onChange}
                                                error={errors.category_id?.message}
                                            />
                                        )}
                                    />
                                </div>
                                {/*news type*/}
                                {/*category*/}
                                <div className={`mb-3`}>
                                    <Controller
                                        rules={{
                                            required: 'Please select an option',
                                        }}
                                        control={control}
                                        name={`news_type_id`}
                                        render={({ field: { onChange, value, ref } }) => (
                                            <Select
                                                options={newsType_element}
                                                label={"News Type"}
                                                value={value ?? ''}
                                                onChange={onChange}
                                                error={errors.news_type_id?.message}
                                            />
                                        )}
                                    />
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

export default NewsCreate;