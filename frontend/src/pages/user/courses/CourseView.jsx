import { TicketIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { MdOutlineCheckCircle } from 'react-icons/md';
import {FaCheck} from 'react-icons/fa'
import LessonList from './components/LessonList';
const CourseView = () => {
    return (
        <div className=''>
            <div className='w-full flex flex-col items-center justify-center'>
                <div className='w-4/6 flex flex-col '>
                    <video class=" rounded-md mt-10 " autoplay muted controls>
                        <source src="/docs/videos/flowbite.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className='flex pt-10 justify-between  w-4/6'>
                    <div className='w-4/6'>
                        <h1 className='text-4xl font-bold'>The Complete Digital Marketing COurse 12 courses in 1</h1>
                        <p className='flex items-center mt-4 '> <AiFillStar className='text-orange-500  text-2xl' /> 4.5</p>
                        <div className='flex items-center mt-8'>
                            <img className='rounded-full  w-14  ' src="https://statusneo.com/wp-content/uploads/2023/02/MicrosoftTeams-image551ad57e01403f080a9df51975ac40b6efba82553c323a742b42b1c71c1e45f1.jpg" alt="" />
                            <h1 className='ps-4 text-xl font-semibold'>John carter</h1>
                        </div>
                        <div className='flex flex-col  '>
                            <h1 className='pt-10 text-2xl font-bold'>Course Description</h1>
                            <p className='leading-8 pt-8 p-5'>If you wish to find out the skills that should be covered in a basic digital marketing course syllabus in India or anywhere around the world, then reading this blog will help. Before we delve into the advanced digital marketing course syllabus, let’s look at the scope of digital marketing and what the future holds.

                                We focus a great deal on the understanding of behavioral psychology and influence triggers which are crucial for becoming a well rounded Digital Marketer. We understand that theory is important to build a solid foundation, we understand that theory alone isn’t going to get the job done so that’s why this course is packed with practical hands-on examples that you can follow step by step.</p>
                        </div>
                        <div className='flex flex-col'>
                            <h1 className='text-2xl font-bold space-x-8'>What you'll learn</h1>
                             <p className=' flex  pt-5'>< MdOutlineCheckCircle className='text-2xl text-green-700'/>Digital marketing course introduction</p>
                             <p className='flex pt-5'>< MdOutlineCheckCircle className='text-2xl text-green-700'/>Customer Life cycle</p>
                             <p className='flex pt-5'>< MdOutlineCheckCircle className='text-2xl text-green-700'/>What is Search engine optimization(SEO)</p>
                             <p className='flex pt-5'>< MdOutlineCheckCircle className='text-2xl text-green-700'/>Facebook ADS</p>
                             <p className='flex pt-5'>< MdOutlineCheckCircle className='text-2xl text-green-700'/>Facebook Messenger Chatbot</p>
                             <p className='flex pt-5'>< MdOutlineCheckCircle className='text-2xl text-green-700'/>Search engine optimization tools</p>
                        </div>
                    </div>
                    <div>
                        <LessonList/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseView















































{/* <div className='w-full h-auto bg-slate-200 px-20'>
                <div className='flex '>
                    <span className='bg-slate-400  text-white p-2 rounded-lg'>PhotoGraphy</span>
                    <p className='text-white'>by <b>John kapre</b></p>
                </div>
                <div className='flex justify-between px-20'>
                    <h1 className='text-3xl font-semibold p-10'>The Ultimate Guide to the best WordPress LMS Plugin</h1>


                    <div class="max-w-sm bg-white rounded-lg border border-gray-200  absolute right-32 shadow dark:bg-gray-800 dark:border-gray-700 w-5/6">
                        <a href="#">
                            <img class="rounded-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
                        </a>
                        <div class="p-5">
                            <a href="#">

                            </a>
                            <div className='flex justify-between'>
                                <p className='flex items-center border p-2 px-5 rounded-lg '><AiFillStar className='text-orange-500' />4</p>
                                <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Purchase
                                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
                 <video class="w-3/6" autoplay muted controls>
                    <source src="/docs/videos/flowbite.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video> 

            </div> */}