import React, { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { URL } from '../../../Common/api';

const calculateRemainingDays = (endDate) => {
  const currentDate = new Date();
  const end = new Date(endDate);
  const diffTime = end - currentDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0; // Ensure it doesn't show negative days
}

const SubscriptionDetails = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      try {
        const response = await axios.get(`https://gizmocart.shop/api/payment/subscription/${user.email}`);
        const subscriptionData = response.data.data;

        const instructorEmails = subscriptionData.map(sub => sub.instructorId);
console.log(instructorEmails,'1111');
        const instructorResponse = await axios.post(`${URL}/auth/getUsers`, { userIds: instructorEmails });
        const instructorData = instructorResponse.data.data;
        console.log(instructorResponse,'22222');

        const subscriptionsWithInstructors = subscriptionData.map(subscription => {
          const instructor = instructorData.find(inst => inst?.email=== subscription.instructorId);
          return {
            ...subscription,
            instructor: instructor || {} 
          };
        });
        console.log(subscriptionsWithInstructors,'33333');
        setSubscriptions(subscriptionsWithInstructors);
      } catch (error) {
        console.error('Error fetching subscription details:', error);
      }
    };

    if (user) {
      fetchSubscriptionDetails();
    }
  }, [user]);

  if (subscriptions.length === 0) {
    return (
      <>
        {[...Array(3)].map((_, index) => (
          <div className='flex w-full p-6' key={index}>
            <Skeleton variant="circular" width={40} height={40} className='ps-12' />
            <Skeleton className='mx-10 w-full' />
          </div>
        ))}
      </>
    );
  }

  return (
    <div>
      {subscriptions.map(subscription => (
        <>
        <div className='p-2' key={subscription._id}>
        <div className='flex items-center '>
          <img className='rounded-full w-16 h-16 mx-6' src={subscription.instructor.profileImageUrl ||`https://i.sstatic.net/l60Hf.png`} alt="" />
          <div >
            <h1 className='text-xl font-semibold'>{subscription.instructor.userName}</h1>
            {/* <p className='font-light'>Membership taken on {subscription.startDate}</p> */}
            <p className='font-light'>Remaining days: {calculateRemainingDays(subscription.currentPeriodEnd)}</p>
          </div>
        </div>
      </div>
      <hr />
      </>
      ))}
    </div>
  )
}

export default SubscriptionDetails;
