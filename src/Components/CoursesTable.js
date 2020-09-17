import React, { useState } from 'react';
import { Icon } from 'react-icons-kit';
import { view, pen_1, bin } from 'react-icons-kit/ikons';
import { toggleFilled, toggle } from 'react-icons-kit/ionicons';
import { ic_local_offer } from 'react-icons-kit/md/';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { apiURL } from '../utils/apiUrl';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

toast.configure({ autoClose: 2000 })
const CoursesTable = ({ courses }) => {
    const { register, handleSubmit, errors } = useForm()
    const [show, setShow] = useState(false)
    const [showOffer, setShowOffer] = useState(false)
    const [deleteId, setDeleteId] = useState()
    const [loading, setLoading] = useState(false)
    const [courseId, setCourseId] = useState()
    const [offerLoading, setOfferLoading] = useState(false)

    const openModal = id => {
        setDeleteId(id)
        setShow(true)
    }

    const hideModal = () => {
        setShow(false)
        setLoading(false)
        setShowOffer(false)
    }

    const handleOfferModal = id => {
        setCourseId(id)
        setShowOffer(true)
    }

    // Header 
    const header = {
        headers:
        {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }


    // Publish Course
    const submitForPublish = async (courseId) => {
        try {
            const data = { isPublish: true }
            const response = await axios.put(`${apiURL}courses/${courseId}/publish`, data, header)
            if (response.status === 200) {
                toast.success('Successfully Course Published')
            }
        } catch (error) {
            if (error) console.log(error)
        }
    }

    // Unpublish Course
    const submitForUnPublish = async (courseId) => {
        try {
            const data = { isPublish: false }
            const response = await axios.put(`${apiURL}courses/${courseId}/publish`, data, header)
            if (response.status === 200) {
                toast.info('Successfully Course Unpublished')
            }
        } catch (error) {
            if (error) console.log(error)
        }
    }

    // Submit Delete
    const submitDelete = async () => {
        try {
            setLoading(true)
            const response = await axios.delete(`${apiURL}/courses/${deleteId}`, header)
            if (response.status === 200) {
                setLoading(false)
                setShow(false)
                toast.info('Successfully Course Delete')
            }
        } catch (error) {
            if (error) console.log(error)
        }
    }

    // Submit Offer
    const submitOffer = (data) => {
        setOfferLoading(true)
        const offer = {
            "offer": {
                "basicOfferInPercentage": data.basicOfferInPercentage,
                "specialOfferInPercentage": data.specialOfferInPercentage,
                "specialOfferReason": data.specialOfferReason,
                "specialOfferStatDate": data.specialOfferStatDate,
                "specialOfferEndDate": data.specialOfferEndDate
            }
        }

        axios.put(`${apiURL}admin/courses/${courseId}/offer`, offer, header)
            .then(res => {
                if (res.status === 200) {
                    setShowOffer(false)
                    toast.success('Successfully Section Created')
                }
            })
            .catch(err => {
                if (err) {
                    console.log(err)
                }
            })
    }

    return (
        <div className="data">

            {courses.length > 0 && courses.map((course, i) =>
                <div className="d-lg-flex border-bottom py-3" key={i}>
                    <div className="p-1">
                        <img src={course.imageDetails.imageUrl} className="img-fluid" alt="..." />
                    </div>
                    <div className="p-2 content">
                        <h5>{course.courseName}</h5>
                        <ul>
                            <li><p><span>Enrollment:</span> {course.length}</p></li>
                            {/* <li className="pl-lg-3"><p><span>Pre-Register:</span> 100</p></li> */}
                            <li className="pl-lg-3"><p><span>Instructor Name:</span> {course.courseInstructorName}</p></li>
                        </ul>
                        <small className="d-lg-none">Last updated on 12 aug</small>
                    </div>
                    <div className="ml-auto buttons">
                        <ul>
                            <li>
                                <button
                                    type="button"
                                    className="btn btn-light rounded-circle shadow-none"
                                    onClick={() => handleOfferModal(course.courseId)}
                                >
                                    <Icon icon={ic_local_offer} size={20} />
                                </button>
                            </li>
                            <li>
                                <Link to={`/admin/course/${course.courseId}/show`}
                                    type="button"
                                    className="btn btn-light rounded-circle shadow-none">
                                    <Icon icon={view} size={20} />
                                </Link>
                            </li>
                            <li>
                                <button type="button" className="btn btn-light rounded-circle shadow-none">
                                    <Icon icon={pen_1} size={20} />
                                </button>
                                {course.isPublish ?
                                    <button type="button"
                                        className="btn rounded-circle shadow-none"
                                        onClick={() => submitForUnPublish(course.courseId)}
                                    >
                                        <Icon icon={toggleFilled} size={35} />
                                    </button>
                                    :
                                    <button
                                        type="button"
                                        className="btn rounded-circle shadow-none"
                                        onClick={() => submitForPublish(course.courseId)}
                                    >
                                        <Icon icon={toggle} size={35} />
                                    </button>
                                }
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className="btn btn-light rounded-circle shadow-none"
                                    onClick={() => openModal(course.courseId)}
                                >
                                    <Icon icon={bin} size={20} />
                                </button>
                            </li>
                        </ul>
                        <small className="d-none d-lg-block mt-lg-2">Last updated on 12 aug</small>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            <Modal
                show={show}
                centered
                onHide={() => hideModal()}
                className="custom-modal"
            >
                <Modal.Header closeButton className="border-0 pb-0">
                </Modal.Header>
                <Modal.Body className="pb-4 px-4">
                    <h5 className="mb-4">Are you sure ! want to delete course ?</h5>
                    <div>
                        <button
                            type="button"
                            className="btn btn-primary shadow-none px-4 text-white"
                            onClick={submitDelete}
                        >
                            {loading ? <span>Deleting...</span> : <span>Yes</span>}
                        </button>

                        <button type="button" className="btn btn-light shadow-none px-4 ml-2 text-dark" onClick={() => hideModal()}>No</button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Offer Modal */}
            <Modal
                show={showOffer}
                centered
                onHide={() => hideModal()}
                className="custom-offer-modal"
            >
                <Modal.Header closeButton className="border-0 pb-0">
                </Modal.Header>
                <Modal.Body className="pb-4 px-4">
                    <form onSubmit={handleSubmit(submitOffer)}>

                        {/* basicOfferInPercentage */}
                        <div className="form-group mb-3">
                            {errors.basicOfferInPercentage && errors.basicOfferInPercentage.message ? (
                                <small className="text-danger">{errors.basicOfferInPercentage && errors.basicOfferInPercentage.message}</small>
                            ) : <small>Basic offer in percentage</small>
                            }

                            <input
                                type="text"
                                name="basicOfferInPercentage"
                                className="form-control shadow-none"
                                ref={register({
                                    required: "This field is Require*",
                                })}
                            />
                        </div>

                        {/* specialOfferInPercentage */}
                        <div className="form-group mb-3">
                            {errors.specialOfferInPercentage && errors.specialOfferInPercentage.message ? (
                                <small className="text-danger">{errors.specialOfferInPercentage && errors.specialOfferInPercentage.message}</small>
                            ) : <small>Special offer in percentage</small>
                            }

                            <input
                                type="text"
                                name="specialOfferInPercentage"
                                className="form-control shadow-none"
                                ref={register({
                                    required: "This field is Require*",
                                })}
                            />
                        </div>

                        {/* specialOfferReason */}
                        <div className="form-group mb-3">
                            {errors.specialOfferReason && errors.specialOfferReason.message ? (
                                <small className="text-danger">{errors.specialOfferReason && errors.specialOfferReason.message}</small>
                            ) : <small>Special offer reason</small>
                            }

                            <input
                                type="text"
                                name="specialOfferReason"
                                className="form-control shadow-none"
                                ref={register({
                                    required: "This field is Require*",
                                })}
                            />
                        </div>

                        {/* specialOfferStatDate */}
                        <div className="form-group mb-3">
                            {errors.specialOfferStatDate && errors.specialOfferStatDate.message ? (
                                <small className="text-danger">{errors.specialOfferStatDate && errors.specialOfferStatDate.message}</small>
                            ) : <small>Special offer start date</small>
                            }

                            <input
                                type="date"
                                name="specialOfferStatDate"
                                className="form-control shadow-none"
                                ref={register({
                                    required: "This field is Require*",
                                })}
                            />
                        </div>

                        {/* specialOfferEndDate */}
                        <div className="form-group mb-3">
                            {errors.specialOfferEndDate && errors.specialOfferEndDate.message ? (
                                <small className="text-danger">{errors.specialOfferEndDate && errors.specialOfferEndDate.message}</small>
                            ) : <small>Special offer end date</small>
                            }

                            <input
                                type="date"
                                name="specialOfferEndDate"
                                className="form-control shadow-none"
                                ref={register({
                                    required: "This field is Require*",
                                })}
                            />
                        </div>

                        <div className="text-right">
                            <button type="submit" className="btn btn-info shadow-none text-white">
                                {offerLoading ? <span>Loading...</span> : <span>Submit</span>}
                            </button>
                        </div>

                    </form>
                </Modal.Body>
            </Modal>


        </div>
    );
};

export default CoursesTable;