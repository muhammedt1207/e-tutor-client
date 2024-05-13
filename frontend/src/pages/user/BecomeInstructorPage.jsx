import React, { useState } from 'react'
import TutorImg from '../../assets/tutor.png'
import UserNavbar from '../../components/UserNavbar'
import TopNavbar from '../../components/TopNavbar'
import BecomeInstructorForm from './BecomeInstructorForm'
const BecomeInstructorPage = () => {

  const [showForm,setShowForm]=useState(false)

  const handleApplyNow =()=>{
    setShowForm(true)
  }
  return (
    <div>
      <div  className='bg-slate-200 p-8'>
        <h1 className='text-center text-3xl font-medium '>
          Become instructor
        </h1>
      </div>
      {!showForm ? (
        <>
      <div className='flex'>
      <div className=' w-1/2 h-auto justify-center flex-col ps-80  pt-44'>
      <h1 className='text-5xl font-semibold pt-24'>Become an Instuctor</h1>
      
      <p className='pt-6'>Teaching is a vital and admirable career. As such, it comes with quite a bit of responsibility, both in practice and in preparation with many skills required to be a teacher. The following steps provide a general breakdown of the requirements for teachers:</p>
      <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4  rounded mt-4' onClick={handleApplyNow}>Apply Now</button>
      </div>
      <div className=' w-1/2 h-auto justify-center flex-col -z-50'> 
      
    <img className='object-fill h-75 w-' src={TutorImg} alt="" />
      </div>
      </div>
      <div className=' -mt-16 z-50 bg-slate-100 flex justify-center items-center flex-col'>
    <h1 className='text-4xl pt-20 font-semibold'>How you'll become <br /></h1>
    <h1 className='text-4xl  font-semibold'> successful instructor</h1>

      </div>
      </>
      ):(
        <BecomeInstructorForm/>
      )}
    </div>
  )
}

export default BecomeInstructorPage
