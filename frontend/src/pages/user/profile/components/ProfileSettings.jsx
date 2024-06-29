import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, getUserData, logout, updateProfile } from '../../../../redux/action/userAction';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ImageUpdload from '../../../../util/ImageUpload';
import toast from 'react-hot-toast';
import { AiOutlineEdit } from 'react-icons/ai';
import { CircularProgress } from '@material-ui/core';
import VideoUpload from '../../../../util/VideoUploed';


const ProfileSettings = () => {
    const { user, loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [img, setImg] = useState('');
    const [imgPublicId, setImgPublicId] = useState('');
    const [imgLoading, setLoading] = useState(false);
    
    const logoutHandler = async () => {
        console.log('user lougout working');
        dispatch(logout());
        navigate('/index');
    };

    const initialValue = {
        _id: user?._id,
        userName: user?.userName || '',
        phoneNumber: user?.phoneNumber || '',
    };

    const changeInitialValue = {
        email: user?.email,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    };

    const passwordValidationSchema = Yup.object().shape({
        oldPassword: Yup.string().required('Old password is required'),
        newPassword: Yup.string().required('New password is required').min(8, 'Password must be at least 6 characters long'),
        confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match').required('Confirm password is required'),
    });

    const validateSchema = Yup.object().shape({
        userName: Yup.string().required('Name is required'),
        phoneNumber: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').nullable(),
    });

    const handleSubmit = (values) => {
        let updatedValues = { ...values };
        if (img) {
            updatedValues = { ...values, profileImageUrl: img };
        }
        dispatch(updateProfile(updatedValues))
            .then(() => {
                toast.success('Update successful');
            });
    };

    const handleChangePasswordSubmit = (values) => {
        const data = { ...values, email: user.email };
        dispatch(changePassword(data)).then(() => {
            toast.success('Password Change Successful');
        });
    };

    useEffect(() => {
        if (!user) {
            dispatch(getUserData());
        }
    }, [dispatch, user]);

    const handleImageUpload = async (event) => {
        setLoading(true);
        const file = event.target.files[0];
        if (!file || !file.type.startsWith('image/')) {
            toast.error('Please upload a valid image file');
            setLoading(false);
            return;
        }
        
        const reader = new FileReader();

        reader.onloadend = async () => {
            const imageData = reader.result;
            const uploadResult = await ImageUpload(imageData);
            const imgUrl = uploadResult?.url;
            const imgPublicId = uploadResult?.public_id;

            if (!imgUrl) {
                toast.error('Image upload failed');
                setLoading(false);
                return;
            }

            setImg(imgUrl);
            setImgPublicId(imgPublicId);
            toast.success('Profile image uploaded');
            setLoading(false);

            if (user?.profileImageUrl && user?.profileImagePublicId) {
                // await deleteImageFromCloudinary(user.profileImagePublicId);
            }
        };

        if (file) {
            reader.readAsDataURL(file);
            setIsUploadingImage(true);
        }
    };

    return (
        <div>
            <h1 className='text-xl font-bold p-5'>Account Settings</h1>
            <div className='flex flex-col lg:flex-row'>
                <div className='w-1/2'>
                    {imgLoading ? (
                        <div className="flex items-center justify-center pt-24">
                            <CircularProgress color="primary" />
                        </div>
                    ) : (
                        user && user.profileImageUrl ? (
                            <div className="relative">
                                <img src={user.profileImageUrl} alt="Profile" className='w-72 h-96 object-cover rounded-sm ms-24 lg:ms-22' />
                                <div className='absolute inset-0 flex items-center justify-center'>
                                    <label htmlFor="fileInput" className='bg-gray-600 bg-opacity-50 hover:bg-opacity-75 text-white font-bold py-2 px-4 rounded cursor-pointer'>
                                        <AiOutlineEdit />
                                    </label>
                                    <input
                                        id="fileInput"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />
                                </div>
                            </div>

                        ) : (
                            <div className={`flex items-center w-full pt-10 ps-32`}>
                                {!isUploadingImage && (
                                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-64 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input id="dropzone-file" type="file" onChange={handleImageUpload} class="hidden" />
                                    </label>
                                )}
                            </div>
                        )
                    )}

                </div>
                <div className='w-4/5 pr-20 ps-8'>
                    <Formik
                        initialValues={initialValue}
                        validationSchema={validateSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        <Form>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <Field type="text" id="userName" name="userName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                <ErrorMessage name="userName" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" value={user?.email} readOnly id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                <Field type="text" id="phoneNumber" name="phoneNumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm" />
                            </div>
                            <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 mt-10 px-4">Save Changes</button>
                        </Form>
                    </Formik>
                </div>
            </div>
            <div className='pt-10'>
                <h1 className='p-5 text-xl font-bold'>Change Password</h1>
                <div className='p-10'>
                    <Formik
                        initialValues={changeInitialValue}
                        validationSchema={passwordValidationSchema}
                        onSubmit={handleChangePasswordSubmit}
                    >
                        <Form>
                            <div class="mb-6">
                                <label for="oldPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old password</label>
                                <Field type="password" id="oldPassword" name='oldPassword' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Old Password" required />
                                <ErrorMessage name="oldPassword" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div class="mb-6">
                                <label for="newPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>
                                <Field type="password" id="newPassword" name='newPassword' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="New Password" required />
                                <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div class="mb-6">
                                <label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <Field type="password" id="confirmPassword" name='confirmPassword' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Confirm Password" required />
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                            </div>

                            <button type='submit' className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 mt-10 px-4">Save Changes</button>
                            <button type='button' className="bg-red-500 m-5 hover:bg-orange-700 text-white font-bold py-2 mt-10 px-4" onClick={logoutHandler}>Logout</button>
                        </Form>
                    </Formik>
                </div>

            </div>
        </div>
    )
}

export default ProfileSettings;
