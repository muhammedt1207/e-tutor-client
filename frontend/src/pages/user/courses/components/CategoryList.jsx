import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../../../../Common/api";

const CategoryList = ({ onCategorySelection, selectedCategories }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`${URL}/course/category`);
        const fetchedCategories = res.data.data.map((category) => category.categoryName);
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
        <div key={category}>
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => onCategorySelection(category)}
            />
            {category}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;