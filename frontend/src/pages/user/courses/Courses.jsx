import React, { useEffect, useState } from 'react';
import CourseCard from './components/CourseCard';
import { ArrowDownIcon } from '@heroicons/react/24/solid';
import CategoryList from './components/CategoryList';
import { FiChevronRight } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { publishedCourses } from '../../../redux/action/courseAction';
import Skelton from './components/Skelton';

const Courses = () => {
    const dispatch = useDispatch();
    const [showCategories, setShowCategories] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    const { data = [], loading } = useSelector((state) => state.courses);

    const toggleCategories = () => {
        setShowCategories(!showCategories);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const fetchCourse = async () => {
        try {
            await dispatch(publishedCourses());
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCourse();
    }, [dispatch]);

    // Log the data to see its structure
    console.log('Courses data:', data);

    return (
        <div className='w-full'>
            <div className='bg-gray-50 h-16 flex items-center'>
                <h1 className='text-lg font-semibold lg:ps-32 flex items-center gap-5'>
                    HomePage<FiChevronRight className='w-5' />Courses
                </h1>
            </div>
            <h1 className='text-4xl lg:ps-32 p-4 pt-10 font-semibold'>All Courses</h1>
            <div className='flex flex-col lg:flex-row justify-center'>
                <div className='lg:hidden flex justify-center p-4'>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={toggleFilters}>
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>
                </div>
                <div className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity ${showFilters ? 'block' : 'hidden'} lg:hidden`} onClick={toggleFilters}></div>
                <div className={`fixed inset-y-0 ps-28 left-0 z-50 w-64 bg-white p-4 transition-transform transform ${showFilters ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:w-1/4 lg:mr-20 lg:block border-r border-gray-200`}>
                    <div className='flex justify-between items-center p-3 cursor-pointer border-b' onClick={toggleCategories}>
                        <h1 className='text-lg'>Category</h1>
                        <ArrowDownIcon className={`w-6 transition-transform ${showCategories ? 'rotate-180' : 'rotate-0'}`} />
                    </div>
                    {showCategories && <CategoryList />}
                </div>
                <div className=' flex flex-wrap lg:flex-nowrap lg:pe-20 w-full lg:w-3/4 gap-6'>
                    {loading ? (
                        <>
                            <Skelton />
                            <Skelton />
                            <Skelton />
                            <Skelton />
                        </>
                    ) : (
                        Array.isArray(data) && data.map(course => (
                            <CourseCard key={course._id} course={course} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Courses;
