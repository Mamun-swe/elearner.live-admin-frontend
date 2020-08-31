import React from 'react';
import '../styles/side-menu.scss';
import { NavLink, useHistory } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import {
    ic_dashboard,
    ic_apps,
    ic_list,
    ic_library_add,
    ic_group,
    ic_settings,
    ic_account_circle,
    ic_notifications,
    ic_power_settings_new,
    ic_code
} from 'react-icons-kit/md';
import Logo from '../assets/static/logo.png';

const SideMenu = (props) => {
    const history = useHistory();

    const notoficationsCount = "10000000";

    const logout = () => {
        localStorage.clear()
        history.push('/')
    }

    return (
        <div className="menu">
            <div className={props.show ? "side-menu open-menu shadow" : "side-menu shadow"}>
                <div className="logo-section mb-3 text-lg-center">
                    <img src={Logo} className="img-fluid" alt="..." />
                </div>


                <NavLink exact activeClassName="isActive" to="/admin/">
                    <Icon icon={ic_dashboard} size={18} />
                    <span className="ml-2">dashboard</span>
                </NavLink>

                <NavLink exact activeClassName="isActive" to="/admin/categories">
                    <Icon icon={ic_apps} size={18} />
                    <span className="ml-2">All Category</span>
                </NavLink>

                <NavLink exact activeClassName="isActive" to="/admin/all-course">
                    <Icon icon={ic_list} size={18} />
                    <span className="ml-2">All Courses</span>
                </NavLink>

                <NavLink exact activeClassName="isActive" to="/admin/course/create">
                    <Icon icon={ic_library_add} size={18} />
                    <span className="ml-2">Add New Course</span>
                </NavLink>

                <NavLink exact activeClassName="isActive" to="/admin/instructor">
                    <Icon icon={ic_group} size={18} />
                    <span className="ml-2">Instructors List</span>
                </NavLink>

                <NavLink exact activeClassName="isActive" to="/admin/learners">
                    <Icon icon={ic_group} size={18} />
                    <span className="ml-2">Learners</span>
                </NavLink>

                <NavLink exact activeClassName="isActive" to="/admin/all-admin">
                    <Icon icon={ic_group} size={18} />
                    <span className="ml-2">Admin List</span>
                </NavLink>

                <NavLink exact activeClassName="isActive" to="/admin/engineers">
                    <Icon icon={ic_code} size={18} />
                    <span className="ml-2">Engineers</span>
                </NavLink>

                <NavLink exact activeClassName="isActive" to="/admin/profile/me">
                    <Icon icon={ic_account_circle} size={18} />
                    <span className="ml-2">My Profile</span>
                </NavLink>

                <NavLink exact activeClassName="isActive" to="/admin/notifications">
                    <div className="d-flex">
                        <div>
                            <Icon icon={ic_notifications} size={18} />
                            <span className="ml-2">Notifications</span>
                        </div>
                        <div className="ml-auto">
                            {notoficationsCount.length > 3 ?
                                <span>{notoficationsCount.slice(0, 3)}+</span>
                                :
                                <span>{notoficationsCount}</span>
                            }
                        </div>
                    </div>
                </NavLink>

                <NavLink exact activeClassName="isActive" to="/admin/settings">
                    <Icon icon={ic_settings} size={18} />
                    <span className="ml-2">Website Settings</span>
                </NavLink>

                <button type="button" className="btn btn-block shadow-none rounded-0" onClick={logout}>
                    <Icon icon={ic_power_settings_new} size={18} />
                    <span className="ml-2">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default SideMenu;