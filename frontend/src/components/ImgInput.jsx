import { CircularProgress } from '@material-ui/core'
import React, { useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import ImageUpdload from '../util/ImageUpdload'
import { useAsyncError } from 'react-router-dom'
import toast from 'react-hot-toast'

const ImgInput = ({submit,image}) => {
const [imgLoading,setLoading]=useState(false)
const [isUploadingImage,setIsUploadingImage]=useState(false)
const handleImageUpload = async (event) => {
    setLoading(true)
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
        const imageData = reader.result;
        const imgUrl = await ImageUpdload(imageData);
        console.log(imgUrl, 'image uploaded');
        if (!imgUrl) {
            toast.error('image upload failed')
            setLoading(false)
            return
        }
        submit(imgUrl)
        toast.success('Image uploaded')
        setLoading(false)
    };

    if (file) {
        reader.readAsDataURL(file);
        setIsUploadingImage(true);

    }
};
  return (
    <>
    {imgLoading ? (
        <div className="flex items-center justify-center pt-24">
            <CircularProgress color="primary" />
        </div>
    ) : (
        image==null && image? (
            <div className="relative">
                <img src={image} alt="Profile" className='w-72 h-96 object-cover rounded-sm ms-24 lg:ms-22' />
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
</>
  )
}

export default ImgInput
