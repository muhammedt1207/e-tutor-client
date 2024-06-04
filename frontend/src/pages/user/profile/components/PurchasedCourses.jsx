import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { URL } from '../../../../Common/api'
import { Link } from 'react-router-dom'

const PurchasedCourses = ({user}) => {
  const dispatch=useDispatch()
  const [courses,setCourses]=useState([])
  useEffect(()=>{
    const fetchCourse=async()=>{
      const response = await axios.get(`${URL}/course/enrollment/${user._id}`);
      console.log(response,'purchased data');
      if(response.data){
        setCourses(response.data.data)
      }
    }
    fetchCourse()
  },[])
  console.log(courses);
  return (
    <div>
      <h1 className='text-2xl font-bold p-10'>
        Purchased Courses
      </h1>
      <div >
        <div className='flex flex-col lg:flex-row p-10 gap-5 justify-center  flex-wrap'>
        {
          courses && courses.map(course=>{
            return(
            
              
            <div class="lg:w-1/5  bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">       
              <Link to={`/course/${course.courseId._id}`}>
              <img class="rounded-t-lg" src={course.courseId.thumbnail} alt="" />
            <div class="p-5">     
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{course.courseId.title}</h5>
            
            </div>
              </Link>
          </div>
             
            )
          })
        }
        
        </div>
      </div>
    </div>
  )
}

export default PurchasedCourses
