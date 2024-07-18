import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import UserNavbar from './UserNavbar';
import SideBar from './SideBar';
import CertificateGenerator from '../util/CertificateGenerator';

const TopNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
      <div className='hidden md:block'>
      <div className="bg-slate-700 flex justify-between items-center p-3 ">
        <div className="flex space-x-5 ps-9">
          <Link to='/'>
            <h1 className='text-slate-400 hover:text-slate-100'>Home</h1>
          </Link>
          <Link to='/course'>
            <h1 className='text-slate-400 hover:text-slate-100'>Courses</h1>
          </Link>
          <Link to='/teachers'>
            <h1 className='text-slate-400 hover:text-slate-100'>Instructors</h1>
          </Link>
          <Link to='/becomeInstructor'>
            <h1 className='text-slate-400 hover:text-slate-100'>Become an Instructor</h1>
          </Link>
        </div>
      </div>
      </div>
        <div className="lg:hidden md:hidden bg-slate-700 w-full">
          <button onClick={toggleSidebar} className="text-slate-400 hover:text-slate-100">
            {showSidebar ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <div className="">
          <UserNavbar toggleSidebar={toggleSidebar} />
        </div>
      {showSidebar && (
        <div className="lg:hidden bg-slate-700 p-3">
          <Link to='/' onClick={toggleSidebar}>
            <h1 className='text-slate-400 hover:text-slate-100'>Home</h1>
          </Link>
          <Link to='/course' onClick={toggleSidebar}>
            <h1 className='text-slate-400 hover:text-slate-100'>Courses</h1>
          </Link>
          <Link to='/teachers' onClick={toggleSidebar}>
            <h1 className='text-slate-400 hover:text-slate-100'>Instructors</h1>
          </Link>
          <Link to='/becomeInstructor' onClick={toggleSidebar}>
            <h1 className='text-slate-400 hover:text-slate-100'>Become an Instructor</h1>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TopNavbar;
