import React from 'react'
import examImg from '../../../../assets/exam.jpg'
import CertificateGenerator from '../../../../util/CertificateGenerator'
const ExamSuccess = ({percentage,userName}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
    <div className="bg-white shadow-lg rounded-lg w-3/4 flex justify-center items-center">
      <div className='w-1/2 flex flex-col justify-center items-center'>
    <img  src={examImg} alt="" />
    <h1 className='text-2xl font-bold text-orange-500 p-5'>Exam Successfully Completed</h1>
    <h2 className='text-lg font-semibold pb-2'>You Got {percentage}% mark on the exam</h2>
    {
      percentage>40 && (<CertificateGenerator userName={userName} courseName={'The Complete Digital Marketing Course'}/>)
    }
    {/* <CertificatePdf/> */}
      </div>
    </div>
    </div>
  )
}

export default ExamSuccess
