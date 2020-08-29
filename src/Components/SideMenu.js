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
    ic_power_settings_new
} from 'react-icons-kit/md';
import Logo from '../assets/static/logo.png';

const SideMenu = (props) => {
    const history = useHistory();

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

                <NavLink exact activeClassName="isActive" to="/admin/singer">
                    <Icon icon={ic_group} size={18} />
                    <span className="ml-2">Instructors List</span>
                </NavLink>

                <NavLink exact activeClassName="isActive" to="/admin/songs">
                    <Icon icon={ic_group} size={18} />
                    <span className="ml-2">Learners</span>
                </NavLink>

                <NavLink exact activeClassName="isActive" to="/admin/users">
                    <Icon icon={ic_group} size={18} />
                    <span className="ml-2">Admin List</span>
                </NavLink>

                <NavLink exact activeClassName="isActive" to="/admin/profile">
                    <Icon icon={ic_account_circle} size={18} />
                    <span className="ml-2">My Profile</span>
                </NavLink>

                <NavLink exact activeClassName="isActive" to="/admin/notifications">
                    <Icon icon={ic_notifications} size={18} />
                    <span className="ml-2">Notifications</span>
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