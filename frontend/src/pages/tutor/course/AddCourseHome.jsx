import React, { useState } from 'react';
import AddCourse from './AddCourse';
import AdvanceInformation from './AdvanceInformation';
import AddCurriculum from './AddCurriculam';

const AddCourseHome = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState({
    addCourseData: {},
    advanceInformationData: {},
    addCurriculumData: {}
  });

  const handleNextAddCourse = (data) => {
    console.log(data,'10000000000000');
    setCourseData(prevData => ({
      ...prevData,
      addCourseData: data
    }));
    console.log(courseData,'11111');
    setCurrentStep(prevStep => prevStep + 1);
  };

  const handleNextAdvanceInformation = (data) => {
    console.log(data,'0000000000');
    setCourseData(prevData => ({
      ...prevData,
      advanceInformationData: data
      
    }));
    console.log(courseData,'22222');
    setCurrentStep(prevStep => prevStep + 1);
  };

  const handleNextAddCurriculum = (data) => {
    setCourseData(prevData => ({
      ...prevData,
      addCurriculumData: data
    }));
    console.log(courseData,'33333');
    setCurrentStep(prevStep => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  return (
    <div>
      {currentStep === 1 && <AddCourse onNext={handleNextAddCourse} />}
      {currentStep === 2 && <AdvanceInformation onPrev={handlePrev} onNext={handleNextAdvanceInformation} />}
      {currentStep === 3 && <AddCurriculum onPrev={handlePrev} onNext={handleNextAddCurriculum} />}
    </div>
  );
};

export default AddCourseHome;
