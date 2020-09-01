import React from 'react';
import "../../styles/dashboard.scss";

const Index = () => {
    return (
        <div className="dashboard">
            <div className="container-fluid">
                <div className="row">


                    <div className="col-6 col-md-4 col-lg-3">
                        <div className="card border-0 shadow-sm">
                            <div className="flex-center flex-column text-center">
                                <h4>120</h4>
                                <h6>category</h6>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-4 col-lg-3">
                        <div className="card border-0 shadow-sm">
                            <div className="flex-center flex-column text-center">
                                <h4>120</h4>
                                <h6>course</h6>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-4 col-lg-3">
                        <div className="card border-0 shadow-sm">
                            <div className="flex-center flex-column text-center">
                                <h4>120</h4>
                                <h6>instructor</h6>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-4 col-lg-3">
                        <div className="card border-0 shadow-sm">
                            <div className="flex-center flex-column text-center">
                                <h4>120</h4>
                                <h6>learner</h6>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-4 col-lg-3">
                        <div className="card border-0 shadow-sm">
                            <div className="flex-center flex-column text-center">
                                <h4>120</h4>
                                <h6>admin</h6>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-4 col-lg-3">
                        <div className="card border-0 shadow-sm">
                            <div className="flex-center flex-column text-center">
                                <h4>120</h4>
                                <h6>engineer</h6>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    );
};

export default Index;