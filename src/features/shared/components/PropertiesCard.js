import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser, updateUserWishlist } from "../../../slices/userSlice";

function PropertiesCard({ property }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [wishlist, setWishlist] = useState([]);

  const handleAddtoWishlist = () => {
    let updatedWishlist = [...user.wishlist];
    let removed;
    if (!updatedWishlist.includes(property._id)) {
      updatedWishlist = [...updatedWishlist, property._id];
      removed = false;
    } else {
      updatedWishlist = updatedWishlist.filter((item) => item !== property._id);
      removed = true;
    }
    dispatch(
      updateUserWishlist({ id: user._id, data: updatedWishlist, removed })
    );
  };

  const handlePropertyAge = () => {
    let currentDate = moment(new Date(), "YYYY-MM-DD");
    let propertyDate = moment(property.date, "YYYY-MM-DD");
    return currentDate.diff(propertyDate, "days");
  };

  useEffect(() => {
    if (user._id) {
      setWishlist(user.wishlist);
    }
  }, [user]);

  useEffect(() => {
    if (property) {
      handlePropertyAge();
    }
  }, [property]);

  return (
    <div
      className={`card shadow-sm  border-0 h-100 property-card p-0 ${
        property.pro ? "golden-border" : ""
      }`}
    >
      <div className="card-img-top card-img-hover">
        <Link to={`property/${property?._id}`} className="img-overlay">
          <div className="position-absolute  top-0 pt-3 ps-3">
            {property?.standard && (
              <span className="d-table badge bg-success mb-1">Featured</span>
            )}
            {property?.premium && (
              <span className="d-table badge bg-danger mb-1">Sticky</span>
            )}
            {handlePropertyAge() < 10 && (
              <span className="d-table badge bg-info">New</span>
            )}
          </div>
        </Link>
        <div className="content-overlay end-0 top-0 pt-3 pe-3">
          <button
            className="btn btn-icon btn-light btn-xs text-primary rounded-circle"
            type="button"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title=""
            data-bs-original-title="Add to Wishlist"
            aria-label="Add to Wishlist"
            onClick={handleAddtoWishlist}
          >
            <i
              className={
                !wishlist?.includes(property?._id)
                  ? "fi-heart"
                  : "fi-heart-filled"
              }
            ></i>
          </button>
        </div>
        <img
          src={`http://localhost:8080/images/property/${property?.thumbnail}`}
          alt="Image"
        />
      </div>
      <div className="card-body position-relative pb-3">
        <h4 className="mb-1 fs-xs fw-normal text-uppercase text-primary">
          For sale
        </h4>
        <h3 className="h6 mb-2 fs-base">
          <Link
            className="nav-link stretched-link"
            to={`property/${property?._id}`}
          >
            {property?.name}| {property?.area} sq.m
          </Link>
        </h3>
        <p className="mb-2 fs-sm text-muted">
          {property?.address}, {property?.cityId?.name}
        </p>
        <div className="fw-bold">
          <i className="fi-cash mt-n1 me-2 lead align-middle opacity-70"></i>
          {property?.price} $
        </div>
      </div>
      <div className="card-footer d-flex align-items-center justify-content-center mx-3 pt-3 text-nowrap">
        <span className="d-inline-block mx-1 px-2 fs-sm">
          {property?.bedrooms}
          <i className="fi-bed ms-1 mt-n1 fs-lg text-muted"></i>
        </span>
        <span className="d-inline-block mx-1 px-2 fs-sm">
          {property?.bathrooms}
          <i className="fi-bath ms-1 mt-n1 fs-lg text-muted"></i>
        </span>
      </div>
    </div>
  );
}

export default PropertiesCard;
