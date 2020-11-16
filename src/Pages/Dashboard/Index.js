import React, {useEffect, useState} from 'react';
import "../../styles/dashboard.scss";
import axios from "axios";
import {apiURL} from "../../utils/apiUrl";

const Index = () => {
    const [numberOfAdmins, setNumberOfAdmins] = useState(0);
    const [numberOfCategories, setNumberOfCategories] = useState(0);
    const [numberOfPublishedCourses, setNumberOfPublishedCourses] = useState(0);
    const [numberOfInstructors, setNumberOfInstructors] = useState(0);
    const [numberOfLearners, setNumberOfLearners] = useState(0);

    useEffect(() => {
        // Get Dashboard Details
        const fetchDashboardDetails = async () => {
            const response = await axios.get(`${apiURL}admin/dashboard`)
            console.log(typeof (response.data.numberOfAdmins))
            setNumberOfAdmins(response.data.numberOfAdmins);
            setNumberOfCategories(response.data.numberOfCategory);
            setNumberOfPublishedCourses(response.data.numberOfCourses);
            setNumberOfInstructors(response.data.numberOfCategoryInstructors);
            setNumberOfLearners(response.data.numberOfLearners);
        }


        fetchDashboardDetails()
    }, 0)
    return (
        <div className="dashboard">
            <div className="container-fluid">
                <div className="row">


                    <div className="col-6 col-md-4 col-lg-3">
                        <div className="card border-0 shadow-sm">
                            <div className="flex-center flex-column text-center">
                                <h4>{numberOfCategories}</h4>
                                <h6>category</h6>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-4 col-lg-3">
                        <div className="card border-0 shadow-sm">
                            <div className="flex-center flex-column text-center">
                                <h4>{numberOfPublishedCourses}</h4>
                                <h6>course</h6>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-4 col-lg-3">
                        <div className="card border-0 shadow-sm">
                            <div className="flex-center flex-column text-center">
                                <h4>{numberOfInstructors}</h4>
                                <h6>instructor</h6>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-4 col-lg-3">
                        <div className="card border-0 shadow-sm">
                            <div className="flex-center flex-column text-center">
                                <h4>{numberOfLearners}</h4>
                                <h6>learner</h6>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-4 col-lg-3">
                        <div className="card border-0 shadow-sm">
                            <div className="flex-center flex-column text-center">
                                <h4>{numberOfAdmins}</h4>
                                <h6>admin</h6>
                            </div>
                        </div>
                    </div>

                    {/*  Hide Engineers Functionally */}

                    {/*<div className="col-6 col-md-4 col-lg-3">*/}
                    {/*    <div className="card border-0 shadow-sm">*/}
                    {/*        <div className="flex-center flex-column text-center">*/}
                    {/*            <h4>120</h4>*/}
                    {/*            <h6>engineer</h6>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}



                </div>
            </div>
        </div>
    );
};

export default Index;