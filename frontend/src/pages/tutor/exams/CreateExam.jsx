import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { URL } from '../../../Common/api';
import axios from 'axios';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';

const CreateExam = () => {
    const navigate=useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search); 
    const courseId = searchParams.get('courseId');
    console.log(courseId,'course id for //////////////////////////////////////');
  const [questions, setQuestions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const res = await axios.get(`${URL}/course/exam/${courseId}`);
        console.log(res.data);
        if (res.data.data.exams) {
            const formattedQuestions = res.data.data.exams.map((q) => ({
                question: q.question,
                option1: q.options.option1,
                option2: q.options.option2,
                option3: q.options.option3,
                option4: q.options.option4,
                correctOption: q.correctOption,
            }));
            setQuestions(formattedQuestions);
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch exam data');
      }
    };
    
    fetchExamData();
  }, [courseId]);
  const formik = useFormik({
    initialValues: {
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctOption: 'option1',
    },
    validationSchema: Yup.object({
      question: Yup.string().required('Question is required'),
      option1: Yup.string().required('Option 1 is required'),
      option2: Yup.string().required('Option 2 is required'),
      option3: Yup.string().required('Option 3 is required'),
      option4: Yup.string().required('Option 4 is required'),
    }),
    onSubmit: (values) => {
      if (editIndex !== null) {
        const updatedQuestions = questions.map((q, index) =>
          index === editIndex ? values : q
        );
        setQuestions(updatedQuestions);
        setEditIndex(null);
      } else {
        setQuestions([...questions, values]);
      }
      formik.resetForm();
    },
  });

  const editQuestion = (index) => {
    formik.setValues(questions[index]);
    setEditIndex(index);
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const submitExam=async()=>{
    if(questions.length==0){
        toast.error("Please add at least One Question");
        return
    }
  
    try {
        const res=await axios.post(`${URL}/course/exam`,{courseId,questions})
        console.log(res.data);
        if(res.data.success){
            navigate(-1)
        }
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="sm:rounded-lg flex flex-col lg:ml-44 ml-52 w-[85vw] h-full pe-4 ps-16">
        <div className='flex justify-between my-5'>
        <h1 className="text-3xl font-semibold mb-4">Create Exam</h1>
        <button onClick={submitExam} className='p-2 bg-orange-500 text-white  font-bold rounded'>Creat Exam</button>
        
        </div>
        <hr />
        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Question:</label>
            <input
              type="text"
              name="question"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.question}
              className="w-full p-2 border rounded"
            />
            {formik.touched.question && formik.errors.question ? (
              <div className="text-red-500 text-sm">{formik.errors.question}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Option 1:</label>
            <input
              type="text"
              name="option1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.option1}
              className="w-full p-2 border rounded"
            />
            {formik.touched.option1 && formik.errors.option1 ? (
              <div className="text-red-500 text-sm">{formik.errors.option1}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Option 2:</label>
            <input
              type="text"
              name="option2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.option2}
              className="w-full p-2 border rounded"
            />
            {formik.touched.option2 && formik.errors.option2 ? (
              <div className="text-red-500 text-sm">{formik.errors.option2}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Option 3:</label>
            <input
              type="text"
              name="option3"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.option3}
              className="w-full p-2 border rounded"
            />
            {formik.touched.option3 && formik.errors.option3 ? (
              <div className="text-red-500 text-sm">{formik.errors.option3}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Option 4:</label>
            <input
              type="text"
              name="option4"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.option4}
              className="w-full p-2 border rounded"
            />
            {formik.touched.option4 && formik.errors.option4 ? (
              <div className="text-red-500 text-sm">{formik.errors.option4}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Correct Option:</label>
            <select
              name="correctOption"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.correctOption}
              className="w-full p-2 border rounded"
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              <option value="option4">Option 4</option>
            </select>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded w-full"
          >
            {editIndex !== null ? 'Save Question' : 'Add Question'}
          </button>
        </form>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Questions List</h2>
          <ul className="list-disc pl-5">
            {questions.map((q, index) => (
              <li key={index} className="mb-2 border p-6 ">
                <strong>Question {index + 1}:</strong> {q.question} <br />
                <strong>Options:</strong> {q.option1}, {q.option2}, {q.option3}, {q.option4} <br />
                <strong>Correct Option:</strong> {q[q.correctOption]} <br />
                <button
                  onClick={() => editQuestion(index)}
                  className="pe-4"
                >
                  <AiFillEdit className="text-2xl rounded mt-2" />
                </button>
                <button
                  onClick={() => deleteQuestion(index)}
                >
                  <AiFillDelete className="text-2xl rounded mt-2" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
