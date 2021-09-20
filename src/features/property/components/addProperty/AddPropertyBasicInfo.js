import axios from "axios";
import React, { useEffect, useState } from "react";

const initObject = {
  name: "",
  categoryId: "",
  cityId: "",
  address: "",
  overview: "",
};

function AddPropertyBasicInfo({ onBasicInfoChange }) {
  const [info, setInfo] = useState(initObject);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);

  const getCategories = async () => {
    let res = await axios.get("http://localhost:8080/categories");
    setCategories(res.data);
  };

  const getCities = async () => {
    let res = await axios.get("http://localhost:8080/cities");
    setCities(res.data);
  };

  const onSelectChange = (e) => {
    const payload = { ...info, [e.target.name]: e.target.value };
    setInfo(payload);
    onBasicInfoChange(payload);
  };

  const onInputChange = (e) => {
    const payload = { ...info, [e.target.name]: e.target.value };
    setInfo(payload);
    onBasicInfoChange(payload);
  };

  useEffect(() => {
    getCategories();
    getCities();
  }, []);

  return (
    <>
      <section
        className="card card-body border-0 shadow-sm p-4 mb-4"
        id="basic-info"
      >
        <h2 className="h4 mb-4">
          <i className="fi-info-circle text-primary fs-5 mt-n1 me-2"></i>
          Basic info
        </h2>
        <div className="mb-3">
          <label className="form-label" htmlFor="ap-title">
            Title <span className="text-danger">*</span>
          </label>
          <input
            className="form-control"
            name="name"
            value={info.name}
            onChange={onInputChange}
            type="text"
            id="ap-title"
            placeholder="Title for your property"
            required=""
          />
          <span className="form-text">48 characters left</span>
        </div>
        <label className="form-label" htmlFor="ap-description">
          Description{" "}
        </label>
        <textarea
          name="overview"
          onChange={onInputChange}
          value={info.overview}
          className="form-control mb-4"
          id="ap-description"
          rows="5"
          placeholder="Describe your property"
        ></textarea>
        <div className="row">
          <div className="col-sm-6 mb-3">
            <label className="form-label" htmlFor="ap-type">
              Property type <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              id="ap-type"
              required=""
              name="categoryId"
              onChange={onSelectChange}
            >
              <option value="" disabled="" hidden="">
                Choose property type
              </option>
              {categories?.map((category, i) => (
                <option key={i} value={category?._id}>
                  {category?.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>
      <section
        className="card card-body border-0 shadow-sm p-4 mb-4"
        id="location"
      >
        <h2 className="h4 mb-4">
          <i className="fi-map-pin text-primary fs-5 mt-n1 me-2"></i>
          Location
        </h2>
        <div className="row">
          <div className="col-sm-6 mb-3">
            <label className="form-label" htmlFor="ap-city">
              City <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              id="ap-city"
              required=""
              name="cityId"
              onChange={onSelectChange}
            >
              <option value="" disabled="">
                Choose city
              </option>

              {cities?.map((city, i) => (
                <option key={i} value={city?._id}>
                  {city?.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="ap-address">
            Address <span className="text-danger">*</span>
          </label>
          <input
            name="address"
            value={info.address}
            onChange={onInputChange}
            className="form-control"
            type="text"
            id="ap-address"
            required=""
          />
        </div>
      </section>
    </>
  );
}

export default AddPropertyBasicInfo;
