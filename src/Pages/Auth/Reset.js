import React, { useState } from 'react';
import '../../styles/auth.scss';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

import Logo from '../../assets/static/logo.png';

const Reset = () => {
    const { register, handleSubmit, errors } = useForm();
    const [loading, setLoading] = useState(false)

    const onSubmit = data => {
        setLoading(true)
        console.log(data);
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
                            <p className="text-center">Just Enter e-mail.</p>
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

                            <button
                                type="submit"
                                className="btn btn-block shadow-none text-white"
                            >
                                {loading ?
                                    <span>Loading...</span> :
                                    <span>Submit</span>
                                }
                            </button>

                            <div className="text-center mt-3">
                                <Link to="/">Go to Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reset;