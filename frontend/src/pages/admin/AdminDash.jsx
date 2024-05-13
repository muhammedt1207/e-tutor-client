import React from 'react'
import Sidebar from '../../components/admin/Sidebar'
import Instructors from './instructors/Instructors'

const AdminDash = () => {
  return (
    <div className='flex flex-row'>
        <Sidebar/>
        <Instructors/>
    </div>
  )
}

export default AdminDash
