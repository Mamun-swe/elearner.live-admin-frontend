import React, { useState } from 'react';
import '../../styles/auth.scss';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";

import Logo from '../../assets/static/logo.png';

const Login = () => {
    const history = useHistory()
    const { register, handleSubmit, errors } = useForm();
    const [loading, setLoading] = useState(false)


    const onSubmit = data => {
        setLoading(true)
        localStorage.setItem("token", data.email)
        setLoading(false)
        history.push('/admin')
    }


    return (
        <div className="auth">
            <div className="flex-center flex-column">
                <div className="card border-0 shadow">
                    <div className="card-header">
                        <img src={Logo} className="img-fluid" alt="..." />
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