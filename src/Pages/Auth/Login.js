import React, { useState } from 'react';
import '../../styles/auth.scss';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { apiURL } from '../../utils/apiUrl';

import Logo from '../../assets/static/logo.png';

const Login = () => {
    const history = useHistory()
    const { register, handleSubmit, errors } = useForm();
    const [loading, setLoading] = useState(false)
    const [loginErr, setLoginErr] = useState()


    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const response = await axios.post(`${apiURL}login`, data)
            if (response.status === 200 && response.data.token) {
                const user = jwt_decode(response.data.token)
                if (user.scopes[0] === 'ADMIN' || 'ROLE_ADMIN') {
                    localStorage.setItem("token", response.data.token)
                    setLoading(false)
                    history.push('/admin')
                }
            }
        } catch (error) {
            if (error) {
                setLoading(false)
                setLoginErr('Invalid e-mail or password')
            }
        }
    }


    return (
        <div className="auth">
            <div className="flex-center flex-column">
                <div className="card border-0 shadow">
                    <div className="card-header">
                        <img src={Logo} className="img-fluid" alt="..." />
                        {loginErr ? <p className="mb-0 mt-2 text-danger">{loginErr}</p> : null}
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Email */}
                            <div className="form-group mb-4">
                                {errors.email && errors.email.message ? (
                                    <small className="text-danger">{errors.email && errors.email.message}</small>
                                ) : <small>E-mail</small>
                                }
                                <input
                                    type="text"
                                    name="email"
                                    className="form-control shadow-none"
                                    placeholder="example@gmail.com"
                                    ref={register({
                                        required: "E-mail is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                />
                            </div>

                            {/* Password */}
                            <div className="form-group mb-4">
                                {errors.password && errors.password.message ? (
                                    <small className="text-danger">{errors.password && errors.password.message}</small>
                                ) : <small>Password</small>
                                }
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control shadow-none"
                                    placeholder="*****"
                                    ref={register({
                                        required: "Please enter password",
                                    })}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-block shadow-none text-white"
                            >
                                {loading ?
                                    <span className="mb-0">Loading...</span> :
                                    <span className="mb-0">Login</span>
                                }
                            </button>

                            <div className="text-center mt-3">
                                <Link to="/reset">Forgot password ?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;