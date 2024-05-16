import React from 'react'
import SideBar from './components/SideBar'
import { Outlet } from 'react-router-dom'
import AddCourse from './course/AddCourse'
import AdvanceInformation from './course/AdvanceInformation'
import AddCurriculam from './course/AddCurriculam'
import AddCourseHome from './course/AddCourseHome'

const InstructorDash = () => {
  return (
    <div className='flex flex-col '>
      <SideBar/>
      <div className=''>
        {/* <AddCurriculam/> */}
        <AddCourseHome/>
    {/* <AdvanceInformation/> */}
      {/* <AddCourse/> */}
      </div>
      {/* <Outlet/> */}
    </div>
  )
}

export default InstructorDash
