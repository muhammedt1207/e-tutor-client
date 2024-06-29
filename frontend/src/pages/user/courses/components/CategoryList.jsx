import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../../../../Common/api";

const CategoryList = ({ onCategorySelection, selectedCategories }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`${URL}/course/category`);
        const fetchedCategories = res.data.data.map((category) => ({
          id: category._id,
          name: category.categoryName,
        }));
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategory();
  }, []);

  return (
    <div>
      {categories.map((category) => (
        <div key={category.id} className="flex ms-5">
          <label className="flex space-x-2 text-lg ">
            <input
              type="checkbox"
              checked={selectedCategories && selectedCategories.includes(category.id)}
              onChange={() => onCategorySelection(category.id)}
            />
            <p>{category.name}</p>
          </label>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
