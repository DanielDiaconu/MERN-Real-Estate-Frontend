import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import PropertyDetails from "../components/PropertyDetails";
import PropertyImages from "../components/PropertyImages";
import PropertyQuestionSection from "../components/PropertyQuestionSection";
import PropertyReviews from "../components/PropertyQuestionSection";
import PropertyUser from "../components/PropertyUser";

function Property() {
  const [property, SetProperty] = useState(null);
  let { id } = useParams();

  const getProperty = async () => {
    let res = await axios.get(`http://localhost:8080/property/${id}`);
    SetProperty(res.data);
  };

  useEffect(() => {
    getProperty();
  }, [id]);

  return (
    <>
      {property && (
        <>
          <section className="container pt-5 mt-5">
            <h1 className="h2 mb-2">{property?.name}</h1>
            <p className="mb-2 pb-1 fs-lg">
              {property?.address}, {property?.cityId?.name}
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <ul className="d-flex mb-4 list-unstyled">
                <li className="me-3 pe-3 border-end">
                  <b className="me-1">{property?.bedrooms}</b>
                  <i className="fi-bed mt-n1 lead align-middle text-muted"></i>
                </li>
                <li className="me-3 pe-3 border-end">
                  <b className="me-1">{property?.bathrooms}</b>
                  <i className="fi-bath mt-n1 lead align-middle text-muted"></i>
                </li>

                <li>
                  <b>{property?.area} </b>sq.m
                </li>
              </ul>
            </div>
          </section>
          <PropertyImages />
          <section className="container mb-5 pb-1">
            <div className="row">
              <div className="col-md-7 mb-md-0 mb-4">
                <PropertyDetails property={property} />
                <PropertyQuestionSection property={property} />
              </div>
              <PropertyUser user={property?.ownerId} />
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Property;
