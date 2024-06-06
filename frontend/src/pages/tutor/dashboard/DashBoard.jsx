import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EnrollmentChart from './components/EnrollmentChart';
import SideBar from '../components/SideBar';
import TopSelledCourse from './components/TopSelledCourse';
import { URL } from '../../../Common/api';
import { useSelector } from 'react-redux';

const DashBoard = () => {
    const [enrollmentsData, setEnrollmentsData] = useState([]);
    const [totalCourses, setTotalCourses] = useState(0);
    const [totalEnrollments, setTotalEnrollments] = useState(0);
    const [totalStudents, setTotalStudents] = useState(0);
    const [topCourses, setTopCourses] = useState([]);
    const {user}=useSelector(state=>state.user)
    useEffect(() => {
        const fetchDashboardData = async () => {
            if(user){
                try {
                   const res=await axios.get(`${URL}/course/enrollment/instrocterDash/${user.email}`)
                   console.log(res);
                    setEnrollmentsData(res.data.data.enrollments);
                    setTotalCourses(res.data.data.totalCourses);
                    setTotalStudents(res.data.data.totalStudents);
                    setTopCourses(res.data.data.topCourse);
                    let total = 0;
                    for (const enrollment of res.data.data.enrollments) {
                      total += enrollment.count;
                    }
                    setTotalEnrollments(total);
                } catch (error) {
                    console.error('Error fetching dashboard data:', error);
                }
            }else{
                console.log('user not found ❌❌❗❗❗');
            }
        };

        fetchDashboardData();
    }, []);

    const transformedData = enrollmentsData && enrollmentsData.map(({ _id, count }) => {
        const { year, month, day } = _id;
        const dateString = `${year}-${month}-${day}`;

        return [dateString, count];
    });

    return (
        <div className='flex'>
            <SideBar />
            <div className=' sm:rounded-lg flex flex-col lg:ml-44 ml-52 w-[85vw] h-full pe-4 ps-16 '>
                <div>
                    <h1 className='text-2xl font-bold'>DashBoard</h1>
                    <div className='flex gap-20 justify-around pt-10'>
                        <div className='w-1/3 bg-green-100 border-green-700 border rounded-md h-32 flex flex-col justify-center items-center'>
                            <h1 className='text-xl font-semibold'>Total Courses</h1>
                            <h1 className='text-4xl font-bold text-green-700'>{totalCourses}</h1>
                        </div>
                        <div className='w-1/3 bg-blue-100 border-blue-700 border rounded-md h-32 flex flex-col justify-center items-center'>
                            <h1 className='text-xl font-semibold'>Total Enrollment</h1>
                            <h1 className='text-4xl font-bold text-blue-700'>{totalEnrollments}</h1>
                        </div>
                        <div className='w-1/3 bg-orange-100 border-orange-700 border rounded-md h-32 flex flex-col justify-center items-center'>
                            <h1 className='text-xl font-semibold'>Total Students</h1>
                            <h1 className='text-4xl font-bold text-orange-700'>{totalStudents}</h1>
                        </div>
                    </div>
                </div>
                <div className='flex mt-6 '>
                    <div className='w-2/3 h-full border m-2 shadow-md'>
                        <EnrollmentChart enrollmentsData={transformedData} />
                    </div>
                    <div className='w-1/3 mt-2'>
                        <TopSelledCourse topCourses={topCourses} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashBoard;
