import React, { useEffect, useState } from 'react';
import '../../styles/all-index.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md';
import { apiURL } from '../../utils/apiUrl';

import AdminTable from '../../Components/AdminTable';

const Index = () => {
    const [admins, setAdmins] = useState([])
    const [scrolled, setScrolled] = useState(true);


    useEffect(() => {
        window.addEventListener('scroll', () => {
            let isTop = window.scrollY < 50;
            if (window.innerWidth <= 992 && isTop !== true) {
                setScrolled(false);
            } else {
                setScrolled(true);
            }
        })

        const fetchAdmins = () => {
            axios.get(`${apiURL}users`)
                .then(res => {
                    setAdmins(res.data)
                })
        }

        fetchAdmins()
    }, [])


    return (
        <div className="index">
            <div className="container-fluid">
                <div className="row">

                    <div className="col-12 px-lg-0 mb-4 mb-lg-5">
                        <div
                            className={scrolled ? "card border-0 filter-card shadow-sm" : "card border-0 filter-card shadow-sm fixed-filter"}>
                            <div className="card-body p-3">
                                <div className="d-flex">
                                    <div className="ml-auto">
                                        <Link
                                            to="/admin/create-admin"
                                            type="button"
                                            className="btn rounded-0 shadow-none btn-light"
                                        >
                                            <Icon icon={ic_add} size={22} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 px-lg-0">
                        <div className="card border-0 data-card mb-4">
                            <div className="card-body">
                                <AdminTable admins={admins} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Index;