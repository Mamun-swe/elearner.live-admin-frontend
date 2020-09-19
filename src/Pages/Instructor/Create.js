import React, { useState } from 'react';
import "../../styles/all-create.scss";
import { useForm } from "react-hook-form";
import { Icon } from 'react-icons-kit';
import { Link } from 'react-router-dom';
import { ic_camera_alt, ic_keyboard_arrow_left } from 'react-icons-kit/md';
import axios from 'axios';
import { apiURL } from '../../utils/apiUrl';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({ autoClose: 2000 })
const Create = () => {
    const { register, handleSubmit, errors } = useForm()
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewURL, setPreviewURL] = useState(null)
    const [isLoading, setLoading] = useState(false)

    // Image onChange
    const imageChangeHandeller = event => {
        let file = event.target.files[0]
        if (file) {
            setSelectedFile(file)
            setPreviewURL(URL.createObjectURL(event.target.files[0]))
        }
    }

    // Submit Form
    const onSubmit = async (data) => {
        try {
            setLoading(true)
            let signUpInstructorRequestInString = "{\"name\":\"" + data.name + "\",\"email\":\"" + data.email + "\",\"currentAddress\":\"" + data.currentAddress + "\",\"qualificationInfo\":{\"qualification\":\"" + data.qualification + "\",\"designation\":\"" + data.designation + "\",\"companyName\":\"" + data.companyName + "\",\"totalProfessionalExperienceInYear\":\"" + data.totalProfessionalExperienceInYear + "\"},\"phoneNo\":\"" + data.phoneNo + "\",\"password\":\"" + data.phoneNo + "\"}"

            let formData = new FormData()
            formData.append('signUpInstructorRequestInString', signUpInstructorRequestInString)
            formData.append('file', selectedFile)

            // console.log(signUpInstructorRequestInString);

            const upload = await axios.post(`${apiURL}sign-up/instructor`, formData)
            console.log(upload);
            if (upload.status === 201) {
                setLoading(false)
                toast.success('Successfully Instructor Created')
            }
        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <div className="create">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 px-lg-0">
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body p-3 text-right">
                                <Link
                                    to="/admin/instructor"
                                    type="button"
                                    className="btn btn-sm rounded-0 shadow-none btn-light"
                                >
                                    <Icon icon={ic_keyboard_arrow_left} size={22} />
                                </Link>
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body">

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row">

                                        <div className="col-12 col-lg-6">
                                            {/* Name */}
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

                                        <div className="col-12 col-lg-6">
                                            {/* E-mail */}
                                            <div className="form-group mb-3">
                                                {errors.email && errors.email.message ? (
                                                    <small className="text-danger">
                                                        {errors.email &&
                                                            errors.email.message
                                                        }
                                                    </small>
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
                                        </div>

                                        <div className="col-12 col-lg-6">
                                            {/* Current Address */}
                                            <div className="form-group mb-3">
                                                {errors.currentAddress && errors.currentAddress.message ? (
                                                    <small className="text-danger">
                                                        {errors.currentAddress &&
                                                            errors.currentAddress.message
                                                        }
                                                    </small>
                                                ) : <small>Current address</small>
                                                }

                                                <input
                                                    type="text"
                                                    name="currentAddress"
                                                    className="form-control shadow-none"
                                                    placeholder="Current address"
                                                    ref={register({
                                                        required: "Current address is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12 col-lg-6">
                                            {/* Qualification */}
                                            <div className="form-group mb-3">
                                                {errors.qualification && errors.qualification.message ? (
                                                    <small className="text-danger">
                                                        {errors.qualification &&
                                                            errors.qualification.message
                                                        }
                                                    </small>
                                                ) : <small>Qualification</small>
                                                }

                                                <input
                                                    type="text"
                                                    name="qualification"
                                                    className="form-control shadow-none"
                                                    placeholder="Qualification"
                                                    ref={register({
                                                        required: "Qualification is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12 col-lg-6">
                                            {/* Designation */}
                                            <div className="form-group mb-3">
                                                {errors.designation && errors.designation.message ? (
                                                    <small className="text-danger">
                                                        {errors.designation &&
                                                            errors.designation.message
                                                        }
                                                    </small>
                                                ) : <small>Designation</small>
                                                }

                                                <input
                                                    type="text"
                                                    name="designation"
                                                    className="form-control shadow-none"
                                                    placeholder="Designation"
                                                    ref={register({
                                                        required: "Designation is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12 col-lg-6">
                                            {/* Company */}
                                            <div className="form-group mb-3">
                                                {errors.companyName && errors.companyName.message ? (
                                                    <small className="text-danger">
                                                        {errors.companyName &&
                                                            errors.companyName.message
                                                        }
                                                    </small>
                                                ) : <small>Company Name</small>
                                                }

                                                <input
                                                    type="text"
                                                    name="companyName"
                                                    className="form-control shadow-none"
                                                    placeholder="Company Name"
                                                    ref={register({
                                                        required: "Company Name is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12 col-lg-6">
                                            {/* Experience */}
                                            <div className="form-group mb-3">
                                                {errors.totalProfessionalExperienceInYear &&
                                                    errors.totalProfessionalExperienceInYear.message ? (
                                                        <small className="text-danger">
                                                            {errors.totalProfessionalExperienceInYear &&
                                                                errors.totalProfessionalExperienceInYear.message
                                                            }
                                                        </small>
                                                    ) : <small>Experience</small>
                                                }

                                                <input
                                                    type="text"
                                                    name="totalProfessionalExperienceInYear"
                                                    className="form-control shadow-none"
                                                    placeholder="Experience"
                                                    ref={register({
                                                        required: "Experience is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12 col-lg-6">
                                            {/* Phone */}
                                            <div className="form-group mb-3">
                                                {errors.phoneNo &&
                                                    errors.phoneNo.message ? (
                                                        <small className="text-danger">
                                                            {errors.phoneNo &&
                                                                errors.phoneNo.message
                                                            }
                                                        </small>
                                                    ) : <small>Phone number</small>
                                                }

                                                <input
                                                    type="text"
                                                    name="phoneNo"
                                                    className="form-control shadow-none"
                                                    placeholder="01xxxxxxxxx"
                                                    ref={register({
                                                        required: "Phone number*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12">
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
                                                    {selectedFile && selectedFile.size > 100000 ? (
                                                        <div className="px-2">
                                                            <p className="text-danger mb-0">Select less than 500KB file.</p>
                                                        </div>
                                                    ) : selectedFile && selectedFile.size < 100000 && previewURL ? (
                                                        <div className="px-2">
                                                            <img src={previewURL} className="img-fluid border" alt="..." />
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 text-right">
                                            {selectedFile && selectedFile.size < 100000 && previewURL ?
                                                <button type="submit" className="btn shadow-none">
                                                    {isLoading ? <span>Adding...</span> : <span>Submit</span>}
                                                </button>
                                                : null}
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