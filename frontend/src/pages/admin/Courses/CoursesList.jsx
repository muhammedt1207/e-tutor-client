import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses, updateCourseStatus } from '../../../redux/action/courseAction';
import Sidebar from '../../../components/admin/Sidebar';
import SearchBar from '../components/SearchBar';
import BreadCrumbs from '../components/BreadCrumbs';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const CoursesList = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.courses);
  
  const handleStatusChange = (courseId, status) => {
    console.log(courseId, status, 'ddddddddddddddddddfi');
    dispatch(updateCourseStatus({ id: courseId, action: status }));
    toast.success('Course Accepted');
    return;
  };
  
  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);
  const totalCourses = Array.isArray(data) ? data.length : 0;
  const activeCourses = Array.isArray(data) ? data.filter(course => course.status === 'accepted').length : 0;
  const pendingCourses = Array.isArray(data) ? data.filter(course => course.status === 'pending').length : 0;

  return (
    <div className='flex'>
      <Sidebar />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full p-10">
        <div className="flex justify-between items-center font-semibold">
          <div>
            <h1 className="mt-5 ml-5 font-bold text-2xl">Courses</h1>
            <BreadCrumbs list={["Dashboard", "Courses"]} />
          </div>
        </div>

        <div className='flex gap-20 justify-around pt-10'>
          <div className='w-1/3 bg-green-100 border-green-700 border rounded-md h-32 flex flex-col justify-center items-center'>
            <h1 className='text-xl font-semibold'>Total Courses</h1>
            <h1 className='text-4xl font-bold text-green-700'>{totalCourses}</h1>
          </div>
          <div className='w-1/3 bg-blue-100 border-blue-700 border rounded-md h-32 flex flex-col justify-center items-center'>
            <h1 className='text-xl font-semibold'>Active Courses</h1>
            <h1 className='text-4xl font-bold text-blue-700'>{activeCourses}</h1>
          </div>
          <div className='w-1/3 bg-orange-100 border-orange-700 border rounded-md h-32 flex flex-col justify-center items-center'>
            <h1 className='text-xl font-semibold'>Pending Courses</h1>
            <h1 className='text-4xl font-bold text-orange-700'>{pendingCourses}</h1>
          </div>
        </div>

        <div className="p-5 w-full overflow-y-auto text-sm">
          <SearchBar />
        </div>

        <table className="w-full text-sm text-left rtl:text-right rounded-md text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white rounded-3xl uppercase bg-gray-950 dark:bg-gray-700 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">Course Name</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Instructor</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.map((course) => (
              <tr key={course._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {course.title}
                </th>
                <td className="px-6 py-4">
                  {typeof course.category === 'string' ? course.category : course.category?.categoryName}
                </td>
                <td className="px-6 py-4">{course.instructorName}</td>
                <td className="px-6 py-4">${course.price}</td>
                <td className="px-6 py-4">
                  {course.status === 'pending' ? 'Pending' :
                    course.status === 'blocked' ? 'Blocked' :
                      'Accepted'}
                </td>
                <td className="px-6 py-4">
                  {course.status === 'pending' ? (
                    <div className="flex gap-2">
                      <button onClick={() => handleStatusChange(course._id, 'accept')} className="font-medium text-green-600 dark:text-green-500 hover:underline">Accept</button>
                      <button onClick={() => handleStatusChange(course._id, 'reject')} className="font-medium text-red-600 dark:text-red-500 hover:underline">Reject</button>
                      <Link to={`/admin/courseView/${course._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</Link>
                    </div>
                  ) : (
                    <Link to={`/admin/courseView/${course._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CoursesList;
