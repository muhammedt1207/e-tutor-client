// src/EnrollmentDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../../../Common/api';
import { useSelector } from 'react-redux';

const EnrollmentDetails = () => {
  const [enrollmentData, setEnrollmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const {user}=useSelector(state=>state.user)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/course/enrollment/instructor/${user.email}`);
        setEnrollmentData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="container mx-auto p-4">Loading...</div>;
  if (error) return <div className="container mx-auto p-4">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      {enrollmentData && enrollmentData.data.map((enrollment, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-4">
          <div className="flex items-center mb-4">
            <img
              src={enrollment.userId.profileImageUrl}
              alt={enrollment.userId.userName}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h2 className="text-2xl font-semibold">{enrollment.userId.userName}</h2>
              <p className="text-gray-600">{enrollment.userId.email}</p>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Course : {enrollment.courseId?.title||''}</h3>
            {/* You can replace Course ID with Course Name if you have that data */}
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Progress</h3>
            <p>Current Lesson: {enrollment.progress.currentLesson || 'N/A'}</p>
            <p>Current SubLesson: {enrollment.progress.currentSubLesson || 'N/A'}</p>
            {/* <p>Total Time Watched: {enrollment.progress.totalTimeWatched} minutes</p> */}
            <p>Completed Lessons: {enrollment.progress.completedLessons.length}</p>
          </div>
          <div className="text-gray-600">
            <p>Enrolled At: {new Date(enrollment.enrolledAt).toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EnrollmentDetails;
