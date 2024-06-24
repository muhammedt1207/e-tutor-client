import React, { useState, useEffect } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import axios from 'axios';
import { URL } from '../../../../Common/api';
import { format } from 'date-fns';

const Reviews = ({ courseId, userId, enrolled }) => {
  const [reviews, setReviews] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [newReview, setNewReview] = useState({
    rating: 0,
    text: ''
  });
  const [hasReviewed, setHasReviewed] = useState(false);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value
    });
  };
  
  const handleRatingChange = (rating) => {
    setNewReview({
      ...newReview,
      rating
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/course/reviews`, {
        courseId,
        userId,
        ...newReview
      });
      setReviews([...reviews, { ...newReview, date:  Date.now(), userId }]);
      setNewReview({
        name: '',
        email: '',
        rating: 0,
        text: ''
      });
      setHasReviewed(true);
    } catch (error) {
      console.error('Error posting review:', error);
    }
  };
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${URL}/course/reviews/${courseId}`);
        setReviews(response.data.data);

        const userReview = response.data.data.find(review => review.userId === userId);
        if (userReview) {
          setHasReviewed(true);
        }

        const userIds = [...new Set(response.data.data.map(review => review.userId))];

        const userDetailsResponse = await axios.post(`${URL}/auth/getUsers`, { userIds });
        const users = userDetailsResponse.data.data.reduce((acc, user) => {
          acc[user.email] = user;
          return acc;
        }, {});
        console.log('review fetched');
        setUserDetails(users);
      } catch (error) {
        console.error('Error fetching reviews or user details:', error);
      }
    };

    fetchReviews();
  }, [courseId, userId]);

  // Calculate average rating
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0;

  // Calculate rating distribution
  const ratingDistribution = [0, 0, 0, 0, 0];
  reviews.forEach((review) => {
    ratingDistribution[review.rating - 1]++;
  });

  return (
    <div className='p-4'>
      <div className='flex items-center'>
        <h1 className='text-4xl font-bold'>{averageRating.toFixed(1)}</h1>
        <div className='flex ml-4'>
          {[...Array(5)].map((_, i) => (
            <span key={i}>
              {i < Math.round(averageRating) ? (
                <AiFillStar className='text-yellow-500' />
              ) : (
                <AiOutlineStar className='text-yellow-500' />
              )}
            </span>
          ))}
        </div>
        <p className='ml-2'>(Based on {reviews.length} reviews)</p>
      </div>

      {/* Rating distribution */}
      <div className='mt-4'>
        {[...Array(5)].map((_, i) => (
          <div key={i} className='flex items-center mb-1'>
            <div className='flex-1 h-2 mx-2 bg-gray-200 rounded'>
              <div
                className='h-2 bg-yellow-500 rounded'
                style={{
                  width: `${(ratingDistribution[4 - i] / reviews.length) * 100}%`
                }}
              ></div>
            </div>
            <span className='w-6 text-center'>{ratingDistribution[4 - i]}</span>
            <div className='flex ml-2'>
              {[...Array(5)].map((_, j) => (
                <span key={j}>
                  {j < 5 - i ? (
                    <AiFillStar className='text-yellow-500' />
                  ) : (
                    <AiOutlineStar className='text-yellow-500' />
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className='mt-4'>
        {reviews.map((review, index) => (
          <div key={index} className='mb-4'>
            <div className='flex items-center'>
              <img
                className='rounded-full w-14 h-14 object-cover'
                src={userDetails[review.userId]?.profileImageUrl || 'https://via.placeholder.com/150'}
                alt='Profile'
              />
              <div className='ml-4'>
                <h2 className='text-xl font-semibold'>{userDetails[review.userId]?.userName || 'Anonymous'}</h2>
                <p className='text-gray-500'>{format(new Date(review.date), 'MMM dd, yyyy')}</p>
                <div className='flex'>
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < review.rating ? (
                        <AiFillStar className='text-yellow-500' />
                      ) : (
                        <AiOutlineStar className='text-yellow-500' />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className='mt-2'>{review.text}</p>
          </div>
        ))}
      </div>

      {enrolled && !hasReviewed && (
        <>
          <h2 className='text-2xl font-bold mt-6'>Leave a Review</h2>
          <form onSubmit={handleSubmit} className='mt-4'>
            <div className='flex items-center mt-4 border p-2'>
              <label className='mr-2'>Rating:</label>
              <div className='flex'>
                {[...Array(5)].map((_, i) => (
                  <span key={i} onClick={() => handleRatingChange(i + 1)}>
                    {i < newReview.rating ? (
                      <AiFillStar className='text-yellow-500 cursor-pointer' />
                    ) : (
                      <AiOutlineStar className='text-yellow-500 cursor-pointer' />
                    )}
                  </span>
                ))}
              </div>
            </div>
            <textarea
              name='text'
              value={newReview.text}
              onChange={handleInputChange}
              placeholder='Your review'
              className='border p-2 rounded-lg w-full mt-4'
              rows='4'
              required
            ></textarea>
            <button type='submit' className='mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg'>
              Post Review
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Reviews;
