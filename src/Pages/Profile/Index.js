import React from 'react';
import "../../styles/profile.scss";
import { Icon } from 'react-icons-kit';
import { ic_person, ic_email, ic_call, ic_security } from 'react-icons-kit/md'

const Index = () => {
    return (
        <div className="profile">
            <div className="card border-0 shadow">
                <div className="card-body p-4">
                    <h5 className="text-capitalize">
                        <Icon icon={ic_person} size={27} />
                        <span className="ml-2">abdullah al mamun</span>
                    </h5>
                    <p className="text-lowercase">
                        <Icon icon={ic_email} size={22} />
                        <span className="ml-2">example@gmail.com</span>
                    </p>
                    <p>
                        <Icon icon={ic_call} size={22} />
                        <span className="ml-2">+8801xxxxxxxx</span>
                    </p>
                    <p className="text-capitalize">
                        <Icon icon={ic_security} size={22} />
                        <span className="ml-2">admin</span>
                    </p>
                    <div className="mt-3 text-right">
                        <button type="button" className="btn shadow-none text-white">Edit Profile</button>
                        <br />
                        <button type="button" className="btn shadow-none text-white mt-2">Change Password</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;