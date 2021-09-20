import React from "react";
import PropertyAmenities from "./PropertyAmenities";

function PropertyDetails({ property }) {
  return (
    <>
      <div className="col-md-7 mb-md-0 mb-4">
        <span className="badge bg-success me-2 mb-3">Verified</span>
        <span className="badge bg-info me-2 mb-3">New</span>
        <h2 className="h3 mb-4 pb-4 border-bottom">${property?.price}</h2>
        <div className="mb-4 pb-md-3">
          <h3 className="h4">Overview</h3>
          <p className="mb-1">{property?.overview}</p>
          <div className="collapse" id="seeMoreOverview">
            <p className="mb-1">
              Asperiores eos molestias, aspernatur assumenda vel corporis ex,
              magni excepturi totam exercitationem quia inventore quod amet
              labore impedit quae distinctio? Officiis blanditiis consequatur
              alias, atque, sed est incidunt accusamus repudiandae tempora
              repellendus obcaecati delectus ducimus inventore tempore harum
              numquam autem eligendi culpa.
            </p>
          </div>
          <a
            className="collapse-label collapsed"
            href="#seeMoreOverview"
            data-bs-toggle="collapse"
            data-bs-label-collapsed="Show more"
            data-bs-label-expanded="Show less"
            role="button"
            aria-expanded="false"
            aria-controls="seeMoreOverview"
          ></a>
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
          <ul className="list-unstyled row row-cols-lg-3 row-cols-md-2 row-cols-1 gy-1 mb-1 text-nowrap">
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
              Published: <b>Dec 9, 2020</b>
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
