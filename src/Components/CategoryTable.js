import React, { useState } from 'react';
import { Icon } from 'react-icons-kit';
import { pen_1, bin } from 'react-icons-kit/ikons';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

import MobileImg from '../assets/mobile.png';

const descp = "ভারত দক্ষিণ এশিয়ার একটি রাষ্ট্র। ভৌগোলিক আয়তনের বিচারে এটি দক্ষিণ এশিয়ার বৃহত্তম এবং বিশ্বের সপ্তম বৃহৎ রাষ্ট্র। অন্যদিকে জনসংখ্যার বিচারে এটি বিশ্বের দ্বিতীয় সর্বাধিক জনবহুল তথা বৃহত্তম গণত্রান্ত্রিক রাষ্ট্র। সুপ্রাচীন কাল থেকেই ভারতীয় উপমহাদেশ অর্থনৈতিক সমৃদ্ধ ও সাংস্ক্রিতিক ঐতিহ্যের জন্য সুপরিচিত। ভারত দক্ষিণ এশিয়ার একটি রাষ্ট্র। ভৌগোলিক আয়তনের বিচারে এটি দক্ষিণ এশিয়ার বৃহত্তম এবং বিশ্বের সপ্তম বৃহৎ রাষ্ট্র। অন্যদিকে জনসংখ্যার বিচারে এটি বিশ্বের দ্বিতীয় সর্বাধিক জনবহুল তথা বৃহত্তম গণত্রান্ত্রিক রাষ্ট্র। সুপ্রাচীন কাল থেকেই ভারতীয় উপমহাদেশ অর্থনৈতিক সমৃদ্ধ ও সাংস্ক্রিতিক ঐতিহ্যের জন্য সুপরিচিত।";

const CategoryTable = ({ categories }) => {
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
                                <img src={MobileImg} className="img-fluid" alt="..." />
                            </td>
                            <td><p>{category.sectionName}</p></td>
                            <td>
                                <p>
                                    {category.sectionDetails ?
                                        category.sectionDetails.slice(0, 130)+'...'
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