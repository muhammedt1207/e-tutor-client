import React, { useEffect, useState } from 'react';
import ProfileCard from './components/ProfileCard';
import CourseCard from './components/CourseCard';
import Tabs from './components/Tabs';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../../Common/api';
import MemberShip from './components/MemberShip';



const TeacherView = () => {
    const instructorId=useParams()
    const [activeTab, setActiveTab] = useState('Courses');
    const [teacherData,setTeacherData]=useState({})
    const [coursesData,setCourseData]=useState([])
    useEffect(()=>{
        const fetchData=async()=>{
            try {
                const response = await axios.get(`${URL}/user/instructor/${instructorId.teacherId}`)
                console.log(response.data,'9090909090909');
                const res=await axios.get(`${URL}/course/enrollment/instrocterDash/${response.data.data.email}`)
                console.log(res,'teacher full details');
                setTeacherData({...response.data.data,...res.data.data})
                setCourseData(res.data.data.topCourse)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    },[])
    return (
        <div className="flex flex-wrap justify-center items-start w-full max-w-7xl mx-auto lg:mt-20">
            
            <div className="w-full lg:w-1/4 p-4">
                <ProfileCard instructordInformations={teacherData} />
            </div>
            <div className="w-full lg:w-3/4 p-4">
                <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
                <div className="mt-4">
                    {activeTab === 'Courses' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {coursesData.map(course => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    )}

                    {activeTab ==='Member Ship' && (
                        <MemberShip instructorId={instructorId}/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TeacherView;
