import React, { useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { MdOutlineCheckCircle } from 'react-icons/md'
import LessonList from '../../user/courses/components/LessonList'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getCourse } from '../../../redux/action/courseAction'

const CourseDetailPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [course, setCourse] = useState([])
    const [video, setVideo] = useState('')




    useEffect(() => {
        try {
            const result = dispatch(getCourse(id))
                .then((result) => {
                    console.log(result.payload.data);
                    setCourse(result.payload.data)
                    console.log(result.payload.data.trailer);
                    setVideo(result.payload.data.trailer)
                })
        } catch (error) {

        }
    }, [])

    return (
        <div>
            <div className='w-full flex flex-col items-center justify-center'>
                <div className='w-4/6 flex flex-col '>
                    <video src={video} class=" rounded-md mt-10 " autoplay muted controls>
                        {/* <source src={video} type="video/mp4" /> */}
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className='flex pt-10 justify-between  w-4/6'>
                    <div className='w-4/6'>
                        <h1 className='text-4xl font-bold'>{course.title}</h1>
                        <div className='flex items-center mt-8'>
                            <img className='rounded-full  w-14  ' src="https://statusneo.com/wp-content/uploads/2023/02/MicrosoftTeams-image551ad57e01403f080a9df51975ac40b6efba82553c323a742b42b1c71c1e45f1.jpg" alt="" />
                            <h1 className='ps-4 text-xl font-semibold'>{course.instructorName}</h1>
                        </div>
                        <div className='flex flex-col  '>
                            <h1 className='pt-10 text-2xl font-bold'>Course Description</h1>
                            <p className='leading-8 pt-8 p-5'>{course.description}</p>
                        </div>
                        <div className='flex flex-col'>
                            <h1 className='text-2xl font-bold space-x-8'>What you'll learn</h1>
                            {course && course.teachings && course.teachings.map((topic, index) => (
                                <p className='flex pt-5' key={index}>
                                    <MdOutlineCheckCircle className='text-2xl text-green-700' />
                                    {topic}
                                </p>
                            ))}



                        </div>
                    </div>
                    <div className='w-80'>
                        {course.lessons?(
                             <LessonList lessons={course.lessons} onSubLessonClick={(videoUrl) => setVideo(videoUrl)}/>
                        ):(<p>nothing</p>)}
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetailPage
