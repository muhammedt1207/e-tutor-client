import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/admin/Sidebar';
import { URL } from '../../../Common/api';
import axios from 'axios';
import TotalEnrollments from './components/TotalEnrollments';
import CategoryEnrollmentChart from './components/CategoryEnrollmentChart';
import TopCourses from './components/TopCourses';
import SalesReport from './components/SalesReport';
import DateRangePicker from './components/DateRangePicker';
import DateRangepicker from './components/DateRangePicker';
import { motion } from 'framer-motion';

const AdminDashBoard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [totalEnrollments, setTotalEnrollments] = useState(0);
  const [totalCourse, setTotalCourses] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalInstructors, setTotalInstructors] = useState(0);
  const [topCourses, setTopCourses] = useState([]);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [showReport, setShowReport] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(`${URL}/course/enrollment/adminDashboard`);
        const userRes = await axios.get(`${URL}/auth/getAllUser`);
        const { data } = res.data;
        setDashboardData(data);
        setTotalCourses(res.data.data.topCourses.totalCourseCount);
        const totalCount = data.enrollmentData.reduce(
          (acc, enrollment) => acc + enrollment.count,
          0
        );
        setTotalEnrollments(totalCount);
        const userRoles = userRes.data.data.allData.map((user) => user.role);
        const totalUsersCount = userRoles.filter((role) => role === 'student').length;
        const totalInstructorsCount = userRoles.filter((role) => role === 'instructor').length;
        setTopCourses(res.data.data.topCourses);
        setTotalUsers(totalUsersCount);
        setTotalInstructors(totalInstructorsCount);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const transformedDataForDateChart = dashboardData.enrollmentData
    ? Object.entries(
        dashboardData.enrollmentData.reduce((acc, enrollment) => {
          const date = `${enrollment._id.year}-${enrollment._id.month}-${enrollment._id.day}`;
          acc[date] = (acc[date] || 0) + enrollment.count;
          return acc;
        }, {})
      ).map(([date, count]) => [date, count])
    : [];

  const transformedDataForCategoryChart = dashboardData.enrollmentData
    ? dashboardData.enrollmentData.reduce((acc, enrollment) => {
        const categoryName = enrollment._id.categoryName;
        const count = enrollment.count;
        acc[categoryName] = (acc[categoryName] || 0) + count;
        return acc;
      }, {})
    : {};

  const handleApplyDateRange = () => {
    setShowReport(true);
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full p-10">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className='flex justify-between'>
              <h1 className="text-2xl font-bold">DashBoard</h1>
              <button onClick={() => setShowModal(true)}>Sales Report</button>
            </div>
            {showReport && (
              <div className='mt-4'>
                <SalesReport
                  startDate={dateRange[0].startDate}
                  endDate={dateRange[0].endDate}
                />
              </div>
            )}
            <div className="flex gap-20 justify-around pt-10">
              <motion.div
                className="w-1/3 shadow-lg border rounded-md h-32 flex flex-col justify-center items-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-xl font-semibold">Total Courses</h1>
                <h1 className="text-4xl font-bold ">
                  {totalCourse}
                </h1>
              </motion.div>
              <motion.div
                className="w-1/3 border shadow-lg rounded-md h-32 flex flex-col justify-center items-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h1 className="text-xl font-semibold">Total Enrollment</h1>
                <h1 className="text-4xl font-bold ">
                  {totalEnrollments}
                </h1>
              </motion.div>
              <motion.div
                className="w-1/3 border shadow-lg rounded-md h-32 flex flex-col justify-center items-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-xl font-semibold">Total Students</h1>
                <h1 className="text-4xl font-bold ">
                  {totalUsers}
                </h1>
              </motion.div>
              <motion.div
                className="w-1/3 border shadow-lg rounded-md h-32 flex flex-col justify-center items-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h1 className="text-xl font-semibold">Total Instructors</h1>
                <h1 className="text-4xl font-bold ">
                  {totalInstructors}
                </h1>
              </motion.div>
            </div>
          </motion.div>
          <div className="flex mt-6">
            <motion.div
              className="w-1/2 h-full border m-2 shadow-md"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <TotalEnrollments enrollmentsData={transformedDataForDateChart} />
            </motion.div>
            <motion.div
              className="w-1/2 mt-2 border shadow-lg"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <CategoryEnrollmentChart
                enrollmentsData={Object.entries(transformedDataForCategoryChart)}
              />
            </motion.div>
          </div>
          <div>
            <TopCourses topCourses={topCourses} />
          </div>
        </div>
      </div>
      <DateRangepicker
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        dateRange={dateRange}
        setDateRange={setDateRange}
        onApply={handleApplyDateRange}
      />
    </>
  );
};

export default AdminDashBoard;
