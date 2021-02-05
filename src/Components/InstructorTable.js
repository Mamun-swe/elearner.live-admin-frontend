import React, { useEffect, useState } from 'react';
import { Icon } from 'react-icons-kit';
import { bin, view } from 'react-icons-kit/ikons';
import { toggleFilled, toggle } from 'react-icons-kit/ionicons';
import Modal from 'react-bootstrap/Modal';

const InstructorTable = ({ instructors }) => {
    const [show, setShow] = useState(false);
    const [deleteId, setDeleteId] = useState()
    const [allInstructors, setAllInstructors] = useState([])
    const [loading, setLoading] = useState(false)

    const openModal = id => {
        setDeleteId(id)
        setShow(true)
    }

    useEffect(() => {
        setAllInstructors(instructors)
    }, [instructors])

    const submitDelete = () => {
        setLoading(true)
        alert(deleteId)
    }

    return (
        <div className="data">

            {allInstructors.length > 0 && allInstructors.map((instructor, i) =>
                <div className="d-lg-flex border rounded p-3 mb-3" key={i}>
                    <div className="p-1 image-frame rounded-circle">
                        <img src={instructor.imageDetails.imageUrl} className="img-fluid" alt="..." />
                    </div>
                    <div className="p-2 content">
                        <h5 className="text-capitalize">{instructor.name}</h5>
                        <ul>
                            <li><p><span>Enrollment courses:</span> 00</p></li>
                            <li className="pl-lg-3"><p><span>{instructor.qualificationInfo.designation} at {instructor.qualificationInfo.companyName}</span></p></li>
                        </ul>
                        <small className="d-lg-none">Instructor Added by Admin</small>
                    </div>
                    <div className="ml-auto buttons">
                        <ul>
                            <li>
                                <button type="button" className="btn btn-light rounded-circle shadow-none">
                                    <Icon icon={view} size={20} />
                                </button>
                            </li>
                            <li>
                                {instructor.isActive ?
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
                                    onClick={() => openModal(instructor.id)}
                                >
                                    <Icon icon={bin} size={20} />
                                </button>
                            </li>
                        </ul>
                        <small className="d-none d-lg-block mt-lg-2">Instructor Added by Admin</small>
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
                    <h5 className="mb-4">Are you sure ! want to delete instructor ?</h5>
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

export default InstructorTable;