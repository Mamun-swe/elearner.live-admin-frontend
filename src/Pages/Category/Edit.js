import React, { useState, useEffect } from 'react';
import "../../styles/all-edit.scss";
import { useForm } from "react-hook-form";
import { Icon } from 'react-icons-kit';
import { Link } from 'react-router-dom';
import { ic_keyboard_arrow_left, ic_camera_alt } from 'react-icons-kit/md';

import MobileImg from '../../assets/mobile.png';

const Edit = () => {
    const { register, handleSubmit, errors } = useForm()
    const [scrolled, setScrolled] = useState(true)
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewURL, setPreviewURL] = useState(null)

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

    // Image onChange
    const imageChangeHandeller = event => {
        let file = event.target.files[0]
        if (file) {
            setSelectedFile(file)
            setPreviewURL(URL.createObjectURL(event.target.files[0]))
        }
    }

    // Update Image
    const updateImage = () => {
        let formData = new FormData()
        formData.append('image', selectedFile)
        console.log(formData);
    }

    const onSubmit = data => {
        console.log(data);
        // let formData = new FormData()
        // formData.append('name', data.name)
        // formData.append('image', selectedFile)
    }


    return (
        <div className="edit">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 px-lg-0">
                        <div className={scrolled ? "card border-0 shadow-sm bar-card" : "card border-0 shadow-sm bar-card fixed-bar"}>
                            <div className="card-body p-3 text-right">
                                <Link
                                    to="/admin/categories"
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

                                    {/* Category Name */}
                                    <div className="form-group mb-3">
                                        {errors.category_name && errors.category_name.message ? (
                                            <small className="text-danger">{errors.category_name && errors.category_name.message}</small>
                                        ) : <small>Category Name</small>
                                        }

                                        <input
                                            type="text"
                                            name="category_name"
                                            className="form-control shadow-none"
                                            ref={register({
                                                required: "Category Name is Require*",
                                            })}
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="form-group mb-3">
                                        {errors.category_details && errors.category_details.message ? (
                                            <small className="text-danger">{errors.category_details && errors.category_details.message}</small>
                                        ) : <small>Category Details</small>
                                        }

                                        <textarea
                                            name="category_details"
                                            className="form-control shadow-none"
                                            rows="5"
                                            ref={register({
                                                required: "Category Details is Require*",
                                            })}
                                        />
                                    </div>

                                    <div className="d-flex">
                                        <div className="border img-box">
                                            {selectedFile && selectedFile.size < 50000 && previewURL ?
                                                <img src={previewURL} className="img-fluid" alt="..." />
                                                : <img src={MobileImg} className="img-fluid" alt="..." />}

                                        </div>
                                        <div>
                                            <label className="file-upload-box border">
                                                <div className="flex-center flex-column">
                                                    <Icon icon={ic_camera_alt} size={30} />
                                                    <input type="file" onChange={imageChangeHandeller} />
                                                </div>
                                            </label>
                                        </div>

                                        {selectedFile && selectedFile.size < 50000 ?
                                            <div>
                                                <button
                                                    type="button"
                                                    className="btn shadow-none file-upload-btn"
                                                >Upload</button>
                                            </div>
                                            : null}
                                    </div>

                                    {selectedFile && selectedFile.size > 50000 ?
                                        <p className="text-danger mb-0">Select less than 50 Kb file</p>
                                        : null}

                                    <div className="text-right mt-3">
                                        <button type="submit" className="btn shadow-none" onClick={updateImage}>Update</button>
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