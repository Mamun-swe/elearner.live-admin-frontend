import React from 'react';
import {Icon} from 'react-icons-kit';
import {circle_ok, circle_pause} from 'react-icons-kit/ikons';

const learnersTable = ({ learners }) => {
    return (
        <div className="data">
            <table className="table table-sm table-bordered table-responsive-sm">
                <thead>
                    <tr>
                        <td><p>Learner Id</p></td>
                        <td><p>Name</p></td>
                        <td><p>E-mail</p></td>
                        <td><p>Phone</p></td>
                        <td><p>Course & Status</p></td>
                        <td className="text-center"><p>Block</p></td>

                    </tr>
                </thead>


                <tbody>

                    {learners.length > 0 && learners.map((learner, i) =>
                        <tr key={i}>
                            <td><p>{learner.learnerId}</p></td>
                            <td className="text-capitalize"><p>{learner.name}</p></td>
                            <td className="text-lowercase"><p>{learner.email}</p></td>
                            <td className="text-lowercase"><p>{learner.phoneNo}</p></td>
                            <td>
                                {learner.registeredCourseResponses.length > 0 && learner.registeredCourseResponses.map((mycourses, i) =>
                                    <tr>
                                        <td className="border-0 border-t p-1">{mycourses.courseName}</td>
                                        <p> {mycourses.paymentVerified} </p>
                                        <td className="p-1">{mycourses.paymentVerified ? <div>
                                                <p>Status: <strong>Running</strong></p>
                                                <p>Paid Amount: {mycourses.paid}</p>
                                                <p>Paid Time & Date: {mycourses.paymentDateAndTime}</p>
                                                <p>Payment Method: {mycourses.paymentMethod}</p>
                                                <p>TrxId: {mycourses.paymentTrxId}</p>
                                                <p>Payment Approve Date & Time: {mycourses.paymentVerifyDateAndTime}</p>
                                            </div> :
                                            <p>Pre-Registration Only</p>
                                        }</td>

                                    </tr>
                                )}

                            </td>
                            <td className="text-center">
                                {learner.id % 2 === 0 ?
                                    <Icon icon={circle_ok} size={22} className="text-success" /> :
                                    <Icon icon={circle_pause} size={22} className="text-danger" />
                                }
                            </td>

                        </tr>
                    )}

                </tbody>
            </table>
        </div>
    );
};

export default learnersTable;