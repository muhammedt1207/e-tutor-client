import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { URL } from '../../../../Common/api';
import { Link } from 'react-router-dom';

const PurchasedCourses = ({ user }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${URL}/course/enrollment/${user._id}`);
        console.log(response, 'purchased data');
        if (response.data) {
          setCourses(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourse();
  }, [user._id]);

  const calculateProgress = (course) => {
    const totalLessons = course.courseId.lessons.reduce((acc, lesson) => acc + lesson.subLessons.length, 0);
    const completedLessons = course.progress.completedLessons.length;
    return (completedLessons / totalLessons) * 100;
  };

  console.log(courses);

  return (
    <div>
      <h1 className='text-2xl font-bold p-10'>
        Purchased Courses
      </h1>
      {courses.length === 0 ? (
        <div className="p-10 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">No courses purchased yet.</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-10'>
          {courses.map(course => (
            course.courseId && (
              <div key={course._id} className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link to={`/course/${course?.courseId?._id}`}>
                  <img className="rounded-t-lg" src={course?.courseId?.thumbnail} alt="" />
                  <div className="p-5">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{course?.courseId?.title}</h5>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${calculateProgress(course)}%` }}
                      ></div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {Math.round(calculateProgress(course))}% completed
                    </p>
                  </div>
                </Link>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}

export default PurchasedCourses;
