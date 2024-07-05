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
import CourseOverView from './components/CourseOverView';
import InstroctorDetails from './components/InstroctorDetails';
import Reviews from './components/Reviews';
import { getUserData } from '../../../redux/action/userAction';

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
    const [activeTab, setActiveTab] = useState('overview');
    console.log(id, 'course id getted by params');
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                if (id) {

                    const result = await dispatch(getCourse(id));
                    console.log(result, '..................');
                    setCourse(result.payload.data);
                    setVideo(result.payload.data.trailer);
                }
                if (user?._id) {
                    console.log('checking enrollments....');
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
          const { data } = response.data;
          console.log(data);
          if (data.isEnrolled[0]) {
            const enrollmentData = data.isEnrolled[1][0];
      
            setIsPurchased(true);
      
            if (course.lessons) {
              const { currentLesson, currentSubLesson } = enrollmentData.progress;
              const lessonIndex = course.lessons.findIndex(lesson => lesson._id === currentLesson);
              
              if (lessonIndex !== -1 && course.lessons[lessonIndex].SubLesson) {
                const subLessonIndex = course.lessons[lessonIndex].SubLesson.findIndex(subLesson => subLesson._id === currentSubLesson);
                
                console.log(course.lessons[lessonIndex].SubLesson[subLessonIndex].videoUrl,'========');
                if (subLessonIndex !== -1) {
                  setVideo(course.lessons[lessonIndex].SubLesson[subLessonIndex].videoUrl);
                }
              }
            }
          } else {
            setIsPurchased(false);
          }
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
            let data = {
                courseName: course?.title,
                courseThumbnail: course?.thumbnail,
                amount: course?.amound*100 || 2550 * 100,
                userId: user?._id,
                courseId: course?._id,
            };
            const response = await axios.post(`${URL}/payment/create-session`, data);

            const session = response.data;
            data={...data,instructorRef:course.instructorRef}
            localStorage.setItem('data', JSON.stringify(data));
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

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <CourseOverView course={course} />;
            case 'reviews':
                return <Reviews courseId={course._id} userId={user.email} enrolled={isPurchased} />;
            case 'qna':
                return <QnAComponent />;
            case 'instructor':
                return <InstroctorDetails instroctorId={course.instructorRef} />;
            default:
                return null;
        }
    };



    return (
        <div>
            <div className='w-full flex flex-col items-center justify-center'>
                <div className='flex w-full flex-wrap lg:flex-nowrap'>
                    <div className='flex flex-col w-full lg:w-2/3 ps-10'>
                        <div className='w-full flex flex-col'>
                            <video src={video} className="rounded-md mt-10" muted controls>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <h1 className='text-4xl font-bold p-5 '>{course.title}</h1>
                        {isPurchased && (
                            <div className='block lg:hidden w-full h-auto '>
                                {course.lessons ? (
                                    <LessonList lessons={course.lessons} onSubLessonClick={(videoUrl) => setVideo(videoUrl)} courseId={course._id}
                                        userId={user._id} />
                                ) : (
                                    <p>No lessons available</p>
                                )}
                            </div>
                        )}

                        <div className='flex pt-10 justify-between w-4/6'>
                            <div className='w-full'>
                                <div className='flex space-x-4'>
                                    <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 rounded-lg ${setActiveTab === 'overview' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>Overview</button>
                                    <button onClick={() => setActiveTab('instructor')} className={`px-4 py-2 rounded-lg ${setActiveTab === 'instructor' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>Instructor</button>
                                    <button onClick={() => setActiveTab('reviews')} className={`px-4 py-2 rounded-lg ${setActiveTab === 'reviews' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>Reviews</button>
                                    {/* <button onClick={() => setActiveTab('qna')} className={`px-4 py-2 rounded-lg ${setActiveTab === 'qna' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>Q&A</button> */}
                                </div>
                                {renderContent()}
                            </div>
                        </div>

                    </div>
                    <div className='w-full lg:w-1/3 mx-5'>
                        {isPurchased ? (
                            <div className='hidden lg:block'>
                                {course.lessons ? (
                                    <LessonList lessons={course.lessons} onSubLessonClick={(videoUrl) => setVideo(videoUrl)} courseId={course._id} userId={user._id} />
                                ) : (
                                    <p>No lessons available</p>
                                )}
                            </div>
                        ) : (
                            <div className='p-4 border border-gray-300 rounded-lg max-w-md mx-auto mt-10'>
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
