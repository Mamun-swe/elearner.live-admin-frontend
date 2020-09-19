import React, { useState, useEffect } from 'react';
import "../../styles/all-edit.scss";
import { useForm } from "react-hook-form";
import { Icon } from 'react-icons-kit';
import { Link, useParams } from 'react-router-dom';
import { ic_keyboard_arrow_left, ic_camera_alt } from 'react-icons-kit/md';
import axios from 'axios';
import { apiURL } from '../../utils/apiUrl';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingComponent from '../../Components/Loading';

toast.configure({ autoClose: 2000 })
const Edit = () => {
    const { id } = useParams()
    const { register, handleSubmit, errors } = useForm()
    const [scrolled, setScrolled] = useState(true)
    const [isLoading, setLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewURL, setPreviewURL] = useState(null)
    const [singleCategory, setSingleCategory] = useState({})
    const [image, setImage] = useState({})

    // Header 
    const header = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
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

        // fetch single category
        const fetchCategory = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${apiURL}sections/${id}`)
                setSingleCategory(response.data)
                setImage(response.data.imageDetails.imageUrl)
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        }
        fetchCategory()
    }, [id])

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
            let courseSectionsRequestInString =
                "{\"sectionName\":\"" + data.sectionName + "\",\"sectionDetails\":\"" + data.sectionDetails + "\"}";

            let formData = new FormData()
            formData.append('courseSectionsRequestInString', courseSectionsRequestInString)
            formData.append('file', selectedFile)

            const response = await axios.put(`${apiURL}sections/${id}`, formData, header)
            if (response.status === 200) {
                setSelectedFile(null)
                const response = await axios.get(`${apiURL}sections/${id}`)
                setSingleCategory(response.data)
                setImage(response.data.imageDetails.imageUrl)
                toast.success('Successfully Section Updated')
            }
        } catch (error) {
            if (error) console.log(error.message)
        }
    }


    return (
        <div className="edit">
            {isLoading ? <LoadingComponent /> :

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
                                                defaultValue={singleCategory.sectionName}
                                                name="sectionName"
                                                className="form-control shadow-none"
                                                ref={register({
                                                    required: "Category Name is Require*",
                                                })}
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="form-group mb-3">
                                            {errors.sectionDetails && errors.sectionDetails.message ? (
                                                <small className="text-danger">{errors.sectionDetails && errors.sectionDetails.message}</small>
                                            ) : <small>Category Details</small>
                                            }

                                            <textarea
                                                name="sectionDetails"
                                                defaultValue={singleCategory.sectionDetails}
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
                                                    : <img src={image} className="img-fluid" alt="..." />}

                                            </div>
                                            <div>
                                                <label className="file-upload-box border">
                                                    <div className="flex-center flex-column">
                                                        <Icon icon={ic_camera_alt} size={30} />
                                                        <input type="file" onChange={imageChangeHandeller} />
                                                    </div>
                                                </label>
                                            </div>

                                            {/* {selectedFile && selectedFile.size < 50000 ?
                                                <div>
                                                    <button
                                                        type="button"
                                                        className="btn shadow-none file-upload-btn"
                                                        onClick={updateImage}
                                                    >Upload</button>
                                                </div>
                                                : null} */}
                                        </div>

                                        {selectedFile && selectedFile.size > 100000 ?
                                            <p className="text-danger mb-0">Select less than 50 Kb file</p>
                                            : null}

                                        <div className="text-right mt-3">
                                            {selectedFile && selectedFile.size < 100000 && previewURL ?
                                                <button type="submit" className="btn shadow-none">Update</button>
                                                : null}
                                        </div>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            }
        </div>
    );
};

export default Edit;