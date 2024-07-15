import React, { useState } from 'react';
import logo from '../assets/E-tutor_logo.png';
import { CgHeart } from "react-icons/cg";
import { AiOutlineBell, AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SideBar from './SideBar';
import { Avatar } from '@material-tailwind/react';
import Profile from '../assets/profile.jpg'

const UserNavbar = ({ toggleSidebar }) => {
  const { user } = useSelector((state) => state.user);
  console.log(user,'user in ');
  return (
    <div className='flex border'>

      <div className='w-1/2 flex items-center'>
       <Link to='/'>
         <img className='w-16 ps-4' src={logo} alt="" />
         </Link>
        <h1 className='text-3xl font-semibold '>E-tutor Frontend</h1>
      </div>
      <div className='w-1/2 justify-end flex items-center px-4'>
        {user ? (
          <div className='flex items-center space-x-4'>
          <AiOutlineBell className='text-2xl text-gray-600'/>
          <Link to='/userprofile'><Avatar src={user.profileImageUrl||Profile} alt="avatar" className='rounded-full w-10 h-10' /></Link>
          </div>
        ) : (

          <>
           
            <div className='flex space-x-2 ps-2'>
              <Link to='/signup'><button className="bg-orange-100 hover:bg-orange-700 text-orange-500 font-bold py-2 px-4">Create Account</button></Link>
              <Link to='/login'><button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4">LOGIN</button></Link>
            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default UserNavbar;
