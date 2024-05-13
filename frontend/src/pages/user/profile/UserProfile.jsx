import React, { useState } from 'react'
import profile from '../../../assets/profile.jpg'
import { AiOutlineArrowRight } from 'react-icons/ai'
import ProfileSettings from './components/ProfileSettings';
import { useSelect } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const UserProfile = () => {
    const {user}=useSelector((state)=>state.user)
    const [selectedOption, setSelectedOption] = useState('dashboard');
    console.log(user,'[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]][]');
    const renderComponent = () => {
        switch (selectedOption) {
            case 'dashboard':
                return <DashboardComponent />;
            case 'courses':
                return <CoursesComponent />;
            case 'teacher':
                return <TeacherComponent />;
            case 'message':
                return <MessageComponent />;
            case 'wishlist':
                return <WishlistComponent />;
            case 'settings':
                return <SettingsComponent />;
            default:
                return null;
        }
    };
    const selected = 'border-bottom'
    return (
        <div className=''>
            <div className='bg-orange-50 w-full h-64 '>
            </div>
            <div className='bg-white z-50 relative mt-56  left-1/2 transform -translate-x-1/2 -translate-y-1/3  w-3/4 shadow-2xl'>
                <div className='flex flex-row items-center justify-between'>
                    <div className='flex flex-row items-center '>
                        <img src={user && user.profileImageUrl ?user.profileImageUrl:profile} alt="" className='rounded-full w-32 h-32 p-4  object-cover' />
                        <h1 className='text-xl font-bold '>{user && user.userName? user.userName:'user name'}</h1>
                    </div>
                    <div className='justify-end px-6'>
                      <Link to='/becomeInstructor'>  <button className="bg-orange-50 hover:bg-orange-700 text-orange-400 font-bold flex items-center py-2 px-4">
                            Become Instructor <AiOutlineArrowRight className="ml-2" />
                        </button></Link>
                    </div>
                </div>
                <hr />
                <div className="flex justify-between p-6">
                    <button className={`toggle-btn ${selectedOption === 'dashboard' ? 'border-b-4 border-orange-400' : ''}`} onClick={() => setSelectedOption('dashboard')}>Dashboard</button>
                    <button className={`toggle-btn ${selectedOption === 'courses' ? 'border-b-orange-500' : ''}`} onClick={() => setSelectedOption('courses')}>Courses</button>
                    <button className={`toggle-btn ${selectedOption === 'teacher' ? 'border-b-orange-500' : ''}`} onClick={() => setSelectedOption('teacher')}>Teacher</button>
                    <button className={`toggle-btn ${selectedOption === 'message' ? 'border-b-orange-500' : ''}`} onClick={() => setSelectedOption('message')}>Message</button>
                    <button className={`toggle-btn ${selectedOption === 'wishlist' ? 'border-b-orange-500' : ''}`} onClick={() => setSelectedOption('wishlist')}>Wishlist</button>
                    <button className={`toggle-btn ${selectedOption === 'settings' ? 'border-b-orange-500' : ''}`} onClick={() => setSelectedOption('settings')}>Settings</button>
                </div>
                <hr />
                <div>
                    <ProfileSettings/>
                </div>
            </div>
            <div className=' w-full h-screen'>

            </div>
        </div>
    )
}

export default UserProfile
