import { useEffect, useState } from "react";

const LessonList = ({ lessons, onSubLessonClick }) => {
    const [expandedLessons, setExpandedLessons] = useState([]);
    const [lesson, setLessons] = useState([]);

    const toggleLesson = (index) => {
        setExpandedLessons((prev) => {
            const updatedExpandedLessons = [...prev];
            updatedExpandedLessons[index] = !prev[index]; 
            return updatedExpandedLessons; 
        });
    };

    useEffect(() => {
        if (lessons) { 
            setExpandedLessons(lessons.map(() => false));
            setLessons(lessons);
        }
    }, [lessons]);

    if (!lessons) return null; 

    return (
        <div className="w-full max-w-md mx-auto mt-10">
            {expandedLessons.map((isExpanded, index) => ( 
                <div key={index} className="mb-4 bg-white shadow-md rounded-lg">
                    <div className="p-4 flex justify-between items-center cursor-pointer" onClick={() => toggleLesson(index)}>
                        <div>
                            <h2 className="text-lg font-semibold">{lessons[index].name}</h2> 
                            <p className="text-sm text-gray-500">{lessons[index].SubLesson.length} Lectures</p>
                        </div>
                        <div className='p-4'>
                            {isExpanded ? (
                                <span className="text-xl font-bold">−</span>
                            ) : (
                                <span className="text-xl font-bold">+</span>
                            )}
                        </div>
                    </div>
                    <div
                        className={`overflow-hidden transition-hight duration-500 ease-in-out ${isExpanded ? 'max-h-screen' : 'max-h-0'}`}
                    >
                        {lessons[index].SubLesson.map((subLesson, subIndex) => (
                            <div key={subIndex} className="p-4 flex justify-between items-center bg-gray-50" onClick={() => onSubLessonClick(subLesson.videoUrl)}>
                                <div>
                                    <h3 className="text-sm">{subLesson.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LessonList;
