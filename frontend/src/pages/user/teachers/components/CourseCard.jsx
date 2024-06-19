import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
    const navigate = useNavigate();
console.log(course.course);
    const handleReadMore = () => {
        navigate(`/course/${course.id}`);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden m-4">
            <img src={course.course.thumbnail} alt={course.course.title} className="w-full h-32 sm:h-48 object-cover" />
            <div className="p-4">
                <span className={`text-xs inline-block py-1 px-2 uppercase rounded-full ${course.level === 'Beginner' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'} last:mr-0 mr-1`}>
                    {course.course.topic}
                </span>
                <h2 className="text-lg font-semibold mt-2">{course.course.title}</h2>
                <div className="mt-2">
                    <span className="text-orange-500 text-sm float-right">${course.course.amount ||2500}</span>
                </div>
                
               
            </div>
            <div className="p-4">
                <button onClick={handleReadMore} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-500 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    View Details
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CourseCard;
