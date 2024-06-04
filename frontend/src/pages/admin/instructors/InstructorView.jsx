import React from 'react'
import SideBar from '../../../components/SideBar'
import Sidebar from '../../../components/admin/Sidebar'

const InstructorView = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <div>
        <div className='pb-20'>
          <h1 className='p-10 text-4xl font-bold'>Instructor Details</h1>
          <div className='flex space-x-10 px-10'>
            <div className=' p-4 w-3/5  border'>
                <h1 className='text-xl font-semibold'>Personal Information</h1>
                <hr />
                <div className='pt-8 flex space-x-16'>
                <h3 className='font-semibold'>Full Name</h3>
                  <h2>Muhammed T</h2>
                </div>
                <div className='pt-4 flex space-x-20'>
                  <h3 className='font-semibold'>Email ID</h3>
                  <h2>example@gmail.com</h2>
                </div>
                <div className='pt-4 flex space-x-16'>
                  <h3 className='font-semibold'>Teachings</h3>
                  <h2>web development, graphic designing</h2>
                </div>
                <div className='pt-4 flex space-x-20'>
                  <h3 className='font-semibold'>Address</h3>
                 <div>
                 <h2>Thayyullathil</h2>
                 <h2>Edacheri,Calicut</h2>
                 
                 <h2>Kerala,India</h2>
                 </div>

                </div>
                <div className='pt-4 flex space-x-14'>
                  <h3 className='font-semibold'>Description</h3>
                  <h2>As it so contrasted oh estimating instrument. Size like body someone had. Are conduct viewing boy minutes warrant the expense Tolerably behavior may admit daughters offending her ask own. Praise effect wishes change way and any wanted. Lively use looked latter regard had. Do he it part more last in</h2>
                </div>
            </div>
            <div className='w-2/5  border'>
                <div className='flex-col gap-5'>
                  <h1 className='font-bold text-lg'>Instructor ID</h1>
                  <img className='' src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="" />
                  <h1 className='font-bold text-lg pt-10'>Qualification </h1>
                  <img className='pt-2' src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" alt="" />
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstructorView
