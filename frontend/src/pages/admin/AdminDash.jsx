import React from 'react'
import Sidebar from '../../components/admin/Sidebar'
import Instructors from './instructors/Instructors'
import { Outlet } from 'react-router-dom'

const AdminDash = () => {
  return (
    <div className='flex flex-row'>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default AdminDash
