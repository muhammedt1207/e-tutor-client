import React, { useEffect, useState } from "react";
import axios from 'axios';
import { URL } from "../../../../Common/api";
import { useNavigate } from "react-router-dom";

const LessonList = ({ lessons, onSubLessonClick, courseId, userId }) => {
    const navigate=useNavigate()
    const [expandedLessons, setExpandedLessons] = useState([]);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [allLessonsCompleted, setAllLessonsCompleted] = useState(false);

    useEffect(() => {
        if (lessons) {
            setExpandedLessons(lessons.map(() => false));
            fetchCompletedLessons();
        }
    }, [lessons]);

    useEffect(() => {
        checkAllLessonsCompleted();
        console.log(allLessonsCompleted,'all lesson completed');
    }, [completedLessons, lessons]);

    const fetchCompletedLessons = async () => {
        try {
            const response = await axios.get(`${URL}/course/enrollment/check`, {
                params: { userId, courseId },
            });
            console.log(response.data,'--');
            setCompletedLessons( response.data.data.isEnrolled[1][0]?.progress?.completedLessons || []);
        } catch (error) {
            console.error('Failed to fetch completed lessons', error);
        }
    };

    const toggleLesson = (index) => {
        setExpandedLessons((prev) => {
            const updatedExpandedLessons = [...prev];
            updatedExpandedLessons[index] = !prev[index];
            return updatedExpandedLessons;
        });
    };

    const handleSubLessonClick = async (lessonId, subLessonId, videoUrl) => {
        try {
            if (userId && courseId) {
                await axios.put(`${URL}/course/enrollment/progress`, {
                    userId,
                    courseId,
                    progress: {
                        lessonId,
                        subLessonId,
                    },
                });
                
                setCompletedLessons(prev => [...prev, { lessonId, subLessonId }]);
                onSubLessonClick(videoUrl);
            } else {
                console.log('User ID and Course ID not found');
            }
        } catch (error) {
            console.error('Failed to update progress', error);
        }
    };

    const checkAllLessonsCompleted = () => {
        const totalSubLessons = lessons.flatMap(lesson => lesson.subLessons).length;
        const completedSubLessons = completedLessons.length;
        console.log(totalSubLessons,'0000',completedLessons,'lessons list');
        setAllLessonsCompleted(totalSubLessons === completedSubLessons);
    };

    const handleExamClick = () => {
        navigate(`/exam/${courseId}`)
        console.log("Taking the exam...");
    };

    if (!lessons) return null;

    return (
        <div className="w-full max-w-md mx-auto mt-10">
            {lessons.map((lesson, lessonIndex) => (
                <div key={lesson._id} className="mb-4 bg-white shadow-md rounded-lg">
                    <div className="p-4 flex justify-between items-center cursor-pointer" onClick={() => toggleLesson(lessonIndex)}>
                        <div>
                            <h2 className="text-lg font-semibold">{lesson.name}</h2>
                            <p className="text-sm text-gray-500">{lesson.subLessons?.length} Lectures</p>
                        </div>
                        <div className='p-4'>
                            {expandedLessons[lessonIndex] ? (
                                <span className="text-xl font-bold">−</span>
                            ) : (
                                <span className="text-xl font-bold">+</span>
                            )}
                        </div>
                    </div>
                    <div
                        className={`overflow-hidden transition-height duration-500 ease-in-out ${expandedLessons[lessonIndex] ? 'max-h-screen' : 'max-h-0'}`}
                    >
                        {lesson.subLessons?.map((subLesson) => (
                            <div
                                key={subLesson._id}
                                className="p-4 flex justify-between items-center bg-gray-50 cursor-pointer"
                                onClick={() => handleSubLessonClick(lesson._id, subLesson._id, subLesson.videoUrl)}
                            >
                                <div>
                                    <h3 className="text-sm">{subLesson.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {allLessonsCompleted && (
                <div className="mt-10">
                    <button onClick={handleExamClick} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                        Take Exam
                    </button>
                </div>
            )}
        </div>
    );
};

export default LessonList;
