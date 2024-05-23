import React, { useEffect, useState } from 'react';
import AddCourse from './AddCourse';
import AdvanceInformation from './AdvanceInformation';
import AddCurriculum from './AddCurriculam';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse } from '../../../redux/action/courseAction';
import SuccessPage from './SuccessPage';
import SideBar from '../components/SideBar';
import { getUserData } from '../../../redux/action/userAction';
import { useParams } from 'react-router-dom';

const AddCourseHome = () => {
  const {courseId}=useParams()
  const dispatch=useDispatch()
  const {user}=useSelector((state)=>state.user)
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState({
    instructorData:{},
    addCourseData: {},
    advanceInformationData: {},
    addCurriculumData: {}
  });

  const handleNextAddCourse = (courseData) => {
    console.log(courseData,'10000000000000',user);
    setCourseData(prevData => ({
      ...prevData,
      addCourseData: courseData,
      instructorData:{
        instructorRef:user?.email,
        instructorName:user?.userName
      }
    }));
    console.log(courseData,'11111');
    setCurrentStep(prevStep => prevStep + 1); 
  };


  useEffect(() => {
  dispatch(getUserData()).then(()=>{
    console.log(user,'^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
  })
    console.log(courseData, 'Updated course data');
    console.log(user,'>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  }, [courseData])


  const handleNextAdvanceInformation = (data) => {
    console.log(data,'0000000000');
    setCourseData(prevData => ({
      ...prevData,
      advanceInformationData: data
      
    }));
    console.log(courseData,'22222');
    setCurrentStep(prevStep => prevStep + 1);
  };

  const handleNextAddCurriculum = async(data) => {
    console.log(data,'data form add curriculam');
   await setCourseData(prevData => ({
      ...prevData,
      addCurriculumData: data
    }));
    console.log(courseData,'33333');
    dispatch(createCourse(courseData))
    toast.success('course added')
   
    setCurrentStep(prevStep => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  return (
    <div>
      <SideBar/>
      {currentStep === 1 && <AddCourse onNext={handleNextAddCourse} />}
      {currentStep === 2 && <AdvanceInformation onPrev={handlePrev} onNext={handleNextAdvanceInformation} />}
      {currentStep === 3 && <AddCurriculum onPrev={handlePrev} onNext={handleNextAddCurriculum} />}
      {currentStep === 4 && <SuccessPage/>}
    </div>
  );
};

export default AddCourseHome;
