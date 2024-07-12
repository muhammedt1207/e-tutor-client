import React from 'react'
import { MdOutlineCheckCircle } from 'react-icons/md';

const CourseOverView = ({course}) => {
  return (
    <>
        <div className='flex pt-10 justify-between w-full'>
                            <div className='w-full'>
                               
                                <div className='flex flex-col w-full '>
                                    <h1 className=' text-2xl font-bold'>Course Description</h1>
                                    <p className='leading-8 pt-8 ps-5 w-full'>{course.description}</p>
                                </div>
                                <div className='flex flex-col'>
                                    <h1 className='text-2xl font-bold space-x-8 pt-2'>What you'll learn</h1>
                                    {course.teachings && course.teachings.map((topic, index) => (
                                        <p className='flex pt-5' key={index}>
                                            <MdOutlineCheckCircle className='text-2xl text-green-700' />
                                            {topic}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
    </>
  )
}

export default CourseOverView
