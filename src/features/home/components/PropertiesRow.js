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
    <section className="container mb-5">
      <div className="row row-cols-lg-4 row-cols-sm-3 row-cols-2 g-3 g-xl-4">
        {properties.map((property, i) => (
          <PropertiesCard property={property} key={i} />
        ))}
      </div>
    </section>
  );
}

export default PropertiesRow;
