import React from 'react';
import MobileImg from '../assets/mobile.png';

const CoursesTable = ({ courses }) => {
    return (
        <div className="data">

            {courses.length > 0 && courses.map((course, i) =>
                <div className="d-lg-flex border-bottom py-3" key={i}>
                    <div className="p-1">
                        <img src={MobileImg} className="img-fluid" alt="..." />
                    </div>
                    <div className="p-2">
                        <h5>Mobile app development with react native</h5>
                        <ul>
                            <li><p><span>Enrollment:</span> 100</p></li>
                            <li className="pl-lg-3"><p><span>Pre-Register:</span> 100</p></li>
                            <li className="pl-lg-3"><p><span>Instructor Name:</span> Abdullah Al Mamun</p></li>
                        </ul>
                    </div>
                    <div className="ml-lg-auto">

                    </div>
                </div>
            )}


        </div>
    );
};

export default CoursesTable;