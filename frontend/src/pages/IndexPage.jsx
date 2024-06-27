import React from 'react'
import CategoryCard from '../components/CategoryCard'
import imager from '../assets/Images'
const IndexPage = () => {
  return (
    <>
       <div className='w-full'>
    <div className='flex flex-col lg:flex-row '>
      <div className=' w-1/2  flex p-36'>
        <div className='lg:ps-28 ps-0 mr-2'>
            <h1 className='text-6xl font-medium'>Learn with expert  <br />anytime anywhere</h1>
            <p className='pt-7 text-lg py-10'>Our mision is to help people to find the best course online and learn with expert anytime, anywhere.</p>
            <button className="  bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4  rounded">Create Account</button>
        </div>
      </div>
      <div className=' lg:w-1/2  w-full hidden lg:block'>
    <img src={imager} className='object-fill w-full h-full lg:object-contain ' alt="" />
      </div>
    </div>
    <div className='flex flex-col gap-4 pt-16 items-center justify-center bg-zinc-100'>
      <h1 className='text-3xl font-medium'>Browse top category </h1>
     

      <CategoryCard/>
  
    </div>
   
    </div>
    </>
  )
}

export default IndexPage
