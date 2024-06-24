import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../../Common/api';
import { appJson } from '../../../Common/configurations';

const AddCourse = ({onNext,initialData}) => {
    console.log(initialData,'initial data for ');
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    // useEffect(() => {
    //     // Fetch categories from API and update state
    //     const fetchData = async () => {
    //         try {
    //             // Replace this with your actual API call to fetch categories
    //             const response = await fetch('YOUR_API_ENDPOINT');
    //             const data = await response.json();
    //             setCategories(data);
    //         } catch (error) {
    //             console.error('Error fetching categories:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    useEffect(()=>{
        const categoryData =async()=>{
            try {
                const response =await axios.get(`${URL}/course/category`,appJson)
                setCategories(response.data.data)
                console.log(categories,'-------------------------------------------',response);
            } catch (error) {
                
            }
        }
        categoryData()
    },[])

    const initialValues = {
        title: initialData.title || '',
        subtitle: initialData.subtitle || '',
        category: initialData.category || '',
        topic: initialData.topic || '',
        amount: initialData.amount || ''
      };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        subtitle: Yup.string().required('Subtitle is required'),
        category: Yup.string().required('Category is required'),
        topic: Yup.string().required('Topic is required'),
        amount:Yup.number().required('Price is required')
    });

    const handleSubmit = (values) => {
        console.log(values);
        onNext(values)
    };

    return (
        <div className='flex justify-center items-center lg:ml-46 ml-52 p-16 pe-10'>
            <div className='w-5/6 h-1/2 ps-10 pe-10'>
                <div>
                    <h1 className='text-2xl font-semibold'>Basic Information</h1>
                    <hr />
                    <div className='pt-10'>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize
                        >
                            <Form>
                                <div className="mb-6">
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                    <Field type="text" id="title" name="title" placeholder='Your course Title' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    <ErrorMessage name="title" component="div" className="text-red-500 text-xs mt-1" />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="subtitle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subtitle</label>
                                    <Field type="text" id="subtitle" name="subtitle" placeholder='Your course Subtitle' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    <ErrorMessage name="subtitle" component="div" className="text-red-500 text-xs mt-1" />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Category</label>
                                    <Field as="select" id="category" name="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="">Select a category</option>
                                        {categories.map((category) => (
                                            <option key={category._id} value={category._id}>{category.categoryName}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="category" component="div" className="text-red-500 text-xs mt-1" />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="topic" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Topic</label>
                                    <Field type="text" id="topic" name="topic" placeholder='What is primarily taught in your course?' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    <ErrorMessage name="topic" component="div" className="text-red-500 text-xs mt-1" />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course Price</label>
                                    <Field type="number" id="amount" name="amount" placeholder='price of the course' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    <p className='text-gray-500'>E-tutor will take 10% of the Course Profit</p>
                                    <ErrorMessage name="amount" component="div" className="text-red-500 text-xs mt-1" />
                                </div>
                                <div className="flex justify-between">
                                    <button type="button" className='py-4 px-8 border shadow-sm rounded-md my-3 bg-white' onClick={() => navigate(-1)}>Cancel</button>
                                    <button type="submit" className='py-4 px-8 bg-orange-500 text-white my-3 ml-4'>Save & Next</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCourse;
