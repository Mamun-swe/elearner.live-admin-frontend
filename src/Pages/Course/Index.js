import React, { useEffect, useState } from 'react';
import '../../styles/all-index.scss';
import { apiURL } from '../../utils/apiUrl';
import axios from 'axios';
import CourseTable from '../../Components/CoursesTable';

const Index = () => {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const fetchCourses = () => {
            axios.get(`${apiURL}users`)
                .then(res => {
                    setCourses(res.data)
                })
        }

        fetchCourses()
    }, [])

    return (
        <div className="index">
            <div className="container-fluid">
                <div className="row">

                    <div className="col-12 px-lg-0 mb-4">
                        <div className="card border-0 filter-card shadow-sm">
                            <div className="card-body"></div>
                        </div>
                    </div>

                    <div className="col-12 px-lg-0">
                        <div className="card border-0 data-card">
                            <div className="card-body">
                                <CourseTable courses={courses} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Index;