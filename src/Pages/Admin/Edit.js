import React, { useState, useEffect } from 'react';
import "../../styles/all-edit.scss";
import { useForm } from "react-hook-form";
import { Icon } from 'react-icons-kit';
import { Link } from 'react-router-dom';
import { ic_keyboard_arrow_left } from 'react-icons-kit/md';

const Edit = () => {
    const { register, handleSubmit, errors } = useForm()
    const [scrolled, setScrolled] = useState(true)

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

    const onSubmit = data => {
        console.log(data);
    }


    return (
        <div className="edit">
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
                                                {errors.phone && errors.phone.message ? (
                                                    <small className="text-danger">{errors.phone && errors.phone.message}</small>
                                                ) : <small>Phone</small>
                                                }

                                                <input
                                                    type="number"
                                                    name="phone"
                                                    className="form-control shadow-none"
                                                    ref={register({
                                                        required: "Phone is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Role */}
                                        <div className="col-12 col-lg-6">
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
                                        </div>

                                        <div className="col-12 text-right">
                                            <button type="submit" className="btn shadow-none">Update</button>
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

export default Edit;