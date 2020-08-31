import React from 'react';
import { Icon } from 'react-icons-kit';
import { circle_ok, circle_pause } from 'react-icons-kit/ikons';

const learnersTable = ({ learners }) => {
    return (
        <div className="data">
            <table className="table table-sm table-bordered table-responsive-sm">
                <thead>
                    <tr>
                        <td><p>SL</p></td>
                        <td><p>Name</p></td>
                        <td><p>E-mail</p></td>
                        <td><p>Phone</p></td>
                        <td><p>Course</p></td>
                        <td className="text-center"><p>Payment</p></td>
                    </tr>
                </thead>


                <tbody>

                    {learners.length > 0 && learners.map((learner, i) =>
                        <tr key={i}>
                            <td><p>{i + 1}</p></td>
                            <td className="text-capitalize"><p>{learner.name}</p></td>
                            <td className="text-lowercase"><p>{learner.email}</p></td>
                            <td className="text-lowercase"><p>{learner.phone}</p></td>
                            <td>
                                <ol className="pl-4 mb-0">
                                    <li className="mb-2"><p>web development with react</p></li>
                                    <li className="mb-2"><p>web development with react</p></li>
                                </ol>
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