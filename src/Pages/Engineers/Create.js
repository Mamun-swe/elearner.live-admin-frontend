import React, { useState, useEffect } from 'react';
import "../../styles/all-create.scss";
import { useForm } from "react-hook-form";
import { Icon } from 'react-icons-kit';
import { Link } from 'react-router-dom';
import { ic_keyboard_arrow_left, ic_camera_alt } from 'react-icons-kit/md';

const Create = () => {
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

    const onSubmit = data => {
        console.log(data);
        let formData = new FormData()
        formData.append('name', data.name)
        formData.append('image', selectedFile)
    }


    return (
        <div className="create">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 px-lg-0">
                        <div className={scrolled ? "card border-0 shadow-sm bar-card" : "card border-0 shadow-sm bar-card fixed-bar"}>
                            <div className="card-body p-3 text-right">
                                <Link
                                    to="/admin/engineers"
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

                                    {/* Position */}
                                    <div className="form-group mb-3">
                                        {errors.position && errors.position.message ? (
                                            <small className="text-danger">{errors.position && errors.position.message}</small>
                                        ) : <small>Position</small>
                                        }

                                        <input
                                            type="text"
                                            name="position"
                                            className="form-control shadow-none"
                                            placeholder="Position"
                                            ref={register({
                                                required: "Position is Require*",
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