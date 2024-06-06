import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/admin/Sidebar';
import { URL } from '../../../Common/api';
import axios from 'axios';
import TotalEnrollments from './components/TotalEnrollments';
import CategoryEnrollmentChart from './components/CategoryEnrollmentChart';

const AdminDashBoard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [totalEnrollments, setTotalEnrollments] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(`${URL}/course/enrollment/adminDashboard`);
        console.log(res.data);
        const { data } = res.data;
        setDashboardData(data);

        const totalCount = data.enrollmentData.reduce(
          (acc, enrollment) => acc + enrollment.count,
          0
        );
        setTotalEnrollments(totalCount);
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

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full p-10">
          <div>
            <h1 className="text-2xl font-bold">DashBoard</h1>
            <div className="flex gap-20 justify-around pt-10">
              <div className="w-1/3 shadow-lg border rounded-md h-32 flex flex-col justify-center items-center">
                <h1 className="text-xl font-semibold">Total Courses</h1>
                <h1 className="text-4xl font-bold text-green-700">
                  {/* Display total courses count */}
                </h1>
              </div>
              <div className="w-1/3 border shadow-lg rounded-md h-32 flex flex-col justify-center items-center">
                <h1 className="text-xl font-semibold">Total Enrollment</h1>
                <h1 className="text-4xl font-bold ">
                  {totalEnrollments}
                </h1>
              </div>
              <div className="w-1/3 border shadow-lg rounded-md h-32 flex flex-col justify-center items-center">
                <h1 className="text-xl font-semibold">Total Students</h1>
                <h1 className="text-4xl font-bold text-orange-700">
                  {/* Display total students count */}
                </h1>
              </div>
              <div className="w-1/3 border shadow-lg rounded-md h-32 flex flex-col justify-center items-center">
                <h1 className="text-xl font-semibold">Total Instrocter</h1>
                <h1 className="text-4xl font-bold text-orange-700">
                  {/* Display total instructors count */}
                </h1>
              </div>
            </div>
          </div>
          <div className="flex mt-6">
            <div className="w-1/2 h-full border m-2 shadow-md">
              <TotalEnrollments enrollmentsData={transformedDataForDateChart} />
            </div>
            <div className="w-1/2 mt-2 border shadow-lg">
              <CategoryEnrollmentChart
                enrollmentsData={Object.entries(transformedDataForCategoryChart)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;