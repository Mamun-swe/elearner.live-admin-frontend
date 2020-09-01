import React, { useState, useEffect } from 'react';
import '../../styles/all-index.scss';
import '../../styles/notification.scss';
import axios from 'axios';
import { apiURL } from '../../utils/apiUrl';
import { Link } from 'react-router-dom';

const Index = () => {
    const [requests, setRequests] = useState([])
    const [scrolled, setScrolled] = useState(true)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        window.addEventListener('scroll', () => {
            let isTop = window.scrollY < 50;
            if (window.innerWidth <= 992 && isTop !== true) {
                setScrolled(false);
            } else {
                setScrolled(true);
            }
        })

        const fetchRequests = () => {
            setLoading(true)
            axios.get(`${apiURL}users`)
                .then(res => {
                    setRequests(res.data)
                    setLoading(false)
                })
        }

        fetchRequests()
    }, [])



    return (
        <div className="index notification">
            {loading ?
                <p>Loading...</p> :

                <div className="container-fluid">
                    <div className="row">

                        <div className="col-12 px-lg-0 mb-4 mb-lg-5">
                            <div
                                className={scrolled ? "card border-0 filter-card shadow-sm" : "card border-0 filter-card shadow-sm fixed-filter"}>
                                <div className="card-body p-3">
                                    <div className="d-flex">
                                        <div className="ml-auto">
                                            <h5 className="mb-0">100 Requests Pending</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 px-lg-0 notifications">
                            <div className="card border-0 data-card mb-4">

                                {requests.length > 0 && requests.map((request, i) =>
                                    <div className="d-flex p-2 border-bottom" key={i}>
                                        <div className="text-center p-2"><p className="mb-0">{i + 1}</p></div>
                                        <div className="p-2">
                                            <p className="text-capitalize mb-0">abdullah al mamun</p>
                                            <small><span>Payment by</span> Bkash</small>
                                            <small className="ml-2"><span>Amount:</span> 400TK</small>
                                        </div>
                                        <div className="ml-auto p-2">
                                            <Link
                                                to={`/admin/notification/${request.id}/show`}
                                                type="button"
                                                className="btn btn-light shadow-none"
                                            >View</Link>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>

                    </div>
                </div>
            }
        </div>
    );
};

export default Index;