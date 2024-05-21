const CategoryList = () => {
    const categories = ['Category 1', 'Category 2', 'Category 3'];
  
    return (
      <div className='p-3'>
        {categories.map((category) => (
          <div key={category} className='flex items-center mb-2'>
            <input type='checkbox' id={category} name={category} className='mr-2'/>
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>
    );
  };

  export default CategoryList