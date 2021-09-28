import moment from "moment";
import React from "react";
import PropertyAmenities from "./PropertyAmenities";

function PropertyDetails({ property }) {
  const viewParsedPublishedDate = () => {
    return moment(property?.date).format("MMM D, YYYY");
  };

  const handlePropertyAge = () => {
    let currentDate = moment(new Date(), "YYYY-MM-DD");
    let propertyDate = moment(property?.date, "YYYY-MM-DD");
    return currentDate.diff(propertyDate, "days");
  };

  return (
    <>
      <div className="col-md-7 mb-md-0 mb-4">
        {handlePropertyAge() < 10 && (
          <span className="badge bg-info me-2 mb-3">New</span>
        )}
        <h2 className="h3 mb-4 pb-4 border-bottom">${property?.price}</h2>
        <div className="mb-4 pb-md-3">
          <h3 className="h4">Overview</h3>
          <p className="mb-1">{property?.overview}</p>
        </div>
        <div className="mb-4 pb-md-3">
          <h3 className="h4">Property Details</h3>
          <ul className="list-unstyled mb-0">
            <li>
              <b>Type: </b>
              {property?.categoryId?.name}
            </li>
            <li>
              <b> Area: </b>
              {property?.area} sq.m
            </li>
            <li>
              <b>Built: </b>
              {property?.built}
            </li>
            <li>
              <b>Bedrooms: </b>
              {property?.bedrooms}
            </li>
            <li>
              <b>Bathrooms: </b>
              {property?.bathrooms}
            </li>

            <li>
              <b>Pets allowed: </b>{" "}
              {property.catsAllowed || property.dogsAllowed ? (
                <span>Dog and Cats Allowed</span>
              ) : (
                <span>No Pets Allowed</span>
              )}
            </li>
          </ul>
        </div>
        <div className="mb-4 pb-md-3">
          <h3 className="h4">Amenities</h3>
          <ul className="list-unstyled row row-cols-lg-2 row-cols-md-2 row-cols-1 gy-1 mb-1 text-nowrap">
            {property?.amenities?.length > 0 ? (
              <>
                {property?.amenities.map((amenity, i) => (
                  <PropertyAmenities key={i} amenity={amenity} />
                ))}
              </>
            ) : (
              <div></div>
            )}
          </ul>
        </div>
        <div className="mb-lg-5 mb-md-4 pb-lg-2 py-4 border-top">
          <ul className="d-flex mb-4 list-unstyled fs-sm">
            <li className="me-3 pe-3 border-end">
              Published: <b>{viewParsedPublishedDate()}</b>
            </li>
            <li className="me-3 pe-3 border-end">
              Ad number: <b>{property?._id}</b>
            </li>
            <li className="me-3 pe-3">
              Views: <b>{property?.views}</b>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default PropertyDetails;
