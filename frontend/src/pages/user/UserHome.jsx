import React from 'react';
import { motion } from 'framer-motion';
import imager from '../../assets/Images.png';
import CategoryCard from '../../components/CategoryCard';
import { useSelector } from 'react-redux';
import { PiBookOpenBold } from 'react-icons/pi';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid';
import { BsFillLaptopFill } from 'react-icons/bs';
import { MdOutlineSupport } from 'react-icons/md';
import mentor from '../../assets/mentorship.png'
const UserHome = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className='w-full'>
      <div className='flex flex-col lg:flex-row'>

        <motion.div
          className='md:w-1/2 flex md:p-36 '
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className='lg:ps-28 ps-0 mr-2 px-5 flex-row justify-center'>
         
            <h1 className='md:text-5xl text-4xl pl-16 pt-10 md:pl-0 md:pt-0 font-medium '>Learn with expert  <br />anytime anywhere</h1>
            
            <p className='md:pt-7 text-lg py-10  pl-16 pt-10 md:pl-0 '>Our mission is to help people find the best courses online and learn with experts anytime, anywhere.</p>
            <button className="bg-orange-500 hover:bg-orange-700 ml-16 my-10 md:ml-0 text-white font-bold py-2 px-4 rounded">{user ? 'Courses' : 'Create Account'}</button>
          </div>
        </motion.div>

        <motion.div
          className='lg:w-1/2 w-full hidden lg:block'
          initial={{ x: 1000 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <img src={imager} className='object-fill w-full h-full lg:object-contain' alt="" />
        </motion.div>
      </div>
      <div className='flex flex-col gap-4 pt-16 items-center justify-center bg-zinc-100'>
        <h1 className='text-3xl font-medium'>Browse top categories</h1>
        <CategoryCard />
      </div>
      <div className='p-10 md:p-20'>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-3xl font-bold'>Why You Learn With <span className='text-orange-400'>E-Tutor</span></h1>
          <p className='text-lg font-medium'>It is a long established fact that a reader will be distracted by the readable.</p>
        </div>
        <div 
          className='flex flex-col justify-between items-center mt-20 lg:flex-row'
        >
          <motion.div 
            className='bg-white border lg:w-1/4 md:w-2/4 w-full p-8 m-10 flex flex-col hover:z-30 hover:shadow-xl h-48 justify-center items-center transition-all duration-700 group'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, transition: { duration: 0.5 } }}
          >
            <PiBookOpenBold className='text-4xl m-4 group-hover:text-orange-400' />
            <div className='flex flex-col justify-center items-center'>
              <h1 className='text-lg font-bold'>320 Online Course</h1>
              <p className='font-thin'>we are providing best courses</p>
            </div>
          </motion.div>
          <motion.div 
            className='bg-white border lg:w-1/4 md:w-2/4 w-full p-8 m-10 flex flex-col hover:z-30 hover:shadow-xl h-48 justify-center items-center transition-all duration-300 group'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, transition: { duration: 0.5 } }}
          >
            <BsFillLaptopFill className='text-3xl m-4 group-hover:text-orange-400' />
            <div className='flex flex-col justify-center items-center'>
              <h1 className='text-lg font-bold'>Virtual Internship</h1>
              <p className='font-thin'>After Completing the Course, you will get </p>
            </div>
          </motion.div>
          <motion.div 
            className='bg-white border lg:w-1/4 md:w-2/4 w-full p-8 m-10 flex flex-col hover:z-30 hover:shadow-xl h-48 justify-center items-center transition-all duration-300 group'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, transition: { duration: 0.5 } }}
          >
            <ChatBubbleBottomCenterTextIcon className='w-10 m-4 group-hover:text-orange-400' />
            <div className='flex flex-col justify-center items-center'>
              <h1 className='text-lg font-bold'>One To One Chat</h1>
              <p className='font-thin'>You can chat with instructor</p>
            </div>
          </motion.div>
          <motion.div 
            className='bg-white border lg:w-1/4 md:w-2/4 w-full p-8 m-10 flex flex-col hover:z-30 hover:shadow-xl h-48 justify-center items-center transition-all duration-300 group'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, transition: { duration: 1} }}
          >
            <MdOutlineSupport className="text-4xl m-4 text-gray-600 group-hover:text-orange-400 transition-all duration-300" />
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-lg font-bold">Lifetime support</h1>
              <p className="font-thin">You can get lifetime support</p>
            </div>
          </motion.div>
        </div>
      </div>
      <div className='flex mt-10  justify-center flex-col lg:flex-row md:flex-row p-4'>
        <div className='lg:w-1/2 w-full flex justify-center '>
          <img src={mentor} alt="" className='w-1/2' />
        </div>
        <div className='md:w-1/2 flex justify-center md:items-center'>
          <div className='mt-8 w-full text-ce'>
            <h1 className='text-4xl font-bold md:w-1/2 '>Choose Your's Suitable Personal MentorShip</h1>
            <p className='md:w-1/2 pt-6 font-normal'>You can Take MentorShip Suitable for you, You can chat with him and clear personal doubts. That You want to take member ship for that Instroctor. Only 129 ruppee for Month</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
