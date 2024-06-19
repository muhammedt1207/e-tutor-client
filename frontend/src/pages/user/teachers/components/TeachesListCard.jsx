import React from 'react'
import { PiStudent } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'

const TeachesListCard = ({teacher}) => {
    const navigate=useNavigate()

    const handleViewMore=async()=>{
        console.log(teacher);
    navigate(`/teacherView/${teacher._id}`)    
    }

  return (
    <div className="max-w-sm bg-white border w-full mt-5 m-5 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
    <a href="#">
        <img className="rounded-md w-full h-60 object-cover" src={teacher.profileImageUrl||'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6LXNJFTmLzCoExghcATlCWG85kI8dsnhJng&s'} alt="" />
    </a>
    <div className="p-5">
        <a href="#">
            <div className='flex justify-between'>
                <button className='bg-red-100 text-red-600 rounded-md p-1'>Programming</button>
                {/* <p className='text-orange-500'></p> */}
            </div>
            <h5 className="mb-2 text-xl font-semibold tracking-tight p-2 text-gray-900 dark:text-white">{teacher.userName}</h5>
            {/* <p className='ps-4'>by - <b>{course.instructorName}</b></p> */}
        </a>
        <div className='flex justify-between'>
            <p className='flex items-center  p-2 px-5 rounded-lg'><PiStudent className='text-lg font-bold'/> 23 enrollments </p>
            <button onClick={handleViewMore} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-500 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                view Details
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </button>
        </div>
    </div>
</div>
  )
}

export default TeachesListCard
