import React from 'react';
import { motion } from 'framer-motion';
import imager from '../../assets/Images.png';
import CategoryCard from '../../components/CategoryCard';
import UserNavbar from '../../components/UserNavbar';
import { useSelector } from 'react-redux';

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
            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">{user?'Courses':'Create Account'}</button>
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
    </div>
  );
}

export default UserHome;
