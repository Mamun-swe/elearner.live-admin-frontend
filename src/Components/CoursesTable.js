import React, { useState } from 'react';
import { Icon } from 'react-icons-kit';
import {
    view,
    pen_1,
    bin
} from 'react-icons-kit/ikons';
import { toggleFilled, toggle } from 'react-icons-kit/ionicons';
import Modal from 'react-bootstrap/Modal';

const CoursesTable = ({ courses }) => {
    const [show, setShow] = useState(false);
    const [deleteId, setDeleteId] = useState()
    const [loading, setLoading] = useState(false);

    const openModal = id => {
        setDeleteId(id)
        setShow(true)
    }

    const submitDelete = () => {
        setLoading(true)
        alert(deleteId)
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
                                <button type="button" className="btn btn-light rounded-circle shadow-none">
                                    <Icon icon={view} size={20} />
                                </button>
                            </li>
                            <li>
                                <button type="button" className="btn btn-light rounded-circle shadow-none">
                                    <Icon icon={pen_1} size={20} />
                                </button>
                                {course.isPublish ?
                                    <button type="button" className="btn rounded-circle shadow-none">
                                        <Icon icon={toggleFilled} size={35} />
                                    </button>
                                    :
                                    <button type="button" className="btn rounded-circle shadow-none">
                                        <Icon icon={toggle} size={35} />
                                    </button>
                                }
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className="btn btn-light rounded-circle shadow-none"
                                    onClick={() => openModal(course.id)}
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
                onHide={() => setShow(false)}
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

                        <button type="button" className="btn btn-light shadow-none px-4 ml-2 text-dark" onClick={() => setShow(false)}>No</button>
                    </div>
                </Modal.Body>
            </Modal>


        </div>
    );
};

export default CoursesTable;