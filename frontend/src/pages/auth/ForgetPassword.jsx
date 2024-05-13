import React, { useState } from 'react';
import forgotImg from '../../assets/email.png';
import axios from 'axios';
import { URL } from '../../Common/api';
import { CircularProgress } from '@material-ui/core';
import toast from 'react-hot-toast';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); 

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSendMail = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${URL}/auth/forgotPassword`, { email });
            console.log(response.data);
            toast.success('Email sent successfully!');
            setShowSuccessMessage(true); 
        } catch (error) {
            console.error('Error sending email:', error);
            toast.error('Error sending email. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-row'>
            <div className='w-1/2 flex items-center justify-center h-screen'>
                <img src={forgotImg} className='w-2/3' alt="" />
            </div>
            <div className='flex items-center w-1/2 flex-col justify-center'>
                <h1 className='text-3xl font-semibold'>Enter your Email</h1>
                <div className='flex flex-col w-3/4 h-10'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} onChange={handleEmailChange} placeholder='Enter your email' className='w-full py-2 h-full px-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500' />
                </div>
                <button type="button" onClick={handleSendMail} className='border border-orange-400 text-white px-8 py-2 rounded-md bg-orange-500 hover:bg-orange-400 hover:text-white transition duration-300 ease-in-out mt-10 mb-5'>
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Mail'}
                </button>
                {showSuccessMessage && (
                    <p className="text-green-600">Check your email for the password reset link.</p>
                )}
            </div>
        </div>
    );
};

export default ForgetPassword;
