import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import defaultImg from '../../../assets/default.jpg';
import { AiOutlineDelete, AiOutlinePlus, AiOutlineUpload } from 'react-icons/ai';

const AdvanceInformation = ({ onNext }) => {
    const initialValues = {
        description: '',
        teachings: ['']
    };

    const onSubmit = (values) => {
        console.log(values);
        onNext(values);
        // Handle form submission here
    };

    const handleAddInput = (values, setValues) => {
        const newTeachings = [...values.teachings, ''];
        setValues({ ...values, teachings: newTeachings });
    };

    return (
        <div className='flex justify-center items-center lg:ml-46 ml-52 p-16 pe-10 '>
            <div className='w-full h-1/2 ps-10 pe-10'>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                >
                    {({ values, isSubmitting, setValues }) => (
                        <Form>
                            <div>
                                <h1 className='text-2xl font-semibold'>Advance Informations</h1>
                                <hr />
                                <div className='pt-10 flex gap-5 py-10'>
                                    {/* Course Thumbnail */}
                                    <div className=''>
                                        <h2 className='text-xl font-semibold mt-6'>Course Thumbnail</h2>
                                        <div className='mt-6 flex'>
                                            <img src={defaultImg} className='w-60 h-44 object-cover rounded-sm ' alt="" />
                                            <div className='ps-4 w-80 p-2'>
                                                <p className=''>Upload your course Thumbnail here. <strong> Important guidelines:</strong>1200x800 pixel or 12:8 ratio. Support format: <strong> .jpg, .jpeg, or .png</strong></p>
                                                <button className='p-2 mt-2 bg-orange-100 text-orange-500 flex items-center'>
                                                    Upload Image <AiOutlineUpload className="ml-2 text-2xl" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Course Thumbnail */}
                                    <div className=''>
                                        <h2 className='text-xl font-semibold mt-6'>Course Thumbnail</h2>
                                        <div className='mt-6 flex'>
                                            <img src={defaultImg} className='w-60 h-44 object-cover rounded-sm ' alt="" />
                                            <div className='ps-4 w-80 p-2'>
                                                <p className=''>Upload your course Thumbnail here. <strong> Important guidelines:</strong>1200x800 pixel or 12:8 ratio. Support format: <strong> .jpg, .jpeg, or .png</strong></p>
                                                <button className='p-2 mt-2 bg-orange-100 text-orange-500 flex items-center'>Upload Video<AiOutlineUpload className="ml-2 text-2xl" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className='' />
                                <div className='pt-10 py-10'>
                                    <h1 className='text-xl font-semibold'>Course Description</h1>
                                    <Field
                                        as="textarea"
                                        name="description"
                                        className='w-full h-44 p-5 border'
                                    />
                                    <ErrorMessage name="description" component="div" />
                                </div>
                                <hr />
                                <div className='flex flex-col w-full   '>
                                    <div className='flex w-full justify-between'>
                                        <h1 className='text-xl font-semibold'>What you will teach in this course</h1>
                                        <button type="button" onClick={() => handleAddInput(values, setValues)} className='flex items-center p-2 mt-2 bg-orange-100 text-orange-500'>
                                            Add Teaching
                                            <AiOutlinePlus className="ml-1" />
                                        </button>
                                    </div>
                                    <div className="w-full">
                                        <FieldArray name="teachings">
                                            {({ push, remove }) => (
                                                <>
                                                    {values.teachings.map((teaching, index) => (
                                                        <div key={index} className='mt-4 flex items-center'>
                                                            <Field
                                                                type="text"
                                                                name={`teachings.${index}`}
                                                                placeholder={`Teaching ${index + 1}`}
                                                                className='w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none'
                                                            />
                                                            <button type="button" onClick={() => remove(index)} className="text-red-500 ml-2">
                                                                <AiOutlineDelete />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                        </FieldArray>
                                    </div>
                                </div>
                                <div className='flex flex-row-reverse p-6'>
                                    <button type="submit" className='p-4 bg-orange-500 text-white' >Save & Next</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AdvanceInformation;
