import React, { useState } from "react";
import InputRadioBox from "../../../shared/components/InputRadioBox";

const initObject = {
  bedrooms: 0,
  bathrooms: 0,
  area: 0,
  price: 0,
  built: 0,
};

function AddPropertyDetails({ onPropertyDetailsChange }) {
  const [info, setInfo] = useState(initObject);

  const handleBedroomsChange = ({ value, checked }) => {
    let payload = { ...info, bedrooms: checked ? value : null };
    setInfo(payload);
    onPropertyDetailsChange(payload);
  };

  const handleBathroomsChange = ({ value, checked }) => {
    let payload = { ...info, bathrooms: checked ? value : null };
    setInfo(payload);
    onPropertyDetailsChange(payload);
  };

  const onInputChange = (e) => {
    const payload = { ...info, [e.target.name]: parseInt(e.target.value) };
    setInfo(payload);
    onPropertyDetailsChange(payload);
  };

  return (
    <>
      <h2 className="h4 mb-4">
        <i className="fi-cash text-primary fs-5 mt-n1 me-2"></i>Price
      </h2>
      <label className="form-label" htmlFor="ap-price">
        Price <span className="text-danger">*</span>
      </label>
      <div className="d-sm-flex">
        <input
          className="form-control w-100 me-2 mb-2"
          name="price"
          value={info.price}
          type="number"
          id="ap-price"
          min="200"
          step="50"
          required=""
          onChange={onInputChange}
          placeholder="Enter price here"
        />
      </div>
      <h2 className="h4 mb-4">
        <i className="fi-edit text-primary fs-5 mt-n1 me-2"></i>Property details
      </h2>
      <div className="mb-4" style={{ maxWidth: "25rem" }}>
        <label className="form-label" htmlFor="ap-area">
          Total area, sq.m
        </label>
        <input
          className="form-control"
          name="area"
          value={info.area}
          type="number"
          id="ap-area"
          min="20"
          placeholder="Enter your area"
          required=""
          onChange={onInputChange}
        />
      </div>
      <div className="mb-4" style={{ maxWidth: "25rem" }}>
        <label className="form-label" htmlFor="ap-area">
          Year of Construction
        </label>
        <input
          className="form-control"
          name="built"
          value={info.built}
          type="number"
          min="1900"
          max="2021"
          placeholder="Enter the year of construction"
          required=""
          onChange={onInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="form-label d-block fw-bold mb-2 pb-1">Bedrooms</label>
        <div
          className="btn-group btn-group-sm"
          role="group"
          aria-label="Choose number of bedrooms"
        >
          <InputRadioBox
            name="bedrooms"
            id="bedrooms-1"
            value={1}
            onInputChange={handleBedroomsChange}
            checked={info.bedrooms === 1}
            labelText="1"
          />
          <InputRadioBox
            name="bedrooms"
            id="bedrooms-2"
            value={2}
            onInputChange={handleBedroomsChange}
            checked={info.bedrooms === 2}
            labelText="2"
          />
          <InputRadioBox
            name="bedrooms"
            id="bedrooms-3"
            value={3}
            onInputChange={handleBedroomsChange}
            checked={info.bedrooms === 3}
            labelText="3"
          />
          <InputRadioBox
            name="bedrooms"
            id="bedrooms-4"
            value={4}
            onInputChange={handleBedroomsChange}
            checked={info.bedrooms === 4}
            labelText="4"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="form-label d-block fw-bold mb-2 pb-1">
          Bathrooms
        </label>
        <div
          className="btn-group btn-group-sm"
          role="group"
          aria-label="Choose number of bathrooms"
        >
          <InputRadioBox
            name="bathrooms"
            id="bathrooms-1"
            value={1}
            onInputChange={handleBathroomsChange}
            checked={info.bathrooms === 1}
            labelText="1"
          />

          <InputRadioBox
            name="bathrooms"
            id="bathrooms-2"
            value={2}
            onInputChange={handleBathroomsChange}
            checked={info.bathrooms === 2}
            labelText="2"
          />
          <InputRadioBox
            name="bathrooms"
            id="bathrooms-3"
            value={3}
            onInputChange={handleBathroomsChange}
            checked={info.bathrooms === 3}
            labelText="3"
          />
          <InputRadioBox
            name="bathrooms"
            id="bathrooms-4"
            value={4}
            onInputChange={handleBathroomsChange}
            checked={info.bathrooms === 4}
            labelText="4"
          />
        </div>
      </div>
    </>
  );
}

export default AddPropertyDetails;
