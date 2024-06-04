import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { instructorApplication } from '../../redux/action/instructorAction';
import { useNavigate } from 'react-router-dom';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import toast from 'react-hot-toast';
import ImageUpload from '../../util/ImageUpload';

const BecomeInstructorForm = () => {
    const [idFile, setIdFile] = useState(null);
    const [qualificationFile, setQualificationFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [loading,setLoading]=useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, error } = useSelector((state) => state.user);

    const categoryOptions = [
        { value: 'programming', label: 'Programming' },
        { value: 'design', label: 'Design' },
    ];

    const initialValues = {
        selectedCategories: [],
        profileDescription: '',
        githubLink: '',
        linkedinLink: '',
        houseName: '',
        post: '',
        street: '',
        district: '',
        email: '',
    };

    const validationSchema = Yup.object().shape({
        selectedCategories: Yup.array().required('Please select at least one category.'),
        profileDescription: Yup.string().required('Please provide a profile description.'),
        githubLink: Yup.string().url('Please provide a valid URL for the GitHub link (optional).'),
        linkedinLink: Yup.string().url('Please provide a valid URL for the LinkedIn profile link (optional).'),
        houseName: Yup.string().required('Please provide your house name.'),
        post: Yup.string().required('Please provide your post.'),
        street: Yup.string().required('Please provide your street.'),
        district: Yup.string().required('Please provide your district.'),
        email: Yup.string().email('Please provide a valid email address.').required('Email is required.'),
    });

    const handleQualificationUpload = async (file) => {
        console.log(file, '---------------------------------------------------------');
        if (!file || !file.type.startsWith('image/')) {
          toast.error('Please upload a valid image file');
          setLoading(false);
          return;
        } 
        const reader = new FileReader();
        console.log('image '); 
        reader.onerror = () => {
          console.error('Error reading file:', reader.error);
          toast.error('An error occurred while reading the file');
          setLoading(false);
        }; 
    reader.onloadend = async () => {
          console.log('image2 ');
          const imageData = reader.result;
          console.log('image3 ');
          const uploadResult = await ImageUpload(imageData);
          console.log('image4 ');
          const imgUrl = uploadResult?.url;
          const imgPublicId = uploadResult?.public_id;
      
          if (!imgUrl) {
            toast.error('Image upload failed');
            setLoading(false);
            return;
          }
      
          console.log(imgUrl, '1111111111111111111111111');
          toast.success('Profile image uploaded');
          setLoading(false);
          setQualificationFile(imgUrl);
        };
      
        reader.readAsDataURL(file);
      };



    const handleIdFileUpload=async(file)=>{
      console.log(file, '---------------------------------------------------------');
        if (!file || !file.type.startsWith('image/')) {
          toast.error('Please upload a valid image file');
          setLoading(false);
          return;
        } 
        const reader = new FileReader();
        console.log('image '); 
        reader.onerror = () => {
          console.error('Error reading file:', reader.error);
          toast.error('An error occurred while reading the file');
          setLoading(false);
        }; 
    reader.onloadend = async () => {
          console.log('image2 ');
          const imageData = reader.result;
          console.log('image3 ');
          const uploadResult = await ImageUpload(imageData);
          console.log('image4 ');
          const imgUrl = uploadResult?.url;
          const imgPublicId = uploadResult?.public_id;
          if (!imgUrl) {
            toast.error('Image upload failed');
            setLoading(false);
            return;
          }
          console.log(imgUrl, '1111111111111111111111111');
          toast.success('Profile image uploaded');
          setLoading(false);
          setQualificationFile(imgUrl);
        };
        reader.readAsDataURL(file);
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        const selectedCategoryValues = values.selectedCategories.map(category => category.value);
        const data = {
            profession: selectedCategoryValues,
            profileDescription: values.profileDescription,
            githubLink: values.githubLink,
            linkedinLink: values.linkedinLink,
            address: {
                houseName: values.houseName,
                post: values.post,
                street: values.street,
                country: country,
                state: region,
                district: values.district,
            },
            email: values.email,
            idFileUrl: idFile,
            qualificationFileUrl:qualificationFile ,
        };

        console.log('instructor application data:', data);

        dispatch(instructorApplication(data))
            .then(() => {
                toast.success('Application Submitted');
                navigate('/');
            })
            .catch((error) => {
                toast.error('Application submission failed');
                setSubmitting(false);
            });
    };

    return (
        <div className='flex flex-col items-center justify-center w-full mt-28 py-20'>
            <h1 className='text-4xl font-medium lg:-mt-20'>Fill the Form to Apply</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form className='w-full max-w-2xl'>
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
                        <div className='w-full pt-5 grid grid-cols-2 gap-4'>
                            <div>
                                <h1 className='text-xl py-3'>House Name</h1>
                                <hr />
                                <Field name='houseName'>
                                    {({ field }) => (
                                        <input
                                            {...field}
                                            type='text'
                                            placeholder='Enter your house name...'
                                            className='w-full border rounded px-3 py-2'
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name='houseName' component='div' className='text-red-500' />
                            </div>
                            <div>
                                <h1 className='text-xl py-3'>Post</h1>
                                <hr />
                                <Field name='post'>
                                    {({ field }) => (
                                        <input
                                            {...field}
                                            type='text'
                                            placeholder='Enter your post...'
                                            className='w-full border rounded px-3 py-2'
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name='post' component='div' className='text-red-500' />
                            </div>
                        </div>
                        <div className='w-full pt-5 grid grid-cols-2 gap-4'>
                            <div>
                                <h1 className='text-xl py-3'>Street</h1>
                                <hr />
                                <Field name='street'>
                                    {({ field }) => (
                                        <input
                                            {...field}
                                            type='text'
                                            placeholder='Enter your street...'
                                            className='w-full border rounded px-3 py-2'
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name='street' component='div' className='text-red-500' />
                            </div>
                            <div>
                                <h1 className='text-xl py-3'>Country</h1>
                                <hr />
                                <CountryDropdown
                                    value={country}
                                    onChange={(val) => {
                                        setCountry(val);
                                        setFieldValue('country', val);
                                    }}
                                    className='w-full border rounded px-3 py-2'
                                />
                                <ErrorMessage name='country' component='div' className='text-red-500' />
                            </div>
                        </div>
                        <div className='w-full pt-5 grid grid-cols-2 gap-4'>
                            <div>
                                <h1 className='text-xl py-3'>State</h1>
                                <hr />
                                <RegionDropdown
                                    country={country}
                                    value={region}
                                    onChange={(val) => {
                                        setRegion(val);
                                        setFieldValue('state', val);
                                    }}
                                    className='w-full border rounded px-3 py-2'
                                />
                                <ErrorMessage name='state' component='div' className='text-red-500' />
                            </div>
                            <div>
                                <h1 className='text-xl py-3'>District</h1>
                                <hr />
                                <Field name='district'>
                                    {({ field }) => (
                                        <input
                                            {...field}
                                            type='text'
                                            placeholder='Enter your district...'
                                            className='w-full border rounded px-3 py-2'
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name='district' component='div' className='text-red-500' />
                            </div>
                        </div>
                        <div className='w-full pt-5'>
                            <h1 className='text-xl py-3'>Email</h1>
                            <hr />
                            <Field name='email'>
                                {({ field }) => (
                                    <input
                                        {...field}
                                        type='email'
                                        placeholder='Enter your email...'
                                        className='w-full border rounded px-3 py-2'
                                    />
                                )}
                            </Field>
                            <ErrorMessage name='email' component='div' className='text-red-500' />
                        </div>
                        <div className='w-full pt-5'>
                            <h1 className='text-xl py-3'>Upload ID Proof</h1>
                            <hr />
                            <input
                                type='file'
                                accept='image/*'
                                onChange={(e) => handleIdFileUpload(e.target.files[0])}
                                className='w-full border rounded px-3 py-2'
                            />
                        </div>
                        <div className='w-full pt-5'>
                            <h1 className='text-xl py-3'>Upload Qualification Proof</h1>
                            <hr />
                            <input
                                type='file'
                                accept='image/*'
                                onChange={(e) => handleQualificationUpload(e.target.files[0])}
                                className='w-full border rounded px-3 py-2'
                            />
                        </div>
                    
                        <button type='submit' disabled={isSubmitting} className='mt-5 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded'>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default BecomeInstructorForm
