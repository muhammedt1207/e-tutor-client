import React from 'react'
import { AiFillStar } from 'react-icons/ai'

const CourseCard = () => {
  return (
    <div>
      

<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <div className='flex justify-between'>
            <button className='bg-red-100 text-red-600 rounded-md p-1' >Design</button>
            <p className='text-orange-500'>2344</p>
            </div>
           
            <h5 class="mb-2 text-2xl font-semibold tracking-tight p-2 text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
               <p className='ps-4'>by - <b>John</b></p> 
        </a>
        <div className='flex justify-between'>
            <p className='flex items-center border p-2 px-5 rounded-lg '><AiFillStar className='text-orange-500'/>4</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>

        </div>
    </div>
</div>

    </div>
  )
}

export default CourseCard
