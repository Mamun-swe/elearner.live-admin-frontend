import React, { useState } from 'react';
import { Icon } from 'react-icons-kit';
import { pen_1, bin } from 'react-icons-kit/ikons';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiURL } from '../utils/apiUrl';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({ autoClose: 2000 })
const CategoryTable = ({ categories }) => {
    const [show, setShow] = useState(false)
    const [deleteId, setDeleteId] = useState()
    const [loading, setLoading] = useState(false)

    // Header 
    const header = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }

    const openModal = id => {
        setDeleteId(id)
        setShow(true)
    }

    const submitDelete = async () => {
        try {
            setLoading(true)
            const response = await axios.delete(`${apiURL}/sections/${deleteId}`, header)
            if (response.status === 200) {
                setLoading(false)
                setShow(false)
                toast.success('Successfully Section Created')
            }
        } catch (error) {
            if (error) console.log(error)
        }
    }


    return (
        <div className="data">
            <table className="table table-sm table-responsive-sm">
                <thead>
                    <tr>
                        <td><p>SL</p></td>
                        <td><p>Image</p></td>
                        <td><p>Name</p></td>
                        <td><p>Details</p></td>
                        <td className="text-center">
                            <p>Action</p>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map((category, i) =>
                        <tr key={i}>
                            <td><p>{i + 1}</p></td>
                            <td>
                                <img src={category.imageDetails.imageUrl} className="img-fluid" alt="..." />
                            </td>
                            <td><p>{category.sectionName}</p></td>
                            <td>
                                <p>
                                    {category.sectionDetails ?
                                        category.sectionDetails.slice(0, 130) + '...'
                                        : null
                                    }
                                </p>
                            </td>
                            <td className="text-center">
                                <Link to={`/admin/category/${category.sectionId}/edit`}
                                    type="button"
                                    className="btn btn-light btn-sm shadow-none rounded-circle"
                                >
                                    <Icon icon={pen_1} size={18} />
                                </Link>

                                <button
                                    type="button"
                                    className="btn btn-light btn-sm shadow-none rounded-circle"
                                    onClick={() => openModal(category.sectionId)}
                                >
                                    <Icon icon={bin} size={18} />
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

export default CategoryTable;