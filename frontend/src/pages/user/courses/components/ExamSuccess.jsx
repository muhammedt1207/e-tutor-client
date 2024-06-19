import React from 'react'
import examImg from '../../../../assets/exam.jpg'
const ExamSuccess = ({percentage}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
    <div className="bg-white shadow-lg rounded-lg w-3/4 flex justify-center items-center">
      <div className='w-1/2 flex flex-col justify-center items-center'>
    <img  src={examImg} alt="" />
    <h1 className='text-2xl font-bold text-orange-500 p-5'>Exam Successfully Completed</h1>
    <h2 className='text-lg font-semibold pb-2'>You Got {percentage}% mark on the exam</h2>
    <p className='font-bold'>Sertificate send to Your Email</p>
    {/* <CertificatePdf/> */}
      </div>
    </div>
    </div>
  )
}

export default ExamSuccess
