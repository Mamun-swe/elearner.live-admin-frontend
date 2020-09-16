import React, {useEffect, useState} from 'react';
import "../../styles/all-create.scss";
import {useForm} from "react-hook-form";
import {Icon} from 'react-icons-kit';
import {Link} from 'react-router-dom';
import {ic_camera_alt, ic_keyboard_arrow_left} from 'react-icons-kit/md';
import axios from 'axios';
import {apiURL} from '../../utils/apiUrl';

const Create = () => {
    const { register, handleSubmit, errors } = useForm()
    const [scrolled, setScrolled] = useState(true)
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewURL, setPreviewURL] = useState(null)

    // Header 
    const header = {
        headers:
            {Authorization: "Bearer " + localStorage.getItem("token")}

    }

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

    const onSubmit = async (data) => {
        try {
            let courseSectionsRequestInString= "{\"sectionName\":\""+data.sectionName+"\",\"sectionName\":\""+data.sectionDescription+"\"}";

            console.log(courseSectionsRequestInString)
            console.log(localStorage.getItem("token"));

            let formData = new FormData()
            formData.append('courseSectionsRequestInString', courseSectionsRequestInString)
            formData.append('file', selectedFile)

            const upload = await axios.post(`${apiURL}sections`, formData, header)
            console.log(upload);
        } catch (error) {
            console.log(error.message);
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
                                        {errors.sectionName && errors.sectionName.message ? (
                                            <small className="text-danger">{errors.sectionName && errors.sectionName.message}</small>
                                        ) : <small>Category Name</small>
                                        }

                                        <input
                                            type="text"
                                            name="sectionName"
                                            className="form-control shadow-none"
                                            placeholder="Category Name"
                                            ref={register({
                                                required: "Category Name is Require*",
                                            })}
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="form-group mb-3">
                                        {errors.sectionDescription && errors.sectionDescription.message ? (
                                            <small className="text-danger">{errors.sectionDescription && errors.sectionDescription.message}</small>
                                        ) : <small>Category Details</small>
                                        }

                                        <textarea
                                            name="sectionDescription"
                                            className="form-control shadow-none"
                                            placeholder="Category Details"
                                            rows="5"
                                            ref={register({
                                                required: "Category Details is Require*",
                                            })}
                                        />
                                    </div>

                                    {/* Image */}
                                    <div className="form-group mb-3">
                                        <div className="d-flex">
                                            <div>
                                                <label className="file-upload-box border">
                                                    <div className="flex-center flex-column">
                                                        <Icon icon={ic_camera_alt} size={30} />
                                                        <input type="file" onChange={imageChangeHandeller} />
                                                    </div>
                                                </label>
                                            </div>
                                            {selectedFile && selectedFile.size > 50000 ? (
                                                <div className="px-2">
                                                    <p className="text-danger mb-0">Select less than 50KB file.</p>
                                                </div>
                                            ) : selectedFile && selectedFile.size < 50000 && previewURL ? (
                                                <div className="px-2">
                                                    <img src={previewURL} className="img-fluid border" alt="..." />
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>


                                    <div className="text-right">
                                        {selectedFile && selectedFile.size < 50000 && previewURL ?
                                            <button type="submit" className="btn shadow-none">Submit</button>
                                            : null}
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
