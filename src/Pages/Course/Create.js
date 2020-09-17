import React, { useEffect, useState } from 'react';
import "../../styles/all-create.scss";
import { useForm } from "react-hook-form";
import CKEditor from "react-ckeditor-component";
import { Icon } from 'react-icons-kit';
import { ic_camera_alt } from 'react-icons-kit/md';
import { androidAdd, androidRemove } from 'react-icons-kit/ionicons/';
import axios from 'axios';
import { apiURL } from '../../utils/apiUrl';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

toast.configure({ autoClose: 2000 })
const Create = () => {
    const { register, handleSubmit, errors } = useForm();
    const [content, setContent] = useState("কি কি শিখব এই কোর্সে ?")
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewURL, setPreviewURL] = useState(null)
    const [categories, setCategories] = useState([])
    const [instructors, setInstructors] = useState([])
    const [category, setCategory] = useState()
    const [instructor, setInstructor] = useState()
    const [scheduleList, setScheduleList] = useState([{ day: "Saturday", start_time: "", end_time: "" }])
    const [catErr, setCatErr] = useState(false)
    const [instructorErr, setInstructorErr] = useState(false)
    const [scheduleErr, setScheduleErr] = useState(false)

    // 7 Days Name
    const sevenDays = [
        { name: 'Saturday' },
        { name: 'Sunday' },
        { name: 'Monday' },
        { name: 'Tuesday' },
        { name: 'Wednesday' },
        { name: 'Thursday' },
        { name: 'Friday' }
    ]

    useEffect(() => {
        // Fetch Categories
        const fetchCategories = async () => {
            const response = await axios.get(`${apiURL}sections`)
            setCategories(response.data.sections.map(opt => ({ label: opt.sectionName, value: opt.sectionId })))
        }

        // Fetch Instructors
        const fetchInstructors = async () => {
            const response = await axios.get(`${apiURL}admin/instructors`)
            setInstructors(response.data.map(opt => ({ label: opt.name + ` (${opt.phoneNo})`, value: opt.instructorId })))
        }
        fetchInstructors()
        fetchCategories()
    }, [])

    // Header 
    const header = {
        headers:
        {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }

    // Category onChange
    const onChangeCategorySelect = event => {
        setCategory(event.value)
    }

    // Instructor OnChange
    const onChangeInstructorSelect = event => {
        setInstructor(event.value)
    }

    // Remove One Schedule onChange
    const handleRemoveSchedule = index => {
        const list = [...scheduleList]
        list.splice(index, 1)
        setScheduleList(list)
    }

    // handle click event of the Add button
    const handleAddSchedule = () => {
        setScheduleList([...scheduleList, { day: "", start_time: "", end_time: "" }])
    }

    // handle dynamic course schedule onChange
    const handleScheduleInputChange = (e, index) => {
        const { name, value } = e.target
        const list = [...scheduleList]
        list[index][name] = value
        setScheduleList(list)
    }

    // Image onChange
    const imageChangeHandeller = event => {
        let file = event.target.files[0]
        if (file) {
            setSelectedFile(file)
            setPreviewURL(URL.createObjectURL(event.target.files[0]))
        }
    }

    // CK Editor onChange
    const onChangeCKEditor = (event) => {
        let newContent = event.editor.getData()
        setContent(newContent)
    }

    // Submit Course
    const onSubmit = async (data) => {
        if (!category) {
            return setCatErr(true)
        }
        if (!instructor) {
            return setInstructorErr(true)
        }
        if (
            scheduleList.length === 1 &&
            !scheduleList[0].name &&
            !scheduleList[0].start_time &&
            !scheduleList[0].end_time
        ) {
            return setScheduleErr(true)
        }

        let shedulesListArr = [];
        for (var i in scheduleList) {
            let srtData = "{\"day\":\"" + scheduleList[i].day + "\",\"start_time\":\"" + scheduleList[i].start_time + "\",\"end_time\":\"" + scheduleList[i].end_time + "\"}";
            shedulesListArr.push(srtData)
        }

        try {
            let courseRequestInString = "{\"courseSectionId\":\"" + category + "\",\"courseName\":\"" + data.courseName + "\",\"courseGoal\":\"" + content + "\",\"courseMaxNumberOfLearner\":\"" + data.courseMaxNumberOfLearner + "\",\"courseOrientationDate\":\"" + data.courseOrientationDate + "\",\"courseStartingDate\":\"" + data.courseStartingDate + "\",\"courseFinishingDate\":\"" + data.courseFinishingDate + "\",\"courseTotalDurationInDays\":\"" + data.courseTotalDurationInDays + "\",\"courseNumberOfClasses\":\"" + data.courseNumberOfClasses + "\",\"courseClassDuration\":\"" + data.courseClassDuration + "\",\"youtubeEmbeddedLink\":\"" + data.youtubeEmbeddedLink + "\",\"courseClassTimeScheduleRequests\":[" + shedulesListArr + "],\"courseInstructorId\":\"" + instructor + "\",\"coursePriceInTk\":\"" + data.coursePriceInTk + "\",\"offer\":{\"basicOfferInPercentage\":\"0\",\"specialOfferInPercentage\":\"0\",\"specialOfferReason\":\"\",\"specialOfferStatDate\":\"\",\"specialOfferEndDate\":\"\"}}";

            let formData = new FormData()
            formData.append('courseRequestInString', courseRequestInString)
            formData.append('file', selectedFile)

            const upload = await axios.post(`${apiURL}courses`, formData, header)
            if (upload.status === 200) {
                toast.success('Successfully Course Created')
            }
        } catch (error) {
            if (error) console.log(error)
        }

    }



    return (
        <div className="create">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 px-lg-0">
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body">

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row">

                                        {/* Category Choose */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {catErr ? (
                                                    <small className="text-danger">Category is required.</small>
                                                ) : <small>Select category</small>
                                                }

                                                <Select
                                                    options={categories}
                                                    onChange={onChangeCategorySelect}
                                                />
                                            </div>
                                        </div>

                                        {/* Course Name */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.courseName && errors.courseName.message ? (
                                                    <small className="text-danger">{errors.courseName && errors.courseName.message}</small>
                                                ) : <small>Course Name</small>
                                                }

                                                <input
                                                    type="text"
                                                    name="courseName"
                                                    className="form-control shadow-none"
                                                    placeholder="Course Name"
                                                    ref={register({
                                                        required: "Course Name is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Course Orientation Date */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.courseOrientationDate && errors.courseOrientationDate.message ? (
                                                    <small className="text-danger">{errors.courseOrientationDate && errors.courseOrientationDate.message}</small>
                                                ) : <small>Course Start Date</small>
                                                }

                                                <input
                                                    type="date"
                                                    name="courseOrientationDate"
                                                    className="form-control shadow-none"
                                                    ref={register({
                                                        required: "Course Orientation Date is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>


                                        {/* Course Start Date */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.courseStartingDate && errors.courseStartingDate.message ? (
                                                    <small className="text-danger">{errors.courseStartingDate && errors.courseStartingDate.message}</small>
                                                ) : <small>Course Start Date</small>
                                                }

                                                <input
                                                    type="date"
                                                    name="courseStartingDate"
                                                    className="form-control shadow-none"
                                                    ref={register({
                                                        required: "Course Start Date is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Course End Date */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.courseFinishingDate && errors.courseFinishingDate.message ? (
                                                    <small className="text-danger">{errors.courseFinishingDate && errors.courseFinishingDate.message}</small>
                                                ) : <small>Course End Date</small>
                                                }

                                                <input
                                                    type="date"
                                                    name="courseFinishingDate"
                                                    className="form-control shadow-none"
                                                    ref={register({
                                                        required: "Course End Date is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Learner Limitation */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.courseMaxNumberOfLearner && errors.courseMaxNumberOfLearner.message ? (
                                                    <small className="text-danger">{errors.courseMaxNumberOfLearner && errors.courseMaxNumberOfLearner.message}</small>
                                                ) : <small>Learner Limitation</small>
                                                }

                                                <input
                                                    type="number"
                                                    name="courseMaxNumberOfLearner"
                                                    className="form-control shadow-none"
                                                    placeholder="Max Number of Learners"
                                                    ref={register({
                                                        required: "Learner Limitation is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Course Duration */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.courseTotalDurationInDays && errors.courseTotalDurationInDays.message ? (
                                                    <small className="text-danger">{errors.courseTotalDurationInDays && errors.courseTotalDurationInDays.message}</small>
                                                ) : <small>Course Duration</small>
                                                }

                                                <input
                                                    type="text"
                                                    name="courseTotalDurationInDays"
                                                    className="form-control shadow-none"
                                                    placeholder="Course Duration in Days"
                                                    ref={register({
                                                        required: "Course Duration is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Total Class */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.courseNumberOfClasses && errors.courseNumberOfClasses.message ? (
                                                    <small className="text-danger">{errors.courseNumberOfClasses && errors.courseNumberOfClasses.message}</small>
                                                ) : <small>Total Class</small>
                                                }

                                                <input
                                                    type="number"
                                                    name="courseNumberOfClasses"
                                                    className="form-control shadow-none"
                                                    placeholder="Total Number of Classes"
                                                    ref={register({
                                                        required: "Total Class is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Class Duration */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.courseClassDuration && errors.courseClassDuration.message ? (
                                                    <small className="text-danger">{errors.courseClassDuration && errors.courseClassDuration.message}</small>
                                                ) : <small>Class Duration</small>
                                                }

                                                <input
                                                    type="text"
                                                    name="courseClassDuration"
                                                    className="form-control shadow-none"
                                                    placeholder="Course Class Duration"
                                                    ref={register({
                                                        required: "Class Duration is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Instructor */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {instructorErr ? (
                                                    <small className="text-danger">Instructor is required.</small>
                                                ) : <small>Instructor</small>
                                                }

                                                <Select
                                                    options={instructors}
                                                    onChange={onChangeInstructorSelect}
                                                />
                                            </div>
                                        </div>

                                        {/* Regular Course Price */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.coursePriceInTk && errors.coursePriceInTk.message ? (
                                                    <small className="text-danger">{errors.coursePriceInTk && errors.coursePriceInTk.message}</small>
                                                ) : <small>Regular Course Price</small>
                                                }

                                                <input
                                                    type="number"
                                                    name="coursePriceInTk"
                                                    className="form-control shadow-none"
                                                    placeholder="Regular Course Price"
                                                    ref={register({
                                                        required: "Regular Course Price is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>


                                        {/* Course Class Time Schedule */}
                                        <div className="col-12 pt-4 pb-5">
                                            {scheduleErr ?
                                                <small className="text-danger mb-2">Fill-up class schedule</small>
                                                : <small className="text-muted mb-2">Class Schedule</small>
                                            }
                                            {scheduleList.map((schedule, i) =>
                                                <div className="box mb-2" key={i}>
                                                    {/* Day */}
                                                    <div className="form-group mb-2">
                                                        <select
                                                            name="day"
                                                            className="form-control shadow-none"
                                                            onChange={e => handleScheduleInputChange(e, i)}
                                                        >
                                                            {sevenDays.map((day, i) =>
                                                                <option value={day.name} key={i}>{day.name}</option>
                                                            )}
                                                        </select>
                                                    </div>

                                                    <div className="d-sm-flex">
                                                        <div className="flex-fill">
                                                            <input
                                                                type="time"
                                                                name="start_time"
                                                                value={schedule.start_time}
                                                                className="form-control shadow-none mb-2 mb-sm-0"
                                                                onChange={e => handleScheduleInputChange(e, i)}
                                                            />
                                                        </div>
                                                        <div className="flex-fill px-sm-2">
                                                            <input
                                                                type="time"
                                                                name="end_time"
                                                                value={schedule.end_time}
                                                                className="form-control shadow-none mb-2 mb-sm-0"
                                                                onChange={e => handleScheduleInputChange(e, i)}
                                                            />
                                                        </div>
                                                        <div className="btn-box">
                                                            {scheduleList.length !== 1 &&
                                                                <button
                                                                    className="btn btn-sm py-1 btn-danger shadow-none text-white mr-2"
                                                                    onClick={() => handleRemoveSchedule(i)}
                                                                >
                                                                    <Icon icon={androidRemove} size={22} />
                                                                </button>}
                                                            {scheduleList.length - 1 === i &&
                                                                <button
                                                                    className="btn btn-sm py-1 shadow-none text-white"
                                                                    onClick={handleAddSchedule}
                                                                >
                                                                    <Icon icon={androidAdd} size={22} />
                                                                </button>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>


                                        {/* Basic About of Course */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.basic_about_of_course && errors.basic_about_of_course.message ? (
                                                    <small className="text-danger">{errors.basic_about_of_course && errors.basic_about_of_course.message}</small>
                                                ) : <small>Basic About of Course</small>
                                                }

                                                <textarea
                                                    name="basic_about_of_course"
                                                    className="form-control shadow-none"
                                                    placeholder="Basic About of Course"
                                                    rows="5"
                                                    ref={register({
                                                        required: "Basic About of Course is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Why Do this Course ? */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-3">
                                                {errors.why_do_this_course && errors.why_do_this_course.message ? (
                                                    <small className="text-danger">{errors.why_do_this_course && errors.why_do_this_course.message}</small>
                                                ) : <small>Why Do this Course ?</small>
                                                }

                                                <textarea
                                                    name="why_do_this_course"
                                                    className="form-control shadow-none"
                                                    placeholder="কেন করব এই কোর্স ?"
                                                    rows="5"
                                                    ref={register({
                                                        required: "This field is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Youtube Embaded Link */}
                                        <div className="col-12">
                                            <div className="form-group mb-3">
                                                {errors.youtubeEmbeddedLink && errors.youtubeEmbeddedLink.message ? (
                                                    <small className="text-danger">{errors.youtubeEmbeddedLink && errors.youtubeEmbeddedLink.message}</small>
                                                ) : <small>Youtube Embaded Link</small>
                                                }

                                                <input
                                                    type="text"
                                                    name="youtubeEmbeddedLink"
                                                    className="form-control shadow-none"
                                                    placeholder="Youtube Embaded Link"
                                                    ref={register({
                                                        required: "Youtube Embaded Link is Require*",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-group mb-3">
                                                <CKEditor
                                                    activeClass="p10"
                                                    content={content}
                                                    events={{
                                                        "change": onChangeCKEditor
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            {/* Image */}
                                            <div className="form-group mb-3">
                                                <div className="d-flex">
                                                    <div>
                                                        <label className="file-upload-box border">
                                                            <div className="flex-center flex-column">
                                                                <Icon icon={ic_camera_alt} size={30} />
                                                                <input type="file" onChange={imageChangeHandeller} />
                                                            </div>
                                                        </label>
                                                    </div>
                                                    {selectedFile && selectedFile.size > 50000 ? (
                                                        <div className="px-2">
                                                            <p className="text-danger mb-0">Select less than 50KB file.</p>
                                                        </div>
                                                    ) : selectedFile && selectedFile.size < 50000 && previewURL ? (
                                                        <div className="px-2">
                                                            <img src={previewURL} className="img-fluid border" alt="..." />
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-12 text-right">
                                            {selectedFile && selectedFile.size < 50000 && previewURL ?
                                                <button type="submit" className="btn shadow-none">Submit</button>
                                                : null}
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;