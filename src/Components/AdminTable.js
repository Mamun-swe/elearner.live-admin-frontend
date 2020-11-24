import React from 'react';
import {Icon} from 'react-icons-kit';
import {block, pen_3} from 'react-icons-kit/ikons';
import {Link} from 'react-router-dom';

const AdminTable = ({ admins }) => {
    console.log(admins)
    return (
        <div className="data">
            <table className="table table-sm table-bordered table-responsive-sm">
                <thead>
                    <tr>
                        <td className="text-center"><p>SL</p></td>
                        <td><p>Id </p></td>
                        <td><p>Name</p></td>
                        <td><p>E-mail</p></td>
                        <td><p>Phone</p></td>
                        <td className="text-center"><p>Action</p></td>
                    </tr>
                </thead>


                <tbody>

                    {admins.length > 0 && admins.map((admin, i) =>
                        <tr key={i}>
                            <td className="text-center"><p>{i + 1}</p></td>
                            <td className="text-capitalize"><p>{admin.adminId}</p></td>
                            <td className="text-lowercase"><p>{admin.name}</p></td>
                            <td className="text-lowercase"><p>{admin.email}</p></td>
                            <td className="text-lowercase"><p>{admin.phoneNo}</p></td>

                            <td className="text-center">
                                <Link
                                    to={`/admin/${admin.id}/edit-admin`}
                                    type="button"
                                    className="btn btn-light rounded-0 m-0 shadow-none px-3"
                                >
                                    <Icon icon={pen_3} size={16} />
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-light rounded-0 m-0 shadow-none px-3"
                                >
                                    <Icon icon={block} size={16} />
                                </button>
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
        </div>
    );
};

export default AdminTable;