import { Form, Formik, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup'
import LoginImg from '../../assets/Saly-10.png'
import { googleSignup, login } from '../../redux/action/Auth/userAction';
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { user, loading, error } = useSelector((state) => state.user)


  function togglePasswordVisibility(fieldId) {
    if (fieldId === "password") {
      setPasswordVisible(!passwordVisible);
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  useEffect(() => {
    if (user) {
      console.log(user,'user data');
      navigate('/')
    }
  },[user])
  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values, '---------------------------');
    dispatch(login(values))

    setSubmitting(false);
  };
  const loginWithGoogle=async(data)=>{
    console.log('google login data .....',data);
    dispatch(googleSignup(data))
    navigate('/')
  }

  return (
    <div className='w-full flex flex-col lg:flex-row h-screen p-20 -mt-40'>
      <div className='hidden lg:block w-full lg:w-1/2  '>
        <img src={LoginImg} alt="" />
      </div>
      <div className='w-full lg:w-1/2 flex flex-col justify-center items-center'>
        <h1 className='text-4xl pt-52'>Sign in to your account</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',

          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className='flex flex-col content-center space-y-4 w-full p-12'>

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
              {error && <p className="text-red-500">{error}</p>}
           <Link to='/forgot'> <h1 className='text-blue-700'>Forgot password ?</h1></Link>
              <div className='flex flex-col  items-center'>
                <button type="submit" disabled={isSubmitting} className='border border-orange-400 text-white px-8 py-2 rounded-md bg-orange-500 hover:bg-orange-400 hover:text-white transition duration-300 ease-in-out w-full mt-4 mb-5'>Sign in Account</button>
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const data = jwtDecode(credentialResponse?.credential)
                    console.log(data, 'google auth data');
                    const userDataa={
                      email:data.email,
                      name:data.name
                    }
                    loginWithGoogle(userDataa);
                  }}
                  onError={() => {
                    console.log("login Failed");
                  }}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login
