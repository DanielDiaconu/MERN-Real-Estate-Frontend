import axios from "axios";
import React, { useEffect, useState } from "react";
import PropertiesCard from "../../shared/components/PropertiesCard";

function PropertiesRow() {
  const [properties, setProperties] = useState([]);

  const getProperties = async () => {
    let res = await axios.get("http://localhost:8080/properties");
    setProperties(res.data);
  };

  useEffect(() => {
    getProperties();
  }, []);
  return (
    <section className="container mb-5 mt-5">
      <h1>Featured Properties</h1>
      <div className="row my-5 justify-content-evenly g-4">
        {properties.map((property, i) => (
          <div key={i} className=" col-lg-3 col-md-6 col-sm-6 mt-4">
            <PropertiesCard property={property} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default PropertiesRow;
