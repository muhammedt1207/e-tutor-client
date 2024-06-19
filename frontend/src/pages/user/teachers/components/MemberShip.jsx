import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { URL } from '../../../../Common/api';
import { useSelector } from 'react-redux';

const stripePromise = loadStripe('pk_test_51PHmWaSCFxhihy8IolYTxCsIFbRNHGc2byVYCqYRLo1aFs1XzXRnZ32zsE7fevPERYFgskgZvJME9IIBDQryioFp00F3kHHaTy');

const MemberShip = ({ instructorId }) => {
  const [email, setEmail] = useState('');
  const [isProcessing, setProcessingTo] = useState(false);
  const [hasMembership, setHasMembership] = useState(false);
  const {user}=useSelector((state)=>state.user)

  useEffect(() => {
    if (user) {
      checkMembership();
    }
  }, [email]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const checkMembership = async () => {
    try {
        console.log(user,'.........');
      const response = await axios.get(`${URL}/payment/subscription/${user.email}/${instructorId.teacherId}`);
      console.log(response.data);
      setHasMembership(response.data.success);
    } catch (error) {
      console.error('Error checking membership:', error);
    }
  };

  const handleSubscribe = async () => {
    setProcessingTo(true);

    try {
        const postData={
            email,
            instructorId:instructorId.teacherId
        }
      const response = await axios.post(`${URL}/payment/subscription/create-checkout-session`, postData);

      console.log(response, 'response from post');
      const data = {
        customerId: email,
        instructorId
      };
      localStorage.setItem('MemberShipData', JSON.stringify(data));

      const stripe = await stripePromise;
      const { id: sessionId } = response.data;

      const result = await stripe.redirectToCheckout({
        sessionId,
      });

      if (result.error) {
        console.error('Error:', result.error.message);
        setProcessingTo(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setProcessingTo(false);
    }
  };

  return (
    <>
    
          {hasMembership ? (
            <p className="text-green-500">You already have a membership for this instructor.</p>
          ) : (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Subscribe to Instructor</h1>
      <div className="flex flex-col items-center mb-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          className="px-4 py-2 border border-gray-300 rounded-md mb-2"
        />
          <button
            onClick={handleSubscribe}
            disabled={isProcessing}
            className={`px-4 py-2 rounded-md ${
              isProcessing ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isProcessing ? 'Processing...' : 'Subscribe'}
          </button>
      </div>
      <p className="text-gray-500">
        {hasMembership ? 'You already have a membership for this instructor.' : 'You will be redirected to Stripe to complete the subscription process.'}
      </p>
    </div>
        )}
    </>
  );
};

export default MemberShip;
