import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/admin/Sidebar';
import BreadCrumbs from '../../admin/components/BreadCrumbs';
import SearchBar from '../../admin/components/SearchBar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../../Common/api';
import { useSelector } from 'react-redux';
import SideBar from '../components/SideBar';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Main style file
import 'react-date-range/dist/theme/default.css'; // Theme css file
import OfferModal from './OfferModal';
import CircularPagination from '../../../components/CircularPagination';

const CourseList = () => {
  const { user } = useSelector((state) => state.user);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [offer, setOffer] = useState('');
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(10); // Number of courses per page

  const handleOpenModal = (course) => {
    setCurrentCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCourse(null);
    setOffer('');
    setDateRange([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }
    ]);
  };

  const handleSubmitOffer = async () => {
    try {
      const response = await axios.patch(`${URL}/course/offer/${currentCourse._id}`, {
        offer,
        startDate: dateRange[0].startDate,
        endDate: dateRange[0].endDate
      });
      console.log('Offer submitted:', response.data);
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting offer:', error);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await axios.get(`${URL}/course/course/instructor/${user.email}`);
      console.log(result.data.data);
      setCourses(result.data.data);
      setFilteredCourses(result.data.data); // Initially set filtered courses to all courses
    };
    fetchCourses();
  }, [user.email, isModalOpen]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter((course) =>
          course.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
    setCurrentPage(1); // Reset to first page on new search
  };

  // Compute courses to display on the current page
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  return (
    <div className='flex'>
      <SideBar />

      <div className="shadow-md sm:rounded-lg flex flex-col w-full lg:ml-44 ml-52 px-16 pe-10">
        <div className="flex justify-between items-center font-semibold">
          <div>
            <h1 className="mt-5 ml-5 font-bold text-2xl">Courses</h1>
            <BreadCrumbs list={["Dashboard", "Courses"]} />
          </div>
          <div>
            <Link to='/instructor/addCourse'>
              <button className='py-4 px-8 bg-orange-500 text-white rounded-md'>Add Course</button>
            </Link>
          </div>
        </div>
        <div className="p-5 w-full overflow-y-auto text-sm">
          <SearchBar
            handleSearch={handleSearch}
            search={searchQuery}
            setSearch={setSearchQuery}
            placeholder="Search Courses"
          />
        </div>

        <table className="w-full text-sm text-left rtl:text-right rounded-md text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white rounded-3xl uppercase bg-gray-950 dark:bg-gray-700 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">Course Name</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Offer</th>

              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCourses.map((course) => (
              <tr key={course._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {course.title}
                </th>
                <td className="px-6 py-4">{course.category}</td>
                <td className="px-6 py-4">${course.amount}</td>
                <td className="px-6 py-4">
                  {course.status === 'pending' ? 'Pending' :
                    course.status === 'blocked' ? 'Blocked' :
                      'Accepted'}
                </td>
                <td>
                  <button onClick={() => handleOpenModal(course)} className="font-medium text-green-600 dark:text-green-500 hover:underline">Set Offer</button>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <Link to={`/instructor/addCourse?courseId=${course._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-4">
          <CircularPagination active={currentPage} setActive={setCurrentPage} total={totalPages} />
        </div>
      </div>

      {isModalOpen && (
        <OfferModal setOffer={setOffer} setDateRange={setDateRange} handleCloseModal={handleCloseModal} handleSubmitOffer={handleSubmitOffer} dateRange={dateRange} currentCourse={currentCourse} offer={offer}/>
      )}
    </div>
  );
};

export default CourseList;
