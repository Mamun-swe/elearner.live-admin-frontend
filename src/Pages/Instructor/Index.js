import React, { useEffect, useState } from 'react';
import '../../styles/all-index.scss';
import { apiURL } from '../../utils/apiUrl';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md';
import LoadingComponent from '../../Components/Loading';
import InstructorTable from '../../Components/InstructorTable';

const Index = () => {
    const [instructors, setInstructors] = useState([])
    const [scrolled, setScrolled] = useState(true)
    const [loading, setLoading] = useState(false)

    // Header 
    const header = {
        headers:
        {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }


    const onChangeInstructorsFilter = event => {
        const status = Boolean(event.target.value)
        console.log(status);
        const filteredInstructros = instructors.filter(instructor => instructor.isActive === status)
        console.log(filteredInstructros)
    }

    useEffect(() => {
        window.addEventListener('scroll', () => {
            let isTop = window.scrollY < 50;
            if (window.innerWidth <= 992 && isTop !== true) {
                setScrolled(false);
            } else {
                setScrolled(true);
            }
        })

        const fetchInstructors = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${apiURL}admin/instructors`, header)
                setInstructors(response.data)
                setLoading(false)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchInstructors()
    }, [])


    return (
        <div className="index">
            {loading ?
                <LoadingComponent /> :

                <div className="container-fluid">
                    <div className="row">

                        <div className="col-12 px-lg-0 mb-4 mb-lg-5">
                            <div
                                className={scrolled ? "card border-0 filter-card shadow-sm" : "card border-0 filter-card shadow-sm fixed-filter"}>
                                <div className="card-body p-3">
                                    <div className="d-flex">
                                        <div className="ml-auto pr-2">
                                            <select
                                                className="form-control shadow-none"
                                                onChange={onChangeInstructorsFilter}
                                            >
                                                <option value={false}>Pending</option>
                                                <option value={true}>Added</option>
                                            </select>
                                        </div>
                                        <div>
                                            <Link
                                                to="/admin/instructor/create"
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
                                    <InstructorTable instructors={instructors} />
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