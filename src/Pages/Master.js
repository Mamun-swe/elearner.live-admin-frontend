import React, { useState } from 'react';
import '../styles/master.scss';
import { Icon } from 'react-icons-kit';
import { Switch, Route } from 'react-router-dom';
import { ic_close, ic_dehaze } from 'react-icons-kit/md';

import Logo from '../assets/static/logo.png';

import SideMenu from '../Components/SideMenu';
import Dashboard from '../Pages/Dashboard/Index';
import CourseIndex from '../Pages/Course/Index';
import CourseEdit from '../Pages/Course/Edit';
import CourseCreate from '../Pages/Course/Create';




const Master = () => {
    const [show, setShow] = useState(false);

    return (
        <div className="master">

            {/* Mobile Navbar */}
            <div className="custom-navbar shadow-sm d-lg-none">
                <div className="d-flex">
                    <div>
                        <img src={Logo} alt="..." />
                    </div>
                    <div className="ml-auto">
                        {show ? (
                            <button
                                type="button"
                                className="btn btn-light rounded-circle shadow-none"
                                onClick={() => setShow(false)}
                            >
                                <Icon icon={ic_close} size={24} />
                            </button>
                        ) :
                            <button
                                type="button"
                                className="btn btn-light rounded-circle shadow-none"
                                onClick={() => setShow(true)}
                            >
                                <Icon icon={ic_dehaze} size={24} />
                            </button>
                        }
                    </div>
                </div>
            </div>

            {/* Side Menu Bar */}
            <SideMenu show={show} />

            {/* Main */}
            <div className="main">
                <Switch>
                    <Route exact path="/admin/" component={Dashboard} />
                    <Route exact path="/admin/all-course" component={CourseIndex} />
                    <Route exact path="/admin/course/:id/edit" component={CourseEdit} />
                    <Route exact path="/admin/course/create" component={CourseCreate} />

                    <Route path="*">
                        <h3 className="text-center mt-5 pt-5 pt-lg-0"><b>404 Page not found</b></h3>
                    </Route>
                </Switch>
            </div>

        </div>
    );
};

export default Master;