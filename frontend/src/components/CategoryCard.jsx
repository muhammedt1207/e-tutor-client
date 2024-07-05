import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../redux/action/Categories';



const TopCategories = ({ category }) => {
  return (
    <div className="bg-white shadow-md w-full h-20  rounded-lg p-4 m-2 lg:w-1/4 px-28 lg:justify-center">
      <h3 className="text-lg font-bold mb-2">{category.categoryName}</h3>
      {/* <p className="text-gray-600">{category.count} Courses</p> */}
    </div>
  );
};

const CategoryCard = () => {
  const dispatch=useDispatch()
  const [categories,setCategories]=useState([])
  const{data,loading}=useSelector((state)=>state.category)
  useEffect(()=>{
    dispatch(getAllCategories())
    .then(()=>{
      setCategories(data)
    })
  },[])
  return (
    <div className="flex flex-wrap justify-center mb-6 sm:w-full">
      {categories &&categories.map((category) => (
        <TopCategories key={category.categoryName} category={category} />
      ))}
    </div>
  );
};

export default CategoryCard;
