import React from 'react';
import "../../styles/all-create.scss";
import { useForm } from "react-hook-form";

const Create = () => {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        console.log(data);
    }

    return (
        <div className="create">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 px-lg-0">
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body">

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row">

                                        {/* Category Choose */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.category && errors.category.message ? (
                                                    <small className="text-danger">{errors.category && errors.category.message}</small>
                                                ) : <small>Select category</small>
                                                }

                                                <select
                                                    name="category"
                                                    className="form-control shadow-none"
                                                    ref={register({
                                                        required: "Category is Require*",
                                                    })}
                                                >
                                                    <option value="android">android</option>
                                                    <option value="web">web</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Course Name */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.course_name && errors.course_name.message ? (
                                                    <small className="text-danger">{errors.course_name && errors.course_name.message}</small>
                                                ) : <small>Course Name</small>
                                                }

                                                <input
                                                    type="text"
                                                    name="course_name"
                                                    className="form-control shadow-none"
                                                    placeholder="Course Name"
                                                    ref={register({
                                                        required: "Course Name is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Learner Limitation */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.learner_limitation && errors.learner_limitation.message ? (
                                                    <small className="text-danger">{errors.learner_limitation && errors.learner_limitation.message}</small>
                                                ) : <small>Learner Limitation</small>
                                                }

                                                <input
                                                    type="number"
                                                    name="learner_limitation"
                                                    className="form-control shadow-none"
                                                    placeholder="Max Number of Learners"
                                                    ref={register({
                                                        required: "Learner Limitation is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Course Start Date */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.start_date && errors.start_date.message ? (
                                                    <small className="text-danger">{errors.start_date && errors.start_date.message}</small>
                                                ) : <small>Course Start Date</small>
                                                }

                                                <input
                                                    type="date"
                                                    name="start_date"
                                                    className="form-control shadow-none"
                                                    ref={register({
                                                        required: "Course Start Date is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Course End Date */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.start_date && errors.start_date.message ? (
                                                    <small className="text-danger">{errors.start_date && errors.start_date.message}</small>
                                                ) : <small>Course End Date</small>
                                                }

                                                <input
                                                    type="date"
                                                    name="end_date"
                                                    className="form-control shadow-none"
                                                    ref={register({
                                                        required: "Course End Date is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Course Duration */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.duration && errors.duration.message ? (
                                                    <small className="text-danger">{errors.duration && errors.duration.message}</small>
                                                ) : <small>Course Duration</small>
                                                }

                                                <input
                                                    type="number"
                                                    name="duration"
                                                    className="form-control shadow-none"
                                                    placeholder="Course Duration in Days"
                                                    ref={register({
                                                        required: "Course Duration is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Total Class */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.total_class && errors.total_class.message ? (
                                                    <small className="text-danger">{errors.total_class && errors.total_class.message}</small>
                                                ) : <small>Total Class</small>
                                                }

                                                <input
                                                    type="number"
                                                    name="total_class"
                                                    className="form-control shadow-none"
                                                    placeholder="Total Number of Classes"
                                                    ref={register({
                                                        required: "Total Class is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Class Duration */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.class_duration && errors.class_duration.message ? (
                                                    <small className="text-danger">{errors.class_duration && errors.class_duration.message}</small>
                                                ) : <small>Class Duration</small>
                                                }

                                                <input
                                                    type="number"
                                                    name="class_duration"
                                                    className="form-control shadow-none"
                                                    placeholder="Course Class Duration"
                                                    ref={register({
                                                        required: "Class Duration is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Instructor Name */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.instructor_name && errors.instructor_name.message ? (
                                                    <small className="text-danger">{errors.instructor_name && errors.instructor_name.message}</small>
                                                ) : <small>Instructor Name</small>
                                                }

                                                <input
                                                    type="text"
                                                    name="instructor_name"
                                                    className="form-control shadow-none"
                                                    placeholder="Instructor Name"
                                                    ref={register({
                                                        required: "Instructor Name is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Regular Course Price */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.regular_price && errors.regular_price.message ? (
                                                    <small className="text-danger">{errors.regular_price && errors.regular_price.message}</small>
                                                ) : <small>Regular Course Price</small>
                                                }

                                                <input
                                                    type="number"
                                                    name="regular_price"
                                                    className="form-control shadow-none"
                                                    placeholder="Regular Course Price"
                                                    ref={register({
                                                        required: "Regular Course Price is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Course Price in Offer */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.price_in_offer && errors.price_in_offer.message ? (
                                                    <small className="text-danger">{errors.price_in_offer && errors.price_in_offer.message}</small>
                                                ) : <small>Course Price in Offer</small>
                                                }

                                                <input
                                                    type="number"
                                                    name="price_in_offer"
                                                    className="form-control shadow-none"
                                                    placeholder="Course Price in Offer"
                                                    ref={register({
                                                        required: "Course Price in Offer is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>


                                        {/* Offer Reason */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.offer_reason && errors.offer_reason.message ? (
                                                    <small className="text-danger">{errors.offer_reason && errors.offer_reason.message}</small>
                                                ) : <small>Offer Reason</small>
                                                }

                                                <input
                                                    type="text"
                                                    name="offer_reason"
                                                    className="form-control shadow-none"
                                                    placeholder="Offer Reason (20 Character Max)"
                                                    ref={register({
                                                        required: "Offer Reason is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>


                                        {/* Basic About of Course */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.basic_about_of_course && errors.basic_about_of_course.message ? (
                                                    <small className="text-danger">{errors.basic_about_of_course && errors.basic_about_of_course.message}</small>
                                                ) : <small>Basic About of Course</small>
                                                }

                                                <textarea
                                                    name="basic_about_of_course"
                                                    className="form-control shadow-none"
                                                    placeholder="Basic About of Course"
                                                    rows="5"
                                                    ref={register({
                                                        required: "Basic About of Course is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* What Learn ? */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.what_we_learn && errors.what_we_learn.message ? (
                                                    <small className="text-danger">{errors.what_we_learn && errors.what_we_learn.message}</small>
                                                ) : <small>What Learn ?</small>
                                                }

                                                <textarea
                                                    name="what_we_learn"
                                                    className="form-control shadow-none"
                                                    placeholder="কি কি শিখব এই কোর্সে ?"
                                                    rows="5"
                                                    ref={register({
                                                        required: "This field is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Why Do this Course ? */}
                                        <div className="col-12">
                                            <div className="form-group mb-3">
                                                {errors.why_do_this_course && errors.why_do_this_course.message ? (
                                                    <small className="text-danger">{errors.why_do_this_course && errors.why_do_this_course.message}</small>
                                                ) : <small>Why Do this Course ?</small>
                                                }

                                                <textarea
                                                    name="why_do_this_course"
                                                    className="form-control shadow-none"
                                                    placeholder="কেন করব এই কোর্স ?"
                                                    rows="5"
                                                    ref={register({
                                                        required: "This field is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Youtube Embaded Link */}
                                        <div className="col-12">
                                            <div className="form-group mb-3">
                                                {errors.embaded_link && errors.embaded_link.message ? (
                                                    <small className="text-danger">{errors.embaded_link && errors.embaded_link.message}</small>
                                                ) : <small>Youtube Embaded Link</small>
                                                }

                                                <input
                                                    type="text"
                                                    name="embaded_link"
                                                    className="form-control shadow-none"
                                                    placeholder="Youtube Embaded Link"
                                                    ref={register({
                                                        required: "Youtube Embaded Link is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12 text-right">
                                            <button type="submit" className="btn shadow-none">Submit</button>
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