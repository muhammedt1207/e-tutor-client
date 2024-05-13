import React, { useState, useRef, useEffect } from 'react';
import { commonRequest } from '../../Common/api';
import { appJson } from '../../Common/configurations';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { signup } from '../../redux/action/Auth/userAction';

const OTPPage = ({ email, signupDispatch,error }) => {
    const [otp, setOTP] = useState(['', '', '', '']);
    const dispatch=useDispatch()
    const inputRefs = useRef([...Array(4)].map(() => React.createRef()));
    const [Error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [timer, setTimer] = useState(60)
    const [resendDisabled, setResendDisabled] = useState(false);
    const navigate = useNavigate()
    const handleOTPChange = (index, value) => {
        if (!isNaN(value) && value !== '') {
            const newOTP = [...otp];
            newOTP[index] = value;
            setOTP(newOTP);

            if (index < 3) {
                inputRefs.current[index + 1].current.focus();
            }
        }
        if (value.length === 0 && index > 0) {
            const newOTP = [...otp];
            newOTP[index] = '';
            setOTP(newOTP);
            inputRefs.current[index - 1].current.focus();
        }

        if (value.length === 1 && index < 3) {
            inputRefs.current[index + 1].current.focus();
        }
        if (value.length === 0 && index === 0) {
            const newOTP = [...otp];
            newOTP[index] = '';
            setOTP(newOTP);
        }
    };

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
        } else {
            setResendDisabled(false); 
        }

        return () => clearInterval(interval);
    }, [timer]);


    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            e.preventDefault();
            inputRefs.current[index - 1].current.focus();
        }
    };


    const handlePaste = (e, index) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').trim();
        if (pastedData.length === 4) {
            const newOTP = pastedData.split('');
            setOTP(newOTP);
        }
    };

    const handleSubmit = async (e) => {
        console.log('submit function clicked')
        e.preventDefault()

        let otpNumber = parseInt(otp.join(''));
        if (otpNumber.toString().split("").length < 4) {
            setError('Otp not valid')
            toast.error('please a enter valid otp')
            return
        } else {
            setError('')
        }
        setLoading(true)
        try {
            const res = await signupDispatch(otpNumber)
            console.log(res, 'signup dispatch response');
            if (res.payload.success) {
                console.log('signup successful', res);
                toast.success("Signup success")
                navigate('/')
            } else {
                console.log('otm  invalid');
                toast.error('Invalid OTP ')
                setLoading(false)
            }
            if (res.success) {
                signup();
                console.log(res, '.............');
    
            } else {
                setError(res.response.data.error)
                setLoading(false)
            }
        } catch (error) {
            console.log(error, 'signup error');
            toast.error('Signup failed')
        } finally {
            setLoading(false)
        } 
    }

    const handleResendOTP = async () => {
        
        setResendDisabled(true); 
        try {
           
            setTimer(60); 
            dispatch(signup({email}))
            .then(()=>{
                toast.success("OTP has been rended")
            })
            .catch((error)=>{
                toast.error("Failed to resend OTP")
            })
          
        } catch (error) {
            toast.error('Failed to resend OTP');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen w-52">
            <div className="bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
                <div className="flex justify-center items-center space-x-4">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={isNaN(digit) ? '' : digit}
                            onChange={(e) => handleOTPChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={(e) => handlePaste(e, index)}
                            className="w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            ref={inputRefs.current[index]}
                        />


                    ))}
                </div>
                <button
                    type='submit'
                    className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    onClick={
                        handleSubmit
                    }
                >
                    Verify OTP
                </button>
                {timer > 0 && (
                    <p className="text-gray-600 mt-2">
                        Resend OTP in {timer} seconds
                    </p>
                )}
                {timer === 0 && (
                    <button
                        className="text-blue-500 hover:underline focus:outline-none mt-2"
                        onClick={handleResendOTP}
                        disabled={resendDisabled}
                    >
                        Resend OTP
                    </button>
                )}
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default OTPPage;
