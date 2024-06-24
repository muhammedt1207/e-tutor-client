import React, { useEffect, useState } from 'react';
import CourseCard from './components/CourseCard';
import { ArrowDownIcon } from '@heroicons/react/24/solid';
import CategoryList from './components/CategoryList';
import { FiChevronRight } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { publishedCourses } from '../../../redux/action/courseAction';
import Skelton from './components/Skelton';
import SearchBar from '../../admin/components/SearchBar';

const Courses = () => {
    const dispatch = useDispatch();
    const [showCategories, setShowCategories] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState(''); // State for sorting

    const { data = [], loading } = useSelector((state) => state.courses);

    const toggleCategories = () => {
        setShowCategories(!showCategories);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const fetchCourse = async () => {
        try {
            await dispatch(publishedCourses({ categories: selectedCategories, search, sortBy }));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCourse();
    }, [selectedCategories, search, sortBy, dispatch]);

    const handleCategorySelection = (categoryId) => {
        setSelectedCategories((prevCategories) =>
            prevCategories.includes(categoryId)
                ? prevCategories.filter((c) => c !== categoryId)
                : [...prevCategories, categoryId]
        );
    };

    const handleSearch = (query) => {
        setSearch(query);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    return (
        <div className='w-full'>
            <div className='bg-gray-50 h-16 flex items-center'>
                <h1 className='text-lg font-semibold lg:ps-32 flex items-center gap-5'>
                    HomePage<FiChevronRight className='w-5' />Courses
                </h1>
            </div>
            <h1 className='text-4xl lg:ps-32 p-4 pt-10 font-semibold'>All Courses</h1>
            <div className='w-1/2 flex items-center'>
            </div >
            <div className='flex flex-col lg:flex-row justify-center'>
                <div className='lg:hidden flex justify-center p-4'>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={toggleFilters}>
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>
                </div>
                <div className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity ${showFilters ? 'block' : 'hidden'} lg:hidden`} onClick={toggleFilters}></div>
                <div className={`fixed inset-y-0 ps-28 left-0 z-50 w-64 bg-white transition-transform transform ${showFilters ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:w-1/4 lg:mr-4 lg:block border-r border-gray-200`}>
                    <div className='flex justify-between items-center p-3 cursor-pointer border-b' onClick={toggleCategories}>
                        <h1 className='text-lg'>Category</h1>
                        <ArrowDownIcon className={`w-6 transition-transform ${showCategories ? 'rotate-180' : 'rotate-0'}`} />
                    </div>
                    {showCategories && <CategoryList onCategorySelection={handleCategorySelection} selectedCategories={selectedCategories} />}
                </div>
                <div className='flex flex-wrap w-full gap-2'>
                    <div className='w-full flex items-center'>
                        <div className='w-1/2'>
                            <SearchBar handleSearch={handleSearch} search={search} setSearch={setSearch} placeholder="Search courses" />
                        </div>
                        <div className='flex items-center'>
                            <label className="block mb-2 px-5 text-sm font-bold text-gray-700">Sort By:</label>
                            <select
                                className="px-3 py-2 border rounded-md"
                                value={sortBy}
                                onChange={handleSortChange}
                            >
                                <option value="">Select</option>
                                <option value="oldToNew">Old to New</option>
                                <option value="priceLowToHigh">Price Low to High</option>
                            </select>
                        </div>
                    </div >
                    {loading ? (
                        <>
                            <Skelton />
                            <Skelton />
                            <Skelton />
                        </>
                    ) : Array.isArray(data) && data.length > 0 ? (
                        data.map((course) => <CourseCard key={course.id} course={course} />)
                    ) : (
                        <p>No courses found for the selected categories.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Courses;
