import React from 'react';

const categories = [
  { name: 'Business', count: 52822 },
  { name: 'Finance & Accounting', count: 33841 },
  { name: 'Personal Development', count: 13932 },
  { name: 'Office Productivity', count: 20126 },
  { name: 'Marketing', count: 12068 },
  { name: 'Lifestyle', count: 2736 },
  { name: 'Design', count: 2600 },
  { name: 'IT & Software', count: 22649 },
  { name: 'Photography & Video', count: 6196 },
  { name: 'Health & Fitness', count: 1678 },
  { name: 'Music', count: 959 },
];

const TopCategories = ({ category }) => {
  return (
    <div className="bg-white shadow-md w-full rounded-lg p-4 m-2 lg:w-1/4 px-28 lg:justify-center">
      <h3 className="text-lg font-bold mb-2">{category.name}</h3>
      <p className="text-gray-600">{category.count} Courses</p>
    </div>
  );
};

const CategoryCard = () => {
  return (
    <div className="flex flex-wrap justify-center mb-6 sm:w-full">
      {categories.map((category) => (
        <TopCategories key={category.name} category={category} />
      ))}
    </div>
  );
};

export default CategoryCard;
