import React, { useState, useEffect } from 'react'
import Skeleton from '@mui/material/Skeleton';
import { useSelector } from 'react-redux';
import axios from 'axios';

const calculateRemainingDays = (endDate) => {
  const currentDate = new Date();
  const end = new Date(endDate);
  const diffTime = end - currentDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0; // Ensure it doesn't show negative days
}

const SubscriptionDetails = () => {
  const [subscription, setSubscription] = useState(null);
const {user}=useSelector(state=>state.user)
  useEffect(() => {
    // Replace with your API endpoint
    const fetchSubscriptionDetails = async () => {
      try {
        const response = await axios.get(`https://gizmocart.shop/api/payment/subscription/${user.email}`);
        const data = await response.data.data;
        console.log(data,response.data.data)
        setSubscription(data);
      } catch (error) {
        console.error('Error fetching subscription details:', error);
      }
    };

    fetchSubscriptionDetails();
  }, []);

  if (!subscription) {
    return (
      <>
              {[...Array(3)].map((_, index) => (

      <div className='flex w-full p-6'>
        <Skeleton variant="circular" width={40} height={40} className='ps-12' />
        <Skeleton className='mx-10 w-full'/>
      </div>
       ))}
      </>
    );
  }

  const remainingDays = calculateRemainingDays(subscription.endDate);

  return (
    <div>
      <div className='p-2'>
        <div className='flex items-center '>
          <img className='rounded-full w-16 h-16 mx-6' src={subscription.image} alt="" />
          <div >
            <h1 className='text-xl font-semibold'>{subscription.name}</h1>
            <p className='font-light'>Membership taken on {subscription.startDate}</p>
            <p className='font-light'>Remaining days: {remainingDays}</p>
          </div>
        </div>
      </div>
      <hr className='' />
      <div className='p-2 flex justify-between mx-6'>
        <div className='flex items-center '>
          <img className='rounded-full w-16 h-16 mx-6' src={subscription.image} alt="" />
          <div >
            <h1 className='text-xl font-semibold'>{subscription.name}</h1>
            <p className='font-light'>Membership taken on {subscription.startDate}</p>
          </div>
        </div>
        <div>
          <p className='font-light'>Remaining days: {remainingDays}</p>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionDetails
