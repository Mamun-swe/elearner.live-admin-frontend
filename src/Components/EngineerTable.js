import React, { useState } from 'react';
import { Icon } from 'react-icons-kit';
import { pen_3, basket } from 'react-icons-kit/ikons';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

import EngineerImg from '../assets/me.jpg';

const EngineerTable = ({ engineers }) => {
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
            <table className="table table-sm table-bordered table-responsive-sm">
                <thead>
                    <tr>
                        <td className="text-center"><p>SL</p></td>
                        <td className="text-center"><p>Image</p></td>
                        <td><p>Name</p></td>
                        <td><p>Position</p></td>
                        <td className="text-center"><p>Action</p></td>
                    </tr>
                </thead>


                <tbody>

                    {engineers.length > 0 && engineers.map((engineer, i) =>
                        <tr key={i}>
                            <td className="text-center"><p>{i + 1}</p></td>
                            <td className="text-center">
                                <div className="image-frame rounded-circle m-auto">
                                    <img src={EngineerImg} className="img-fluid" alt="..." />
                                </div>
                            </td>
                            <td className="text-capitalize"><p>{engineer.name}</p></td>
                            <td className="text-capitalize"><p>Front-end Engineer</p></td>
                            <td className="text-center">
                                <Link
                                    to={`/admin/engineer/${engineer.id}/edit`}
                                    type="button"
                                    className="btn btn-light rounded-0 m-0 shadow-none px-3"
                                >
                                    <Icon icon={pen_3} size={16} />
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-light rounded-0 m-0 shadow-none px-3"
                                    onClick={() => openModal(engineer.id)}
                                >
                                    <Icon icon={basket} size={16} />
                                </button>
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>

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
                    <h5 className="mb-4">Are you sure ! want to delete engineer ?</h5>
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

export default EngineerTable;