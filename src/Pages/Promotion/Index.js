import React, { useState } from 'react';
import "../../styles/promotion.scss";

const Index = () => {
    const [loading, setLoading] = useState(false)


    return (
        <div className="promotion">
            {loading ?
                <p>Loading...</p> :
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 px-lg-0 mb-4">
                            <div className="card border-0 shadow-sm">
                                <div className="card-header">
                                    <h5 className="mb-0">Email:</h5>
                                </div>
                                <div className="card-body">

                                    {/* Options */}
                                    <div className="d-lg-flex mb-3">
                                        <div><h6 className="mb-0">To</h6></div>
                                        <div className="ml-lg-auto mt-3 mt-lg-0">
                                            <label>
                                                <input
                                                    name="regStudents"
                                                    type="checkbox"
                                                // checked={this.state.isGoing}
                                                // onChange={this.handleInputChange}
                                                />
                                                <span className="ml-2">All Registered students</span>
                                            </label>
                                        </div>
                                        <div className="ml-lg-3">
                                            <label>
                                                <input
                                                    name="enrolmentStudents"
                                                    type="checkbox"
                                                // checked={this.state.isGoing}
                                                // onChange={this.handleInputChange}
                                                />
                                                <span className="ml-2">All Enrollmented students</span>
                                            </label>
                                        </div>
                                        <div className="ml-lg-3">
                                            <label>
                                                <input
                                                    name="instructors"
                                                    type="checkbox"
                                                // checked={this.state.isGoing}
                                                // onChange={this.handleInputChange}
                                                />
                                                <span className="ml-2">All Instructors</span>
                                            </label>
                                        </div>
                                    </div>

                                    <form>
                                        {/* From mail */}
                                        <div className="form-group mb-4">
                                            <input
                                                type="text"
                                                className="form-control shadow-none"
                                            />
                                        </div>

                                        {/* Subject */}
                                        <div className="form-group mb-4">
                                            <input
                                                type="text"
                                                className="form-control shadow-none"
                                                placeholder="Subject"
                                            />
                                        </div>

                                        {/* Body */}
                                        <div className="form-group mb-4">
                                            <textarea
                                                type="text"
                                                className="form-control shadow-none"
                                                placeholder="Mail Body"
                                                rows="10"
                                            />
                                        </div>

                                        <div className="text-right">
                                            <button type="submit" className="btn shadow-none text-white">
                                                <span>Send</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Index;