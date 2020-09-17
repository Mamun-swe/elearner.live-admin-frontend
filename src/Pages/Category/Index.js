import React, { useEffect, useState } from 'react';
import '../../styles/all-index.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { apiURL } from '../../utils/apiUrl';
import { Icon } from 'react-icons-kit';
import { ic_add } from 'react-icons-kit/md';
import CategoryTable from '../../Components/CategoryTable';
import LoadinComponent from '../../Components/Loading';

const Index = () => {
    const [categories, setCategories] = useState([])
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

        const fetchCourses = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${apiURL}sections`)
                setCategories(response.data.sections)
                setLoading(false)
            } catch (error) {
                if (error) {
                    console.log(error)
                }
            }
        }

        fetchCourses()
    }, [])

    return (
        <div className="index">
            {loading ?
                <LoadinComponent /> :

                <div className="container-fluid">
                    <div className="row">

                        <div className="col-12 px-lg-0 mb-4 mb-lg-5">
                            <div className={scrolled ? "card border-0 filter-card shadow-sm" : "card border-0 filter-card shadow-sm fixed-filter"}>
                                <div className="card-body text-right p-3">
                                    <Link
                                        to="/admin/category/create"
                                        type="button"
                                        className="btn btn-sm rounded-0 shadow-none btn-light"
                                    >
                                        <Icon icon={ic_add} size={22} />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 px-lg-0">
                            <div className="card border-0 data-card mb-4">
                                <div className="card-body">
                                    <CategoryTable categories={categories} />
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