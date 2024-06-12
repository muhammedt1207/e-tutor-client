import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExamByCourseId } from '../../../redux/action/ExamsActions';
import { useParams } from 'react-router-dom';
import { URL } from '../../../Common/api';
import axios from 'axios';

const Exam = () => {
    const { courseId } = useParams();
    console.log(courseId, 'course id in exam ');
    const dispatch = useDispatch();
    const { exams, loading } = useSelector((state) => state.exams);
    const [questions, setQuestions] = useState([]);
    const {user}=useSelector((state)=>state.user)
    useEffect(() => {
        const fetchExam = async () => {
            if (courseId) {
                console.log(courseId,'./././././');
                dispatch(getExamByCourseId(courseId)).then((response) => {
                    console.log(response);
                    if (response.payload.success) {
                        const formattedQuestions = response.payload.data.exams.map((exam) => ({
                            question: exam.question,
                            options: Object.values(exam.options),
                        }));
                        setQuestions(formattedQuestions);
                    } else {
                        console.log('Error fetching exams');
                    }
                });
            } else {
                console.log('courseId not found');
            }
        };
        fetchExam();
    }, [courseId, dispatch]);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [isFinished, setIsFinished] = useState(false);

    const handleNext = () => {
        if (selectedOptions[currentQuestionIndex] !== undefined) {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                setIsFinished(true);
            }
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleOptionChange = (index) => {
        setSelectedOptions({
            ...selectedOptions,
            [currentQuestionIndex]: index,
        });
    };

    const handleFinish =async () => {
        const results = questions.map((question, index) => ({
            question: question.question,
            selectedOption: question.options[selectedOptions[index]],
        }));
        try {
            const queryParams = new URLSearchParams({
                courseId,
                userId:user._id,
            });
    
            const response = await axios.post(`${URL}/course/exam/submit?${queryParams}`, results);
            if (response.data.data.success) {
                console.log('Exam results submitted successfully');
            } else {
                console.log('Error submitting exam results');
            }
        } catch (error) {
            console.error('Error submitting exam results:', error);
        }
       
    };

    if (loading || !questions.length) {
        return <div>Loading...</div>;
    }

    const { question, options } = questions[currentQuestionIndex];
    const completionPercentage = Math.floor(((currentQuestionIndex + 1) / questions.length) * 100);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg w-3/4">
                <div className="bg-orange-50 p-6 rounded-t-lg">
                    <h1 className="text-lg font-semibold text-center">Tests</h1>
                    <div className="flex justify-between items-center mt-4">
                        <div className="w-full bg-gray-300 h-2 rounded">
                            <div
                                className="bg-orange-600 h-2 rounded"
                                style={{ width: `${completionPercentage}%` }}
                            ></div>
                        </div>
                        <span className="ml-4 text-sm">
                            {completionPercentage}%
                        </span>
                    </div>
                </div>
                <div className="p-6">
                    <div className="mt-4">
                        <p className="text-md font-semibold">Question {currentQuestionIndex + 1}</p>
                        <p className="mt-2">{question}</p>
                        <div className="mt-4">
                            {options.map((option, index) => (
                                <label
                                    key={index}
                                    className={`block p-2 rounded mt-2 ${selectedOptions[currentQuestionIndex] === index
                                        ? 'bg-orange-200'
                                        : 'bg-gray-100 hover:bg-orange-200'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name={`question${currentQuestionIndex}`}
                                        className="mr-2"
                                        checked={selectedOptions[currentQuestionIndex] === index}
                                        onChange={() => handleOptionChange(index)}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center space-x-2 items-center mt-6">
                        <button
                            onClick={handlePrevious}
                            className="bg-gray-400 text-white py-2 px-4 rounded"
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNext}
                            className="bg-gray-400 text-white py-2 px-4 rounded"
                            disabled={selectedOptions[currentQuestionIndex] === undefined}
                        >
                            Next
                        </button>
                    </div>
                    {isFinished && (
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handleFinish}
                                className="bg-orange-600 text-white py-2 px-8 rounded font-bold"
                            >
                                Finish
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Exam;
