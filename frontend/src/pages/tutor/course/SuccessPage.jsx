import React from 'react'
import { useSpring, animated } from 'react-spring';
import SideBar from '../components/SideBar';
import successImg from '../../../assets/success.jpg'
const SuccessPage = () => {

    return (
        <>
            <SideBar />
            <div className='flex justify-center items-center lg:ml-46 ml-52 p-16 pe-10 '>
                <div className=' h-1/2 ps-10 pe-10 flex  items-center justify-center '>
                    <div className='w-3/6 flex flex-col items-center justify-center '>
                  <img className='w-4/6' src={successImg} alt="" />
                  <h1 className="text-4xl font-bold text-green-600 mb-4">Congratulations!</h1>
                  <p className=' text-gray-600'>Your course has been added successfully. Our team will verify it shortly.</p>
                  <button className="px-4 py-2 mt-5 bg-green-500 text-white rounded">Go to Dashboard</button>

                </div>
                </div>
            </div>

        </>
    )
}

export default SuccessPage
