import React, { useState, useEffect } from 'react';
import '../../styles/notification.scss';
import { Icon } from 'react-icons-kit';
import { Link, useParams } from 'react-router-dom';
import { ic_keyboard_arrow_left } from 'react-icons-kit/md';
import axios from 'axios';
import { apiURL } from '../../utils/apiUrl';

const Show = () => {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)

    const { id } = useParams()

    useEffect(() => {
        const fetchCourse = () => {
            setLoading(true)
            axios.get(`${apiURL}posts?userId=${id}`)
                .then(res => {
                    setCourses(res.data)
                    setLoading(false)
                })
        }
        fetchCourse()
    }, [id])

    return (
        <div className="show">
            {loading ?
                <p>Loading...</p> :

                <div className="container-fluid">
                    <div className="row">

                        <div className="col-12 px-lg-0 mb-4">
                            <div
                                className="card border-0 shadow-sm">
                                <div className="card-body p-3">
                                    <div className="d-flex">
                                        <div className="ml-auto">
                                            <Link
                                                to="/admin/notifications"
                                                type="button"
                                                className="btn btn-sm rounded-0 shadow-none btn-light"
                                            >
                                                <Icon icon={ic_keyboard_arrow_left} size={22} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 px-lg-0 mb-4">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <h5 className="text-capitalize">moniruzzaman roni</h5>
                                    <p><span>Payment Method:</span> Bkash</p>
                                    <p><span>Sender Number:</span> 01721988188</p>
                                    <p><span>Transaction ID:</span> 01721988188</p>
                                    <p><span>Amount:</span> 4000 TK</p>
                                    <h6>Request Courses</h6>

                                    <table className="table table-sm table-responsive-sm table-bordered mb-2">
                                        <thead>
                                            <tr>
                                                <td className="text-center"><p>SL</p></td>
                                                <td><p>Course Title</p></td>
                                                <td className="text-center"><p>Amount</p></td>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {courses.length > 0 && courses.map((course, i) =>
                                                <tr key={i}>
                                                    <td className="text-center"><p>{i + 1}</p></td>
                                                    <td><p>{course.title}</p></td>
                                                    <td className="text-center"><p>{course.id + 10} tk</p></td>
                                                </tr>
                                            )}

                                        </tbody>
                                    </table>

                                    <div className="text-right total-count pr-2 pt-2">
                                        <h5>Total: {courses.reduce((totalAmount, course) => totalAmount + course.id + 10, 0)} tk</h5>
                                        <button type="button" className="btn shadow-none text-white">Approve</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Show;