import React, { useState } from 'react';
import "../../styles/promotion.scss";
import { useForm } from "react-hook-form";

const Index = () => {
    const { register, handleSubmit, errors } = useForm()
    const [loading, setLoading] = useState(false)
    const [regStudents, setRegStudents] = useState(true)
    const [enrollStudents, setEnrollStudents] = useState(false)
    const [instructors, setInstructors] = useState(false)

    const onChangeRegStudents = event => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        setRegStudents(value)
        setEnrollStudents(false)
        setInstructors(false)
    }

    const onChangeEnrollStudents = event => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        setEnrollStudents(value)
        setRegStudents(false)
        setInstructors(false)
    }

    const onChangeInstructors = event => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        setInstructors(value)
        setRegStudents(false)
        setEnrollStudents(false)
    }

    const onSubmit = data => {
        const mailData = {
            from: data.from_mail,
            subject: data.subject,
            body: data.body
        }

        if (regStudents)
            console.log(mailData + 'Reg students only')
        else if (enrollStudents)
            console.log(mailData + 'Enrollmentd students only')
        else
            console.log(mailData + 'Instructors only')
    }



    return (
        <div className="promotion">
            {loading ?
                <p>Loading...</p> :
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 px-lg-0 mb-4 mb-lg-0">
                            <div className="card border-0 shadow-sm">
                                <div className="card-header">
                                    <h5 className="mb-0">Email:</h5>
                                </div>
                                <div className="card-body">

                                    {/* Options */}
                                    <div className="d-lg-flex mb-3">
                                        <div><h6 className="mb-0">To</h6></div>
                                        <div className="ml-lg-auto mt-3 mt-lg-0">
                                            <label>
                                                <input
                                                    name="regStudents"
                                                    type="checkbox"
                                                    checked={regStudents}
                                                    onChange={onChangeRegStudents}
                                                />
                                                <span className="ml-2">All Registered students</span>
                                            </label>
                                        </div>
                                        <div className="ml-lg-3">
                                            <label>
                                                <input
                                                    name="enrolmentStudents"
                                                    type="checkbox"
                                                    checked={enrollStudents}
                                                    onChange={onChangeEnrollStudents}
                                                />
                                                <span className="ml-2">All Enrollmented students</span>
                                            </label>
                                        </div>
                                        <div className="ml-lg-3">
                                            <label>
                                                <input
                                                    name="instructors"
                                                    type="checkbox"
                                                    checked={instructors}
                                                    onChange={onChangeInstructors}
                                                />
                                                <span className="ml-2">All Instructors</span>
                                            </label>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        {/* From mail */}
                                        <div className="form-group mb-4">
                                            <input
                                                type="text"
                                                name="from_mail"
                                                className={errors.from_mail ?
                                                    "form-control shadow-none error" :
                                                    "form-control shadow-none"
                                                }
                                                ref={register({
                                                    required: true,
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                                    }
                                                })}
                                            />
                                        </div>

                                        {/* Subject */}
                                        <div className="form-group mb-4">
                                            <input
                                                type="text"
                                                name="subject"
                                                className={errors.subject ?
                                                    "form-control shadow-none error" :
                                                    "form-control shadow-none"
                                                }
                                                placeholder="Subject"
                                                ref={register({
                                                    required: true,
                                                })}
                                            />
                                        </div>

                                        {/* Body */}
                                        <div className="form-group mb-4">
                                            <textarea
                                                type="text"
                                                name="body"
                                                className={errors.body ?
                                                    "form-control shadow-none error" :
                                                    "form-control shadow-none"
                                                }
                                                placeholder="Mail Body"
                                                rows="12"
                                                ref={register({
                                                    required: true,
                                                })}
                                            />
                                        </div>

                                        <div className="text-right">
                                            <button type="submit" className="btn shadow-none text-white">
                                                <span>Send</span>
                                            </button>
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

export default Index;