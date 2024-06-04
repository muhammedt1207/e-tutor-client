import React, { useState, useEffect } from 'react';
import { AiFillBook, AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { PiStudentFill } from "react-icons/pi";
import { FaPlayCircle } from "react-icons/fa";
import axios from 'axios';
import { URL } from '../../../../Common/api'; 

const InstructorDetails = ({ instroctorId }) => {
  const [instructor, setInstructor] = useState({});
  useEffect(() => {
    const fetchInstructorData = async () => {
      try {
        const response = await axios.get(`${URL}/auth/findUser/${instroctorId}`);
        const userResponse = await axios.get(`${URL}/user/user/${instroctorId}`);
        console.log(response, 'Response from auth/findUser');
        console.log(userResponse, 'Response from user/user');

        const combinedData = {
          ...response.data.data,
          ...userResponse.data.data
        };
        
        setInstructor(combinedData);
        console.log(combinedData, 'Combined instructor data');
      } catch (error) {
        console.error('Error fetching instructor data:', error);
      }
    };

    fetchInstructorData();
  }, [instroctorId]);

  if (!instructor || Object.keys(instructor).length === 0) {
    return <div>Loading...</div>;
  }
  if (!instructor) {
    return <div>Loading...</div>;
  }

  return (
    <div className='pt-10'>
      <div className='flex space-x-5'>
        <img className='w-96 rounded-lg' src={instructor.profileImageUrl || 'https://via.placeholder.com/150'} alt={instructor.name} />
        <div>
          <h1 className='text-xl font-bold'>{instructor.userName}</h1>
          <p className='pt-1'>{instructor.profession[0]}</p>
          <div className='flex space-x-2'>
            {instructor.githubLink && <a href={instructor.githubLink}><AiFillGithub className='text-xl' /></a>}
            {instructor.linkedinLink && <a href={instructor.linkedinLink}><AiFillLinkedin className='text-xl' /></a>}
          </div>
          
          <div className='flex space-x-8 pt-10'>
            <p className='flex items-center space-x-3'><PiStudentFill className='text-3xl text-orange-500' />{instructor.students}</p>
            <p className='flex items-center space-x-3'><AiFillBook className='text-3xl text-yellow-500' />{instructor.courses}</p>
            <p className='flex items-center gap-2'><FaPlayCircle className='text-3xl text-red-500' />{instructor.lessons}</p>
          </div>
        </div>
      </div>
      <div className='pt-4 ps-4'>
        <h1 className='text-xl font-bold'>About Instructor</h1>
        <p>{instructor.profileDescription}</p>
      </div>
    </div>
  );
};

export default InstructorDetails;
