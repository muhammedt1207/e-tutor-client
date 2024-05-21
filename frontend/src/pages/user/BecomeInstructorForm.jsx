import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { instructorApplication } from '../../redux/action/instructorAction';
import { useSelect } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const BecomeInstructorForm = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {user,error}=useSelector((state)=>state.user)
    const categoryOptions = [
        { value: 'programming', label: 'Programming' },
        { value: 'design', label: 'Design' },
    ];

    const initialValues = {
        selectedCategories: [],
        profileDescription: '',
        githubLink: '',
        linkedinLink: '',
    };

    const validationSchema = Yup.object().shape({
        selectedCategories: Yup.array().required('Please select at least one category.'),
        profileDescription: Yup.string().required('Please provide a profile description.'),
        githubLink: Yup.string().url('Please provide a valid URL for the GitHub link (optional).'),
        linkedinLink: Yup.string().url('Please provide a valid URL for the LinkedIn profile link (optional).'),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        console.log('Form values:', values);
        setSubmitting(false);
            const selectedCategoryValues = values.selectedCategories.map(category => category.value);

            const data = {
            profession: selectedCategoryValues,
            profileDescription: values.profileDescription,
            githubLink: values.githubLink,
            linkedinLink: values.linkedinLink,
        };
    
        console.log('instructor application data:', data);
        dispatch(instructorApplication(data))
        .then(()=>{
            toast.success('Application Sended')
            navigate('/')
        })
    };
    

    return (
        <div>
            <div className=' flex flex-col items-center justify-center w-full h-screen'>
                <h1 className='text-4xl font-medium lg:-mt-20 '>Fill the Form Apply</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form>
                            <div className='w-full pt-5'>
                                <h1 className='text-xl py-3'>Select the Subject you will teach</h1>
                                <hr />
                                <Field name='selectedCategories'>
                                    {({ field }) => (
                                        <Select
                                            {...field}
                                            options={categoryOptions}
                                            onChange={(value) => setFieldValue('selectedCategories', value)}
                                            placeholder='Select categories...'
                                            isMulti
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name='selectedCategories' component='div' className='text-red-500' />
                            </div>
                            <div className='w-full pt-5'>
                                <h1 className='text-xl py-3'>Profile Description</h1>
                                <hr />
                                <Field name='profileDescription'>
                                    {({ field }) => (
                                        <textarea
                                            {...field}
                                            placeholder='Enter your profile description...'
                                            className='w-full border rounded px-3 py-2'
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name='profileDescription' component='div' className='text-red-500' />
                            </div>
                            <div className='w-full pt-5'>
                                <h1 className='text-xl py-3'>GitHub Link (Optional)</h1>
                                <hr />
                                <Field name='githubLink'>
                                    {({ field }) => (
                                        <input
                                            {...field}
                                            type='url'
                                            placeholder='Enter your GitHub link (optional)...'
                                            className='w-full border rounded px-3 py-2'
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name='githubLink' component='div' className='text-red-500' />
                            </div>
                            <div className='w-full pt-5'>
                                <h1 className='text-xl py-3'>LinkedIn Profile Link (Optional)</h1>
                                <hr />
                                <Field name='linkedinLink'>
                                    {({ field }) => (
                                        <input
                                            {...field}
                                            type='url'
                                            placeholder='Enter your LinkedIn profile link (optional)...'
                                            className='w-full border rounded px-3 py-2'
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name='linkedinLink' component='div' className='text-red-500' />
                            </div>
                            <button type='submit'  disabled={isSubmitting} className='mt-5 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded'>
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default BecomeInstructorForm;
