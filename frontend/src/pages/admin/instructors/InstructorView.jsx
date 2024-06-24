import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/admin/Sidebar';
import axios from 'axios';
import { URL } from '../../../Common/api';
import { useParams } from 'react-router-dom';

const InstructorView = () => {
  const { id } = useParams(); 
  const [instructorDetails, setInstructorDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/user/user/${id}`);
        console.log(response,'instructor view details........');
        setInstructorDetails(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching instructor details:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  if (!instructorDetails) {
    return <div>No data found for this instructor.</div>; // Handle case where data is empty
  }

  return (
    <div className='flex'>
      <Sidebar />
      <div>
        <div className='pb-20'>
          <h1 className='p-10 text-4xl font-bold'>Instructor Details</h1>
          <div className='flex space-x-10 px-10'>
            <div className=' p-4 w-3/5 border'>
              <h1 className='text-xl font-semibold'>Personal Information</h1>
              <hr />
              {/* <div className='pt-8 flex space-x-16'>
                <h3 className='font-semibold'>Full Name</h3>
                <h2>{instructorDetails.fullName}</h2>
              </div> */}
              <div className='pt-4 flex space-x-20'>
                <h3 className='font-semibold'>Email ID</h3>
                <h2>{instructorDetails.email}</h2>
              </div>
              <div className='pt-4 flex space-x-16'>
                <h3 className='font-semibold'>Teachings</h3>
                <h2>{instructorDetails.profession[0]}</h2>
              </div>
              <div className='pt-4 flex space-x-20'>
                <h3 className='font-semibold'>Address</h3>
                <div>
                  <h2>{instructorDetails.address.street}</h2>
                  <h2>{instructorDetails.address.city}</h2>
                  <h2>{instructorDetails.address.state}</h2>
                  <h2>{instructorDetails.address.country}</h2>
                 <h2>{instructorDetails.address.post}</h2>

                </div>
              </div>
              <div className='pt-4 flex space-x-14'>
                <h3 className='font-semibold'>Description</h3>
                <h2>{instructorDetails.profileDescription}</h2>
              </div>
            </div>
            <div className='w-2/5 border'>
              <div className='flex-col gap-5'>
                <h1 className='font-bold text-lg'>Instructor ID</h1>
                <img
                  className=''
                  src={instructorDetails.qualificationFileUrl}
                  alt=""
                />
                <h1 className='font-bold text-lg pt-10'>Qualification </h1>
                <img
                  className='pt-2'
                  src={instructorDetails.idFileUrl||""}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorView;
