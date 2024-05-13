import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UserNavbar from './UserNavbar'
import SideBar from './SideBar'

const TopNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={showSidebar }>
      {/* {showSidebar && (<SideBar />)} */}
      <div className='bg-slate-700 flex space-x-5 ps-9 p-3'>
        <h1 className='text-slate-400 hover:text-slate-100'>home</h1>
        <h1 className='text-slate-400 hover:text-slate-100'>Courses</h1>
        <h1 className='text-slate-400 hover:text-slate-100'>Courses</h1>
        <Link to='/becomeInstructor' ><h1 className='text-slate-400 hover:text-slate-100'>Become an Instructor</h1></Link>
      </div>
      <UserNavbar toggleSidebar={toggleSidebar}/>
    </div>
  )
}

export default TopNavbar
