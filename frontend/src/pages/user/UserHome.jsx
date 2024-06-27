import React from 'react';
import { motion } from 'framer-motion';
import imager from '../../assets/Images.png';
import CategoryCard from '../../components/CategoryCard';
import UserNavbar from '../../components/UserNavbar';
import { useSelector } from 'react-redux';
import { AiFillAccountBook, AiFillBook } from 'react-icons/ai';
import { PiBookOpenBold } from 'react-icons/pi';

const UserHome = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className='w-full'>
      <div className='flex flex-col lg:flex-row'>

        <motion.div
          className='w-1/2 flex p-36'
          initial={{ x: -1000 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className='lg:ps-28 ps-0 mr-2'>
            <h1 className='text-6xl font-medium'>Learn with expert  <br />anytime anywhere</h1>
            <p className='pt-7 text-lg py-10'>Our mission is to help people find the best courses online and learn with experts anytime, anywhere.</p>
            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">{user ? 'Courses' : 'Create Account'}</button>
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
      <div className='bg- p-20'>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-3xl font-bold'>Why You Learn With E-Tutor</h1>
          <p className='text-lg font-medium'>It is a long established fact that a reader will be distracted by the readable.</p>
        </div>
        <div data-aos='fade-up' className='flex flex-col justify-between items-center mt-20   lg:flex-row'>
          <div className='bg-white border lg:w-1/4 md:w-2/4 w-full p-8 m-10 flex flex-col justify-center items-center'>
            <PiBookOpenBold className='text-4xl m-4'/>
              <div className='flex flex-col justify-center items-center'>
                <h1 className='text-lg font-bold'>320 Online Course</h1>
                <p className='font-thin'>we are providing best courses</p>  
              </div>
          </div>
          <div className='bg-white border lg:w-1/4 md:w-2/4 w-full p-8 m-10 flex flex-col justify-center items-center'>
            <PiBookOpenBold className='text-4xl m-4'/>
              <div className='flex flex-col justify-center items-center'>
                <h1  className='text-lg font-bold'>320 Online Course</h1>
                <p className='font-thin'>we are providing best courses</p>  
              </div>
          </div>
          <div data-aos='fade-up' className='bg-white border lg:w-1/4 md:w-2/4 w-full p-8 m-10 flex flex-col justify-center items-center'>
            <PiBookOpenBold className='text-4xl m-4'/>
              <div className='flex flex-col justify-center items-center'>
                <h1 className='text-lg font-bold'>320 Online Course</h1>
                <p className='font-thin'>we are providing best courses</p>  
              </div>
          </div>
          <div className='bg-white border lg:w-1/4 md:w-2/4 w-full p-8 m-10 flex flex-col justify-center items-center'>
            <PiBookOpenBold className='text-4xl m-4'/>
              <div className='flex flex-col justify-center items-center'>
                <h1 className='text-lg font-bold'>320 Online Course</h1>
                <p className='font-thin'>we are providing best courses</p>  
              </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default UserHome;
