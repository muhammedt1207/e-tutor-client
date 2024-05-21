import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Signupbg from "../../assets/Saly-1.png";
import { useDispatch, useSelector } from 'react-redux';
import { googleSignup, signup } from '../../redux/action/userAction';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import OTPPage from './OtpComponent';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
function Signup() {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const { user, loading, error } = useSelector((state) => state.user);
    const [emailSec, setEmailSec] = useState(true);
    const [otpSec, setOtpSec] = useState(false);
    const [userData, setUserData] = useState({
        email: '',
        userName: '',
        password: ''
    });
    const [loadingg, setLoading] = useState(false)
    function togglePasswordVisibility(fieldId) {
        if (fieldId === "password") {
            setPasswordVisible(!passwordVisible);
        } else if (fieldId === "confirmPassword") {
            setConfirmPasswordVisible(!confirmPasswordVisible);
        }
    }

    const validationSchema = Yup.object().shape({
        userName: Yup.string().trim().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must contain 8 Characters, One UpperCase, One Number and One Special Case Character"
        ).required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        console.log("user data :", values);
        setLoading(true)
        const formData = new FormData();
        formData.append('username', userData.userName ?? "")
        formData.append("email", userData.email ?? "")
        formData.append('password', userData.password)
        formData.append('confirmPassword', userData.password)

        try {
            console.log(formData, '111111111111111111111');
            const result = await dispatch(signup(values))
            if (result.meta.requestStatus === 'fulfilled') {
                console.log("signup result fufilled");
                if (result.payload.success) {
                    setLoading(false);
                    toast.success('otp sent successfully')
                    setUserData(values)
                    setOtpSec(true)
                } else {
                    toast.error("Signup failed")
                }
            } else if (result.meta.requestStatus == "rejected") {
                const errorResponse = result.payload
                toast.error(errorResponse.response.data.error || "Signup failed!")
            }
        } catch (error) {
            console.log(error)
            toast.error("signup failed")
        } finally {
            loadingg(false)
        }

    };
    const signupDispatch = async (otp) => {
        console.log('inside of signup dispatch datas:', userData);
        let formData = {}
        formData.userName = userData.userName
        formData.email = userData.email
        formData.password = userData.password
        formData.confirmPassword = userData.password
        if (otp) {
            formData.otp = otp
        }
        console.log(formData, '2222222222222222222222222222222222222222222');
        return await dispatch(signup(formData))
    }


    const loginWithGoogle = (value) => {
        dispatch(googleSignup(value));
        navigate('/')
    };

    return (
        <div className='w-full flex flex-col lg:flex-row h-screen p-28 -mt-20'>
            <div className='hidden lg:block w-full lg:w-1/2  '>
                <img src={Signupbg} alt="" />
            </div>
            <div className='w-full lg:w-1/2 flex flex-col justify-center items-center'>
                <h1 className='text-4xl pt-52'>Create Your Account</h1>
                {otpSec ? (
                    <OTPPage email={userData.email} error={error} signupDispatch={signupDispatch} />
                ) : (
                    <Formik
                        initialValues={{
                            userName: '',
                            email: '',
                            password: '',
                            confirmPassword: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className='flex flex-col content-center space-y-4 w-full  ps-0'>
                                <div className='flex flex-col '>
                                    <label htmlFor="name">Name</label>
                                    <Field type="text" name="userName" className='w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500' />
                                    <ErrorMessage name="userName" component="div" className="text-red-500" />
                                </div>
                                <div className='flex flex-col '>
                                    <label htmlFor="email">Email</label>
                                    <Field type="email" name="email" className='w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500' />
                                    <ErrorMessage name="email" component="div" className="text-red-500" />
                                </div>
                                <div className='flex flex-col '>
                                    <label htmlFor="password">Password</label>
                                    <div className="relative">
                                        <Field type={passwordVisible ? "text" : "password"} name="password" className='w-full py-2 px-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500' />
                                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => togglePasswordVisibility("password")}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6a7.5 7.5 0 00-7.5 7.5M12 6a7.5 7.5 0 017.5 7.5" />
                                            </svg>
                                        </span>
                                    </div>
                                    <ErrorMessage name="password" component="div" className="text-red-500" />
                                </div>
                                <div className='flex flex-col '>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <div className="relative">
                                        <Field type={confirmPasswordVisible ? "text" : "password"} name="confirmPassword" className='w-full py-2 px-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500' />
                                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => togglePasswordVisibility("confirmPassword")}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6a7.5 7.5 0 00-7.5 7.5M12 6a7.5 7.5 0 017.5 7.5" />
                                            </svg>
                                        </span>
                                    </div>
                                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                                    {error && <p className="text-red-500">{error}</p>}
                                </div>
                                <div className='flex flex-col justify-center items-center space-x-10 gap-5'>
                                    <button type="submit" disabled={isSubmitting} className='border border-orange-400 text-orange-600 px-8 py-2 rounded-md hover:bg-orange-500 hover:text-white transition duration-300 ease-in-out w-full mt-4'>Create Account</button>
                                    <GoogleLogin
                                        onSuccess={(credentialResponse) => {
                                            const data = jwtDecode(credentialResponse?.credential);
                                            console.log(data, 'google auth data');
                                            loginWithGoogle(data);
                                        }}
                                        onError={() => {
                                            console.log("login Failed");
                                        }}
                                    />
                                    <Link to='/login' ><h1>you have already an account? <span className="text-blue-500">sign in</span></h1></Link>
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
        </div>
    );
}

export default Signup;
