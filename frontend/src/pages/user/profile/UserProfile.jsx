import React, { useState } from 'react';
import profile from '../../../assets/profile.jpg';
import { AiOutlineArrowRight } from 'react-icons/ai';
import ProfileSettings from './components/ProfileSettings';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PurchasedCourses from './components/PurchasedCourses';
import TeacherComponent from './TeacherComponent';
import SubscriptionDetails from './SubscriptionDetails';

// Dummy components for demonstration purposes
const DashboardComponent = () => <div>Dashboard Content</div>;
const CoursesComponent = () => <div>Courses Content</div>;
const MessageComponent = () => <div>Message Content</div>;
const WishlistComponent = () => <div>Wishlist Content</div>;
const SettingsComponent = () => <div>Settings Content</div>;

const UserProfile = () => {
    const { user } = useSelector((state) => state.user);
    const [selectedOption, setSelectedOption] = useState('dashboard');

    const renderComponent = () => {
        switch (selectedOption) {
            case 'dashboard':
                return <ProfileSettings />;
            case 'courses':
                return <PurchasedCourses user={user}/>;
            case 'teacher':
                return <TeacherComponent />;
            case 'MemberShip':
                return <SubscriptionDetails />;
            case 'wishlist':
                return <WishlistComponent />;
            case 'settings':
                return <SettingsComponent />;
            default:
                return null;
        }
    };

    return (
        <div className=''>
            <div className='bg-orange-50 w-full h-60 '></div>
            <div className='bg-white z-50 relative  h-[200px] -mt-8  left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 border-r shadow-2xl shadow-lg  border-l'>
                <div className='flex flex-row items-center justify-between'>
                    <div className='flex flex-row items-center '>
                        <img
                            src={user && user.profileImageUrl ? user.profileImageUrl : profile}
                            alt=""
                            className='rounded-full w-32 h-32 p-4 object-cover'
                        />
                        <h1 className='text-xl font-bold '>{user && user.userName ? user.userName : 'user name'}</h1>
                    </div>
                    <div className='justify-end px-6'>
                        {user?.role === 'student' && (
                            <Link to='/becomeInstructor'>
                                <button className="bg-orange-50 hover:bg-orange-700 text-orange-400 font-bold flex items-center py-2 px-4">
                                    Become Instructor <AiOutlineArrowRight className="ml-2" />
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
                <hr />
                <div className="flex justify-between p-6 px-20 ">
                    <button
                        className={`toggle-btn ${selectedOption === 'dashboard' ? 'border-b-4 border-orange-400' : ''}`}
                        onClick={() => setSelectedOption('dashboard')}
                    >
                        Dashboard
                    </button>
                    <button
                        className={`toggle-btn ${selectedOption === 'courses' ? 'border-b-4 border-orange-500' : ''}`}
                        onClick={() => setSelectedOption('courses')}
                    >
                        Courses
                    </button>
                    <button
                        className={`toggle-btn ${selectedOption === 'teacher' ? 'border-b-4 border-orange-500' : ''}`}
                        onClick={() => setSelectedOption('teacher')}
                    >
                        Teacher
                    </button>
                    <button
                        className={`toggle-btn ${selectedOption === 'MemberShip' ? 'border-b-4 border-orange-500' : ''}`}
                        onClick={() => setSelectedOption('message')}
                    >
                        MemberShip
                    </button>
                    {/*<button
                        className={`toggle-btn ${selectedOption === 'settings' ? 'border-b-4 border-orange-500' : ''}`}
                        onClick={() => setSelectedOption('settings')}
                    >
                        Settings
                    </button> */}
                </div>
                <hr />
                <div className='border shadow-lg'>
                    {/* Render the selected component here */}
                    {renderComponent()}
                </div>
            </div>
            <div className='w-full h-screen'></div>
        </div>
    );
};

export default UserProfile;
