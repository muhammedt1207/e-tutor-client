import React, { useEffect, useState } from 'react';
import { AiFillBook, AiFillStar } from 'react-icons/ai';
import { MdOutlineCheckCircle } from 'react-icons/md';
import LessonList from '../../user/courses/components/LessonList';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCourse } from '../../../redux/action/courseAction';
import { URL } from '../../../Common/api';
import axios from 'axios';
import { Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PHmWaSCFxhihy8IolYTxCsIFbRNHGc2byVYCqYRLo1aFs1XzXRnZ32zsE7fevPERYFgskgZvJME9IIBDQryioFp00F3kHHaTy');

const CourseDetailPage = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [isProcessing, setProcessingTo] = useState(false);
    const { user } = useSelector((state) => state.user);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [course, setCourse] = useState({});
    const [video, setVideo] = useState('');
    const [isPurchased, setIsPurchased] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const result = await dispatch(getCourse(id));
                setCourse(result.payload.data);
                setVideo(result.payload.data.trailer);

                if (user?._id) {
                    checkEnrollment(id, user._id);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchCourse();
    }, [dispatch, id, user]);
    const checkEnrollment = async (courseId, userId) => {
        try {
            const response = await axios.get(`${URL}/course/enrollment/check`, { params: { courseId, userId } });
            console.log(response.data.data.isEnrolled,'enrollment data ');
            setIsPurchased(response.data.data.isEnrolled);
        } catch (error) {
            console.error('Error checking enrollment status', error);
        }
    };

    const handleBuyCourse = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setProcessingTo(true);
        try {
            const data = {
                courseName: course?.title,
                courseThumbnail: course?.thumbnail,
                amount: 2500 * 100,
                userId: user?._id,
                courseId: course?._id,
            }
            const response = await axios.post(`${URL}/payment/create-session`, data);

            const session = response.data;
            localStorage.setItem('data', JSON.stringify(data))
            console.log(session, 'payment session');
            const result = await stripe.redirectToCheckout({ sessionId: session.id });

            if (result.error) {
                console.error(result.error.message);
                setProcessingTo(false);
            }
        } catch (error) {
            console.error('Error creating session', error);
            setProcessingTo(false);
        }
    };

    return (
        <div>
            <div className='w-full flex flex-col items-center justify-center'>
                <div className='w-4/6 flex flex-col '>
                    <video src={video} className="rounded-md mt-10" muted controls>
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className='flex pt-10 justify-between w-4/6'>
                    <div className='w-4/6'>
                        <h1 className='text-4xl font-bold'>{course.title}</h1>
                        <div className='flex items-center mt-8'>
                            <img className='rounded-full w-14' src="https://statusneo.com/wp-content/uploads/2023/02/MicrosoftTeams-image551ad57e01403f080a9df51975ac40b6efba82553c323a742b42b1c71c1e45f1.jpg" alt="" />
                            <h1 className='ps-4 text-xl font-semibold'>{course.instructorName}</h1>
                        </div>
                        <div className='flex flex-col '>
                            <h1 className='pt-10 text-2xl font-bold'>Course Description</h1>
                            <p className='leading-8 pt-8 p-5'>{course.description}</p>
                        </div>
                        <div className='flex flex-col'>
                            <h1 className='text-2xl font-bold space-x-8'>What you'll learn</h1>
                            {course.teachings && course.teachings.map((topic, index) => (
                                <p className='flex pt-5' key={index}>
                                    <MdOutlineCheckCircle className='text-2xl text-green-700' />
                                    {topic}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className='w-80'>
                        {isPurchased ? (
                            course.lessons ? (
                                <LessonList lessons={course.lessons} onSubLessonClick={(videoUrl) => setVideo(videoUrl)} />
                            ) : (
                                <p>No lessons available</p>
                            )
                        ) : (
                            <div className='p-4 border border-gray-300 rounded-lg'>
                                <h2 className='text-xl font-semibold'>Buy Course</h2>
                                <div className='flex justify-between pt-10'>
                                    <h1 className='font-semibold'>SubTotal</h1>
                                    <h1>{course?.amount || '2500'}</h1>
                                </div>
                                <Elements stripe={stripePromise}>
                                    <button onClick={handleBuyCourse} className='mt-4 px-4 py-2 my-4 bg-orange-600 text-white rounded-lg'>
                                        Buy Course
                                    </button>
                                </Elements>
                                <hr />
                                <div className='flex justify-between pt-8'>
                                    <h1 className='flex items-center'><AiFillBook />Lectures </h1>
                                    <h1>{course?.lessons?.length}</h1>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailPage;
