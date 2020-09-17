import React, { useState, useEffect } from 'react';
import "../../styles/all-create.scss";
import { useForm } from "react-hook-form";
import { Icon } from 'react-icons-kit';
import { Link } from 'react-router-dom';
import { ic_keyboard_arrow_left } from 'react-icons-kit/md';
import axios from 'axios';
import { apiURL } from '../../utils/apiUrl';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({ autoClose: 2000 })
const Create = () => {
    const { register, handleSubmit, errors } = useForm()
    const [scrolled, setScrolled] = useState(true)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            let isTop = window.scrollY < 50;
            if (window.innerWidth <= 992 && isTop !== true) {
                setScrolled(false);
            } else {
                setScrolled(true);
            }
        })
    })

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const createAdmin = await axios.post(`${apiURL}sign-up/admin`, data)
            if (createAdmin.status === 201) {
                setLoading(false)
                toast.success('Successfully Admin Created')
            }
        } catch (error) {
            if (error) console.log(error.message)
        }
    }

    return (
        <div className="create">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 px-lg-0">
                        <div className={scrolled ? "card border-0 shadow-sm bar-card" : "card border-0 shadow-sm bar-card fixed-bar"}>
                            <div className="card-body p-3 text-right">
                                <Link
                                    to="/admin/all-admin"
                                    type="button"
                                    className="btn btn-sm rounded-0 shadow-none btn-light"
                                >
                                    <Icon icon={ic_keyboard_arrow_left} size={22} />
                                </Link>
                            </div>
                        </div>

                        <div className="py-2 py-lg-5"></div>
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body">

                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <div className="row">
                                        {/* Name */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.name && errors.name.message ? (
                                                    <small className="text-danger">{errors.name && errors.name.message}</small>
                                                ) : <small>Name</small>
                                                }

                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control shadow-none"
                                                    placeholder="Name"
                                                    ref={register({
                                                        required: "Name is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
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
                                                        required: "E-mail is Require*",
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                            message: "Invalid email address"
                                                        }
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.phoneNo && errors.phoneNo.message ? (
                                                    <small className="text-danger">{errors.phoneNo && errors.phoneNo.message}</small>
                                                ) : <small>Phone</small>
                                                }

                                                <input
                                                    type="text"
                                                    name="phoneNo"
                                                    className="form-control shadow-none"
                                                    placeholder="01xxxxxxxxx"
                                                    ref={register({
                                                        required: "Phone is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Role */}
                                        {/* <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.role && errors.role.message ? (
                                                    <small className="text-danger">{errors.role && errors.role.message}</small>
                                                ) : <small>Role</small>
                                                }

                                                <select
                                                    name="role"
                                                    className="form-control shadow-none"
                                                    ref={register({
                                                        required: "Role is Require*",
                                                    })}
                                                >
                                                    <option>Super Admin</option>
                                                    <option>Admin</option>
                                                </select>
                                            </div>
                                        </div> */}


                                        {/* Password */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
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
                                                        required: "Password is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12 text-right">
                                            <button type="submit" className="btn shadow-none">
                                                {isLoading ? <span>Adding...</span> : <span>Submit</span>}
                                            </button>
                                        </div>

                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;