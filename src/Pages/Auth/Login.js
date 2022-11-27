import React, {useState} from 'react';
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import {Alert} from "react-bootstrap";
import {useNavigate} from "react-router";
const Login = () => {
    const navigate = useNavigate()
    const [is_error,set_error] = useState(false)
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: "all",
    });

    const onsubmit = (data) => {
        let alert = null;
        axios.post(process.env.REACT_APP_API_URL+"/api/admin/log_in",{
            email:data.email,
            password:data.password,
        }).then((res)=>{
            if(res.data.status){
                localStorage.setItem("joren_token",res.data?.accessToken)
                set_error(false)
                navigate("/news")
                window.location.reload();
            }

        }).catch((err)=>{
            if(err.response.data){
                set_error(true)
            }
        })
    }

    return (
        <div className={`d-flex justify-content-center align-items-center login_container`}>
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-6 col-md-12">
                        {is_error && <Alert variant={`danger`}>Something went wrong!</Alert>}
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title">
                                    Login
                                </div>

                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(onsubmit)}>
                                    <div className="mb-4">
                                        <label htmlFor="email" className={`mb-2`}>Email</label>
                                        <Controller
                                            control={control}
                                            name="email"
                                            rules={{
                                                required: "This field is required",
                                                pattern: {
                                                    value:
                                                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message: "Email not valid",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    id="email"
                                                    // onChange={onChange}
                                                    // // ref={ref}
                                                    value={field.value ?? ''}
                                                    type="email"
                                                    className={`form-control`}
                                                    placeholder="Email address"
                                                />
                                            )}
                                        />
                                        <small className={`text-danger mt-2`}>{errors?.email?.message}</small>

                                    </div>
                                    <div className={`mb-4`}>
                                        <Controller
                                            control={control}
                                            name="password"
                                            rules={{
                                                required: "This field is required",
                                                minLength: {
                                                    value: 8,
                                                    message: "Password should be minimum 8 character",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    // passwordId="loginPassword"
                                                    // onChange={onChange}
                                                    value={field.value ?? ''}
                                                    // password={true}
                                                    // ref={ref}
                                                    className={`form-control`}
                                                    type={`password`}
                                                    placeholder="Password"
                                                    error={errors.password?.message}
                                                />

                                            )}
                                        />
                                        <small className={`text-danger mt-2`}>{errors?.password?.message}</small>
                                    </div>
                                    <button type={`submit`} className={`btn btn-success`}>Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;