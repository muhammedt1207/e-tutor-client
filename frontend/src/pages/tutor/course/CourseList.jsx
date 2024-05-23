import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/admin/Sidebar'
import BreadCrumbs from '../../admin/components/BreadCrumbs'
import SearchBar from '../../admin/components/SearchBar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { URL } from '../../../Common/api'
import { useSelector } from 'react-redux'
import SideBar from '../components/SideBar'

const CourseList = () => {
    const {user}=useSelector((state)=>state.user)
    const [courses,setCourses]=useState([])
    useEffect(()=>{
        const fetchCourse=async()=>{
        const result=await axios.get(`${URL}/course/course/instructor/${user.email}`)
        console.log(result.data.data);
        setCourses(result.data.data)
        }
        fetchCourse()
    },[])
  return (
    <div className='flex '>
    <SideBar />

    <div className=" shadow-md sm:rounded-lg   flex flex-col  w-full lg:ml-44 ml-52 px-16 pe-10">
      <div className="flex justify-between items-center font-semibold">
        <div>
          <h1 className="mt-5 ml-5 font-bold text-2xl">Courses</h1>
          <BreadCrumbs list={["Dashboard", "Courses"]} />
        </div>
        <div>
            <Link to='/instructor/addCourse'><button className='py-4 px-8 bg-orange-500 text-white rounded-md'>Add Course</button></Link> 
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
            
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {courses?.map((course) => (
            <tr key={course._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {course.title}
              </th>
              <td className="px-6 py-4">
                {typeof course.category === 'string' ? course.category.categoryName : course.category?.categoryName}
              </td>
              <td className="px-6 py-4">${course.price}</td>
              <td className="px-6 py-4">
                {course.status === 'pending' ? 'Pending' :
                  course.status === 'blocked' ? 'Blocked' :
                    'Accepted'}
              </td>
              <td className="px-6 py-4">
              <Link to={`/instructor/addCourse?courseId=${course._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default CourseList
