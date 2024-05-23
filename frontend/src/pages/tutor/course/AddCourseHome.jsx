import React, { useEffect, useState } from 'react';
import AddCourse from './AddCourse';
import AdvanceInformation from './AdvanceInformation';
import AddCurriculum from './AddCurriculam';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse, editCourse, getCourse } from '../../../redux/action/courseAction';
import SuccessPage from './SuccessPage';
import SideBar from '../components/SideBar';
import { getUserData } from '../../../redux/action/userAction';
import { useParams, useSearchParams } from 'react-router-dom';

const AddCourseHome = () => {
  // const {courseId}=useParams()
  const params=new URLSearchParams(window.location.search)
  const courseId=params.get('courseId')
  console.log(courseId,'course id fot editing courses');
  const dispatch=useDispatch()
  const {user}=useSelector((state)=>state.user)
  const {data} =useSelector((state)=>state.courses)
  const [currentStep, setCurrentStep] = useState(1);
  const [isEditingMode,setIsEditingMode] =useState(false)
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
    if(courseId){
      console.log(courseId);
      setIsEditingMode(true)
      dispatch(getCourse(courseId))
    }
  dispatch(getUserData()).then(()=>{
    console.log(user,'^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
  })
    console.log(courseData, 'Updated course data');
    console.log(user,'>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  }, [])


  useEffect(() => {
    if (data && isEditingMode) {
      setCourseData({
        instructorData: {
          instructorRef: data.instructorRef,
          instructorName: data.instructorName
        },
        addCourseData: {
          title: data.title,
          subtitle: data.subtitle,
          category: data.category,
          topic: data.topic,
          amount: data?.amount
        },
        advanceInformationData: {
          description: data.description,
          teachings: data.teachings,
          videoUrl: data.trailer,
          imageUrl: data.thumbnail
        },
        addCurriculumData: {
          sections: data.lessons?.map(lesson => ({
            section: lesson.title,
            lectures: lesson.SubLesson
          }))
        }
      });
      console.log(courseData,'edit course data');
    }
  }, [ isEditingMode]);

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
    if (isEditingMode) {
      console.log(courseData,'data for uploading final data',courseId);
      dispatch(editCourse({courseId:courseId||courseData._id,courseData: courseData})).then(()=>{

        toast.success('Course updated');
      })
    } else {
      dispatch(createCourse(courseData));
      toast.success('Course added');
    }
   
    setCurrentStep(prevStep => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  return (
    <div>
      <SideBar/>
      {currentStep === 1 && <AddCourse onNext={handleNextAddCourse} initialData={courseData.addCourseData}/>}
      {currentStep === 2 && <AdvanceInformation onPrev={handlePrev} initialData={courseData.advanceInformationData} onNext={handleNextAdvanceInformation} />}
      {currentStep === 3 && <AddCurriculum onPrev={handlePrev} onNext={handleNextAddCurriculum} initialData={courseData.addCurriculumData} />}
      {currentStep === 4 && <SuccessPage/>}
    </div>
  );
};

export default AddCourseHome;
