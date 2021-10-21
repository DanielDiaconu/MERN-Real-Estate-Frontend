import axios from "axios";
import React, { useEffect, useState } from "react";
import CategoriesCard from "../../shared/components/CategoriesCard";

function CategoriesRow() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    let res = await axios.get("http://localhost:8080/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section className="container mb-5">
      <div className="row row-cols-lg-4 row-cols-sm-2 row-cols-2 g-3 g-xl-4">
        {categories?.map((category, i) => (
          <CategoriesCard
            category={category}
            key={i}
            url={`/properties?categoryId=${category?._id}`}
          />
        ))}
      </div>
    </section>
  );
}

export default CategoriesRow;
