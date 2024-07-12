import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import SideBar from '../../../components/SideBar';
import Sidebar from '../../../components/admin/Sidebar';
import ImgInput from '../../../components/ImgInput';
import BreadCrumbs from '../components/BreadCrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { createCategories, editCategory } from '../../../redux/action/Categories';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddOrEditCategory = ({ category,handleModal }) => {
    const dispatch = useDispatch()
    const { error, loading, data } = useSelector((state) => state.category)
    const navigat = useNavigate(-1)
    const [img, setImg] = useState('')
    const initialValues = {
        categoryName: category?.categoryName || '',
        status: category?.status || ''
    };
    const validationSchema = Yup.object().shape({
        categoryName: Yup.string().required('Category name is required'),
        status: Yup.string().required('Status is required')
    });

    const submitForm = async (values) => {
        console.log(values, 'uploading data');
        if (!img && !category?.image) {
            toast.error('Please upload an image');
            return;
        }

        const data = {
            ...values,
            image: img || category?.image
        };
        console.log(data);
        let result
        if (category._id) {
            console.log('sending edit category data', category._id);
            result=await dispatch(editCategory({id:category._id, categoryData:data}))
        } else {
            result = await dispatch(createCategories(data))
        }
        if (result.meta.requestStatus === 'fulfilled') {
            toast.success('category added')
            console.log('category added successfully ');
            handleModal()
            // navigat(-1)
        } else {
            const ErrorMessage = result.payload.response.data.message
            console.log(ErrorMessage);
            toast.error(ErrorMessage)
        }

    };

    const imgHandle = async (image) => {
        setImg(image)
    };
    return (

        <div className='flex'>
            <Sidebar />
            <div className='border h-screen w-full'>
                <div>
                    <h1 className="mt-5 ml-5 font-bold text-2xl">Categories</h1>
                    <BreadCrumbs list={["Dashboard", "Add Categories"]} />
                </div>
                <div className='flex justify-center space-x-10 mt-10'>
                    <div className='w-2/6'>
                        <ImgInput submit={imgHandle} image={category?.image} />
                    </div>
                    <div className='w-1/3'>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={submitForm}
                            enableReinitialize
                        >
                            <Form>
                                <label htmlFor="categoryName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Name</label>
                                <Field type="text" id="categoryName" name="categoryName" placeholder='Category name' className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                <ErrorMessage name="categoryName" component="div" className="text-red-500 text-xs mt-1" />

                                <label htmlFor="status" className="block mt-4 mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                                <Field as="select" id="status" name="status" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="">Select status</option>
                                    <option value="Active">Active</option>
                                    <option value="Block">Block</option>
                                </Field>
                                <ErrorMessage name="status" component="div" className="text-red-500 text-xs mt-1" />

                                <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold mt-10 py-2 px-4">Submit</button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddOrEditCategory;
