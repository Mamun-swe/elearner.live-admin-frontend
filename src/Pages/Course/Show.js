import React, {useEffect, useState} from 'react';
import '../../styles/course-show.scss';
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';
import {apiURL} from '../../utils/apiUrl';
import {Icon} from 'react-icons-kit';
import {ic_keyboard_backspace, ic_mail} from 'react-icons-kit/md';
import Collapse from 'react-bootstrap/Collapse';
import LoadingComponent from '../../Components/Loading';
import Modal from "react-bootstrap/Modal";
import {useForm} from "react-hook-form";


const Show = () => {
    const { id } = useParams()
    const history = useHistory()
    const {register, handleSubmit, errors} = useForm()
    const [loading, setLoading] = useState(false)
    const [course, setCourse] = useState({})
    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [open3, setOpen3] = useState(false)
    const [open4, setOpen4] = useState(false)
    const [open5, setOpen5] = useState(false)
    const [saturdays, setSaturdays] = useState([])
    const [sundays, setSundays] = useState([])
    const [mondays, setMondays] = useState([])
    const [tuesdays, setTuesdays] = useState([])
    const [wednesdays, setWednesdays] = useState([])
    const [thursdays, setThursdays] = useState([])
    const [fridays, setFridays] = useState([])
    const [learners, setLearners] = useState([])
    const [offer, setOffer] = useState({})
    const [showModal, setShowModal] = useState(false);
    const [requestedEmail, setRequestedEmail] = useState('');

    const openModal = email => {
        console.log(email)
        setRequestedEmail(email)
        setShowModal(true)
    }

    useEffect(() => {
        // Fetch Single Course 
        const fetchCourse = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${apiURL}courses/${id}`)
                setCourse(response.data)
                setSaturdays(response.data.courseClassTimeSchedule.saturdays)
                setSundays(response.data.courseClassTimeSchedule.sundays)
                setMondays(response.data.courseClassTimeSchedule.mondays)
                setTuesdays(response.data.courseClassTimeSchedule.tuesdays)
                setWednesdays(response.data.courseClassTimeSchedule.wednesdays)
                setThursdays(response.data.courseClassTimeSchedule.thursdays)
                setFridays(response.data.courseClassTimeSchedule.fridays)
                setLearners(response.data.registeredLearners)
                setLoading(false)
                setOffer(response.data.offer)
                // console.log(response.data.offer)
            } catch (error) {
                if (error) console.log(error)
            }
        }

        fetchCourse()
    }, [id])
    const sentEmail = () => {
        setLoading(true)
        alert(requestedEmail)
    }

    return (
        <div className="show-course">
            {loading ? <LoadingComponent /> : null}
            <div className="container">
                <div className="row">

                    <div className="col-12">
                        <div className="title-bar border-bottom pb-2 mb-3">
                            <div className="d-flex">
                                <div className="pr-2">
                                    <button
                                        type="button"
                                        className="btn rounded-circle shadow-none"
                                        onClick={() => history.goBack()}
                                    >
                                        <Icon icon={ic_keyboard_backspace} size={25} />
                                    </button>
                                </div>
                                <div>
                                    <h5 className="mb-0 mt-1">{course.courseName}</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="content">

                            <div className="embed-responsive embed-responsive-21by9 mb-4">
                                <iframe
                                    className="embed-responsive-item"
                                    src={course.youtubeEmbeddedLink}
                                    title="..."
                                    allowFullScreen></iframe>
                            </div>

                            <div className="d-md-flex p-3 shadow mb-4">
                                <div>
                                    <h5 className="mb-0">
                                        <del className="text-muted">{course.coursePriceInTk} tk</del>
                                        <span className="text-success ml-3">{course.coursePriceInTkWithOffer} tk</span>
                                    </h5>
                                    <small>*{offer.specialOfferReason}</small>
                                </div>
                            </div>

                            {/* Schedule */}
                            <div className="schedule mt-5 mb-4">
                                <div className="row">
                                    <div className="col-12 col-sm-6 col-lg-4 mb-3">
                                        <h6>Orientation Class</h6>
                                        {/* <p className="mb-0">(03.00PM - 04:00PM)</p> */}
                                        <p className="mb-0">{course.courseOrientationDate}</p>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-4 mb-3">
                                        <h6>Course start date</h6>
                                        <p className="mb-0">{course.courseStartingDate}</p>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-4 mb-3">
                                        <h6>Course end date</h6>
                                        <p className="mb-0">{course.courseFinishingDate}</p>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-4 mb-3">
                                        <h6>Total number of classes</h6>
                                        <p className="mb-0">{course.courseNumberOfClasses}</p>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-4 mb-3">
                                        <h6>Each class duration</h6>
                                        <p className="mb-0">{course.courseClassDuration}</p>
                                    </div>

                                    <div className="col-12 text-sm-right">
                                        <p className="text-success mb-0">
                                            * {course.registeredLearners ? course.registeredLearners.length : '0'} students
                                            already enrollment on this course</p>
                                    </div>
                                </div>
                            </div>


                            <p>{course.courseBasicDescription}</p>


                            {/* FAQ's */}
                            <div className="faqs mb-5">

                                {/* faq 1 */}
                                <div className="card">
                                    <div
                                        className="card-header"
                                        onClick={() => setOpen1(!open1)}
                                        aria-controls="collapse-1"
                                        aria-expanded={open1}
                                    >
                                        <h5 className="mb-0">কি কি শিখব এই কোর্সে ?</h5>
                                    </div>

                                    <Collapse in={open1}>
                                        <div className="card-body" id="collapse-1">
                                            <p>{course.courseGoal}</p>
                                        </div>
                                    </Collapse>
                                </div>

                                {/* faq 2 */}
                                <div className="card">
                                    <div
                                        className="card-header"
                                        onClick={() => setOpen2(!open2)}
                                        aria-controls="collapse-2"
                                        aria-expanded={open2}
                                    >
                                        <h5 className="mb-0">কেন করব এই কোর্স ?</h5>
                                    </div>

                                    <Collapse in={open2}>
                                        <div className="card-body" id="collapse-2">
                                            <p>{course.courseWhyDo}</p>
                                        </div>
                                    </Collapse>
                                </div>

                                {/* faq 3 */}
                                <div className="card">
                                    <div
                                        className="card-header"
                                        onClick={() => setOpen3(!open3)}
                                        aria-controls="collapse-3"
                                        aria-expanded={open3}
                                    >
                                        <h5 className="mb-0">কোর্স  ইন্সট্রাক্টর কে ?</h5>
                                    </div>

                                    <Collapse in={open3}>
                                        <div className="card-body" id="collapse-3">
                                            <h5 className="mb-0">{course.courseInstructorName}</h5>
                                            <small>{course.courseInstructorQualification}</small>
                                            <p>{course.courseInstructorPhoneNumber}</p>
                                        </div>
                                    </Collapse>
                                </div>

                                {/* faq 4 Class Schedule */}
                                <div className="card">
                                    <div
                                        className="card-header"
                                        onClick={() => setOpen4(!open4)}
                                        aria-controls="collapse-4"
                                        aria-expanded={open4}
                                    >
                                        <h5 className="mb-0">কখন ক্লাস হবে ?</h5>
                                    </div>

                                    <Collapse in={open4}>
                                        <div className="card-body" id="collapse-4">
                                            <table className="table table-sm">
                                                <thead>
                                                    <tr>
                                                        <td><p>Day</p></td>
                                                        <td><p>Start Time</p></td>
                                                        <td><p>End Time</p></td>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {saturdays &&
                                                        saturdays.length > 0 &&
                                                        saturdays.map((day, i) =>
                                                            <tr key={i}>
                                                                <td><p>Saturday</p></td>
                                                                <td><p>{day.startTime}</p></td>
                                                                <td><p>{day.endTime}</p></td>
                                                            </tr>
                                                        )}

                                                    {sundays &&
                                                        sundays.length > 0 &&
                                                        sundays.map((day, i) =>
                                                            <tr key={i}>
                                                                <td><p>Sunday</p></td>
                                                                <td><p>{day.startTime}</p></td>
                                                                <td><p>{day.endTime}</p></td>
                                                            </tr>
                                                        )}

                                                    {mondays &&
                                                        mondays.length > 0 &&
                                                        mondays.map((day, i) =>
                                                            <tr key={i}>
                                                                <td><p>Monday</p></td>
                                                                <td><p>{day.startTime}</p></td>
                                                                <td><p>{day.endTime}</p></td>
                                                            </tr>
                                                        )}

                                                    {tuesdays &&
                                                        tuesdays.length > 0 &&
                                                        tuesdays.map((day, i) =>
                                                            <tr key={i}>
                                                                <td><p>Tuesday</p></td>
                                                                <td><p>{day.startTime}</p></td>
                                                                <td><p>{day.endTime}</p></td>
                                                            </tr>
                                                        )}

                                                    {wednesdays &&
                                                        wednesdays.length > 0 &&
                                                        wednesdays.map((day, i) =>
                                                            <tr key={i}>
                                                                <td><p>Wednesday</p></td>
                                                                <td><p>{day.startTime}</p></td>
                                                                <td><p>{day.endTime}</p></td>
                                                            </tr>
                                                        )}

                                                    {thursdays &&
                                                        thursdays.length > 0 &&
                                                        thursdays.map((day, i) =>
                                                            <tr key={i}>
                                                                <td><p>Thrusday</p></td>
                                                                <td><p>{day.startTime}</p></td>
                                                                <td><p>{day.endTime}</p></td>
                                                            </tr>
                                                        )}

                                                    {fridays &&
                                                        fridays.length > 0 &&
                                                        fridays.map((day, i) =>
                                                            <tr key={i}>
                                                                <td><p>Friday</p></td>
                                                                <td><p>{day.startTime}</p></td>
                                                                <td><p>{day.endTime}</p></td>
                                                            </tr>
                                                        )}

                                                </tbody>
                                            </table>
                                        </div>
                                    </Collapse>
                                </div>

                                {/* faq 5 All Learners */}
                                <div className="card">
                                    <div
                                        className="card-header"
                                        onClick={() => setOpen5(!open5)}
                                        aria-controls="collapse-5"
                                        aria-expanded={open5}
                                    >
                                        <h5 className="mb-0">Learner's</h5>
                                    </div>

                                    <Collapse in={open5}>
                                        <div className="card-body" id="collapse-5">
                                            <table className="table table-sm">
                                                <thead>
                                                    <tr>
                                                        <td><p>Name</p></td>
                                                        <td><p>Phone</p></td>
                                                        <td><p>Paid Amount</p></td>
                                                        <td className="text-center"><p>Action</p></td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {learners.length > 0 &&
                                                        learners.map((learner, i) =>
                                                            <tr key={i}>
                                                                <td><p>{learner.learnerName}</p></td>
                                                                <td><p>{learner.learnerPhoneNO}</p></td>
                                                                <td><p>{learner.paid} tk.</p></td>
                                                                <td className="text-center">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-light btn-sm shadow-none px-2 py-1"
                                                                        onClick={() => openModal(learner.learnerEmail)}>
                                                                        <Icon icon={ic_mail} size={25} />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </Collapse>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* Email Modal */}
                    <Modal
                        show={showModal}
                        centered
                        onHide={() => setShowModal(false)}
                        className="custom-modal"
                    >
                        <Modal.Header closeButton className="border-0 pb-0">
                        </Modal.Header>
                        <Modal.Body className="pb-4 px-4">
                            <form>
                                <h5 className="mb-4">Message Box</h5>
                                <textarea
                                    name="sectionDetails"
                                    className="form-control shadow-none"
                                    rows="5"
                                    ref={register({
                                        required: "Category Details is Require*",
                                    })}
                                />
                                <div className="mt-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary shadow-none px-4 text-white"
                                        onClick={sentEmail}
                                    >
                                        {loading ? <span>Sanding...</span> : <span>Sand</span>}
                                    </button>
                                    <button type="button" className="btn btn-light shadow-none px-4 ml-2 text-dark"
                                            onClick={() => setShowModal(false)}>Close
                                    </button>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Show;