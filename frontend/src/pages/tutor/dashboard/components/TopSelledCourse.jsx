import React from 'react'

const TopSelledCourse = ({topCourses}) => {
    console.log(topCourses,'top selled courses');
  return (
    <div className="relative overflow-x-auto border p-2 shadow-md flex-row justify-center items-center">
    <h1 className='text-lg font-bold'>Top Selled Courses</h1>
    <hr />
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    course Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Total Enrollments
                </th>
                <th scope="col" className="px-6 py-3">
                    Topic
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
            </tr>
        </thead>
        <tbody>
            {topCourses &&topCourses.map((course,index)=>(
                <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-ellipsis dark:text-white truncate w-64">
                    {course.course.title}
                </th>
                <td className="px-6 py-4">
                    {course.totalEnrollments}
                </td>
                <td className="px-6 py-4">
                    {course.course.topic}
                </td>
                <td className="px-6 py-4">
                    {course.course.amount}
                </td>
            </tr>
            ))}
            
            
        </tbody>
    </table>
</div>
  )
}

export default TopSelledCourse
