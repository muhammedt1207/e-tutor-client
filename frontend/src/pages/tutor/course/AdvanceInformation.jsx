import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { AiOutlineDelete, AiOutlinePlus, AiOutlineUpload } from 'react-icons/ai';
import toast from 'react-hot-toast';
import defaultImg from '../../../assets/default.jpg';
import { Oval } from 'react-loader-spinner';
import ImageUpdload from '../../../util/ImageUpdload';
import VideoUpload from '../../../util/VideoUploed';
import { DotLoader } from 'react-spinners';

const AdvanceInformation = ({ onNext,initialData }) => {
    console.log(initialData,'initail data in advanced datasss');
    const [thumbNailImg, setThumbNailImg] = useState(initialData.imageUrl||'');
    const [loading, setLoading] = useState(false);
    const [videoUrl, setVideoUrl] = useState(initialData.videoUrl||'');
    const [loadingImage, setLoadingImage] = useState(false);

    const initialValues = {
        description:initialData.description ||'',
        teachings:initialData.teachings|| ['']
    };

    const onSubmit = (values) => {
        if (!thumbNailImg) {
            toast.error('Add Thumbnail');
            return;
        } else if (!videoUrl) {
            toast.error('Add Introduction video');
            return;
        }

        const data = {
            videoUrl: videoUrl,
            imageUrl: thumbNailImg,
            ...values
        };

        onNext(data);
    };

    const handleAddInput = (values, setValues) => {
        const newTeachings = [...values.teachings, ''];
        setValues({ ...values, teachings: newTeachings });
    };

    const handleThumbnail = async (event) => {
        event.stopPropagation();
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.jpg, .jpeg, .png';
        input.click();
        input.addEventListener('change', async (event) => {
            const file = event.target.files[0];
            if (!file || !file.type.startsWith('image/')) {
                toast.error('Please upload a valid image file');
                setLoading(false);
                return;
            }
            setLoadingImage(true)
            const imgUrl = await ImageUpdload(file);
            setThumbNailImg(imgUrl);
            setLoadingImage(false)
        });
    };

    const handleVideoUpload = async (event) => {
        event.stopPropagation();
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'video/mp4, video/x-m4v, video/*';
        input.click();
    
        input.addEventListener('change', async (event) => {
            const file = event.target.files[0];
    
            if (!file || !file.type.startsWith('video/')) {
                toast.error('Please upload a valid video file');
                return;
            }
    
            setLoading(true);
            try {
                const url = await VideoUpload(file);
                if (!url) {
                    throw new Error('Video upload failed');
                }
                setVideoUrl(url);
                toast.success('Video uploaded successfully');
            } catch (error) {
                toast.error(error.message || 'An error occurred during video upload');
            } finally {
                setLoading(false);
            }
        });
    };
    

    return (
        <div className='flex justify-center items-center lg:ml-46 ml-52 p-16 pe-10 '>
            <div className='w-full h-1/2 ps-10 pe-10'>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    enableReinitialize
                >
                    {({ values, setValues }) => (
                        <Form>
                            <div>
                                <h1 className='text-2xl font-semibold'>Advance Informations</h1>
                                <hr />
                                <div className='pt-10 flex gap-5 py-10'>
                                    {/* Course Thumbnail */}
                                    <div className=''>
                                        <h2 className='text-xl font-semibold mt-6'>Course Thumbnail</h2>
                                        <div className='mt-6 flex'>
                                            {loadingImage ? (
                                                <div className='w-60 h-44 flex justify-center items-center'>
                                                    <DotLoader color="#FFA500" />
                                                </div>
                                            ) : (
                                                <img src={thumbNailImg || defaultImg} className='w-60 h-44 object-cover rounded-sm ' alt="" />
                                            )}
                                            <div className='ps-4 w-80 p-2'>
                                                <p className=''>Upload your course Thumbnail here. <strong>Important guidelines:</strong> 1200x800 pixel or 12:8 ratio. Support format: <strong>.jpg, .jpeg, or .png</strong></p>
                                                <button type='button' className='p-2 mt-2 bg-orange-100 text-orange-500 flex items-center' onClick={(e) => handleThumbnail(e)}>
                                                    Upload Image <AiOutlineUpload className="ml-2 text-2xl" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Course Video */}
                                    <div className=''>
                                        <h2 className='text-xl font-semibold mt-6'>Course Video</h2>
                                        <div className='mt-6 flex'>
                                            {loading ? (
                                                <div className='w-60 h-44 flex justify-center items-center'>
                                                    <DotLoader color="#FFA500" />
                                                </div>
                                            ) : videoUrl ? (
                                                <video className='w-60 h-44 rounded-sm' controls>
                                                    <source src={videoUrl} type='video/mp4' />
                                                    Your browser does not support the video tag.
                                                </video>
                                            ) : (
                                                <img src={defaultImg} className='w-60 h-44 object-cover rounded-sm ' alt="" />
                                            )}
                                            <div className='ps-4 w-80 p-2'>
                                                <p className=''>Upload your course video here. <strong>Important guidelines:</strong> Support format: <strong>.mp4</strong></p>
                                                <button type='button' className='p-2 mt-2 bg-orange-100 text-orange-500 flex items-center' onClick={(e) => handleVideoUpload(e)}>
                                                    Upload Video <AiOutlineUpload className="ml-2 text-2xl" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
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
                                <div className='flex flex-col w-full'>
                                    <div className='flex w-full justify-between'>
                                        <h1 className='text-xl font-semibold'>What you will teach in this course</h1>
                                        <button type="button" onClick={() => handleAddInput(values, setValues)} className='flex items-center p-2 mt-2 bg-orange-100 text-orange-500'>
                                            Add Teaching
                                            <AiOutlinePlus className="ml-1" />
                                        </button>
                                    </div>
                                    <div className="w-full">
                                        <FieldArray name="teachings">
                                            {({ remove }) => (
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
                                    <button type="submit" className='p-4 bg-orange-500 text-white'>Save & Next</button>
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
