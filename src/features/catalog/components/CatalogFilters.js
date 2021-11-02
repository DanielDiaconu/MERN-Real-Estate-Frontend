import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import InputRadioBox from "../../shared/components/InputRadioBox";
import InputRange from "react-input-range";

const initFilters = {
  cityId: "",
  categoryId: [],
  amenities: [],
  catsAllowed: false,
  dogsAllowed: false,
  bedrooms: null,
  bathrooms: null,
  price: [],
  area: [],
};

const initPriceRange = {
  min: 50000,
  max: 200000,
};

const initAreaRange = {
  min: 0,
  max: 200,
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function CatalogFilters({ onFiltersChange }) {
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState(initFilters);
  const [amenities, setAmenities] = useState([]);
  const [priceRange, setPriceRange] = useState(initPriceRange);
  const [areaRange, setAreaRange] = useState(initAreaRange);
  const queryString = useQuery();

  const setLocationFilterFromUrl = () => {
    initFilters.categoryId = queryString.get("categoryId")
      ? [queryString.get("categoryId")]
      : [];
    // initFilters.cityId = queryString.get("cityId")
    //   ? queryString.get("cityId")
    //   : "";
  };

  const getCategories = async () => {
    let res = await axios.get(
      "https://mern-online-properties.herokuapp.com/categories"
    );
    setCategories(res.data);
  };

  const getCities = async () => {
    let res = await axios.get(
      "https://mern-online-properties.herokuapp.com/cities"
    );
    setCities(res.data);
  };

  const getAmenities = async () => {
    let res = await axios.get(
      "https://mern-online-properties.herokuapp.com/ameneties"
    );
    setAmenities(res.data);
  };

  const onFiltersInteractChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const onFiltersCategoryChange = (id) => {
    if (!filters.categoryId.includes(id)) {
      setFilters({
        ...filters,
        categoryId: [...filters.categoryId, id],
      });
    } else {
      setFilters({
        ...filters,
        categoryId: filters.categoryId.filter((category) => category !== id),
      });
    }
  };

  const onFiltersAmenitiesChange = (id) => {
    if (!filters.amenities.includes(id)) {
      setFilters({
        ...filters,
        amenities: [...filters.amenities, id],
      });
    } else {
      setFilters({
        ...filters,
        amenities: filters.amenities.filter((amenity) => amenity !== id),
      });
    }
  };

  const onPetAvailabilityChange = (e) => {
    setFilters({ ...filters, [e.target.name]: !filters[e.target.name] });
  };

  const handleBedroomsChange = ({ value, checked }) => {
    setFilters({
      ...filters,
      bedrooms: checked ? value : null,
    });
  };

  const handleBathroomsChange = ({ value, checked }) => {
    setFilters({
      ...filters,
      bathrooms: checked ? value : null,
    });
  };

  const onPriceFilterChange = (value) => {
    setPriceRange(value);
    setFilters({ ...filters, price: [value.min, value.max] });
  };

  const onAreaFilterChange = (e) => {
    let areaRangeUpdated;

    if (e.target.name === "max") {
      if (parseInt(e.target.value) < parseInt(areaRange.min)) {
        areaRangeUpdated = { ...areaRange, max: areaRange.min };
      } else {
        areaRangeUpdated = { ...areaRange, [e.target.name]: e.target.value };
      }
    } else {
      if (parseInt(e.target.value) > parseInt(areaRange.max)) {
        areaRangeUpdated = { ...areaRange, min: areaRange.max };
      } else {
        areaRangeUpdated = { ...areaRange, [e.target.name]: e.target.value };
      }
    }

    setAreaRange(areaRangeUpdated);
    setFilters({
      ...filters,
      area: [areaRangeUpdated.min, areaRangeUpdated.max],
    });
  };

  const onFiltersReset = () => {
    initFilters.categoryId = [];
    setFilters(initFilters);
    setAreaRange(initAreaRange);
    setPriceRange(initPriceRange);
  };

  useEffect(() => {
    getCategories();
    getCities();
    getAmenities();
    setLocationFilterFromUrl();
  }, []);

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters]);

  return (
    <aside className="col-lg-4 col-xl-3 border-top-lg border-end-lg shadow-sm px-3 px-xl-4 px-xxl-5 pt-lg-2 catalog-filters-wrapper">
      <div
        className="offcanvas offcanvas-start offcanvas-collapse"
        id="filters-sidebar"
      >
        <div className="offcanvas-header d-flex d-lg-none align-items-center">
          <h2 className="h5 mb-0">Filters</h2>
          <button
            className="btn-close"
            type="button"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body py-lg-4">
          <div className="pb-4 mb-2">
            <h3 className="h6">Location</h3>
            <select
              className="form-select mb-2"
              name="cityId"
              value={filters.cityId}
              onChange={onFiltersInteractChange}
            >
              <option value="" disabled>
                Choose city
              </option>
              {cities?.map((city, i) => (
                <option key={i} value={city?._id}>
                  {city?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="pb-4 mb-2">
            <h3 className="h6">Property type</h3>
            <div>
              {categories?.map((category, i) => (
                <div key={i} className="form-check">
                  <input
                    className="form-check-input"
                    name="categoryId"
                    type="checkbox"
                    id={category?.name}
                    value={category?._id}
                    checked={filters.categoryId.includes(category?._id)}
                    onChange={() => onFiltersCategoryChange(category?._id)}
                  />
                  <label
                    className="form-check-label fs-sm"
                    htmlFor={category?.name}
                  >
                    {category?.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="pb-4 mb-2">
            <h3 className="h6 mb-4">Property price</h3>
            <div style={{ width: "90%" }}>
              <InputRange
                maxValue={500000}
                minValue={50000}
                step={10000}
                onChange={onPriceFilterChange}
                value={priceRange}
              />
            </div>
          </div>
          <div className="pb-4 mb-2">
            <h3 className="h6 pt-1">Beds &amp; baths</h3>
            <label className="d-block fs-sm mb-1">Bedrooms</label>
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
                checked={filters.bedrooms === 1}
                labelText="1"
              />
              <InputRadioBox
                name="bedrooms"
                id="bedrooms-2"
                value={2}
                onInputChange={handleBedroomsChange}
                checked={filters.bedrooms === 2}
                labelText="2"
              />
              <InputRadioBox
                name="bedrooms"
                id="bedrooms-3"
                value={3}
                onInputChange={handleBedroomsChange}
                checked={filters.bedrooms === 3}
                labelText="3"
              />
              <InputRadioBox
                name="bedrooms"
                id="bedrooms-4"
                value={4}
                onInputChange={handleBedroomsChange}
                checked={filters.bedrooms === 4}
                labelText="4"
              />
            </div>
            <label className="d-block fs-sm pt-2 my-1">Bathrooms</label>
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
                checked={filters.bathrooms === 1}
                labelText="1"
              />

              <InputRadioBox
                name="bathrooms"
                id="bathrooms-2"
                value={2}
                onInputChange={handleBathroomsChange}
                checked={filters.bathrooms === 2}
                labelText="2"
              />
              <InputRadioBox
                name="bathrooms"
                id="bathrooms-3"
                value={3}
                onInputChange={handleBathroomsChange}
                checked={filters.bathrooms === 3}
                labelText="3"
              />
              <InputRadioBox
                name="bathrooms"
                id="bathrooms-4"
                value={4}
                onInputChange={handleBathroomsChange}
                checked={filters.bathrooms === 4}
                labelText="4"
              />
            </div>
          </div>
          <div className="pb-4 mb-2">
            <h3 className="h6 pt-1">Square metres</h3>
            <div className="d-flex align-items-center">
              <input
                className="form-control w-100"
                type="number"
                name="min"
                min="20"
                max="500"
                step="10"
                placeholder="Min"
                value={areaRange.min}
                onChange={onAreaFilterChange}
              />
              <div className="mx-2">—</div>
              <input
                className="form-control w-100"
                type="number"
                min="20"
                name="max"
                max="500"
                step="10"
                placeholder="Max"
                value={areaRange.max}
                onChange={onAreaFilterChange}
              />
            </div>
          </div>
          <div className="pb-4 mb-2">
            <h3 className="h6">Amenities</h3>
            <div>
              <div className="simplebar-content" style={{ padding: "0px" }}>
                {amenities?.map((amenity, i) => (
                  <div className="form-check" key={i}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={amenity?.name}
                      value={amenity?._id}
                      checked={filters.amenities.includes(amenity?._id)}
                      onChange={() => onFiltersAmenitiesChange(amenity?._id)}
                    />
                    <label
                      className="form-check-label fs-sm"
                      htmlFor="air-condition"
                    >
                      {amenity?.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pb-4 mb-2">
            <h3 className="h6">Pets</h3>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="allow-cats"
                name="catsAllowed"
                checked={filters.catsAllowed === true}
                value={filters.catsAllowed}
                onChange={onPetAvailabilityChange}
              />
              <label className="form-check-label fs-sm" htmlFor="allow-cats">
                Cats allowed
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                name="dogsAllowed"
                type="checkbox"
                id="allow-dogs"
                checked={filters.dogsAllowed === true}
                value={filters.dogsAllowed}
                onChange={onPetAvailabilityChange}
              />
              <label className="form-check-label fs-sm" htmlFor="allow-dogs">
                Dogs allowed
              </label>
            </div>
          </div>
          <div className="pb-4 mb-2">
            <h3 className="h6">Additional options</h3>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="verified"
              />
              <label className="form-check-label fs-sm" htmlFor="verified">
                Verified
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="featured"
              />
              <label className="form-check-label fs-sm" htmlFor="featured">
                Featured
              </label>
            </div>
          </div>
          <div className="border-top py-4">
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={onFiltersReset}
            >
              <i className="fi-rotate-right me-2"></i>Reset filters
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default CatalogFilters;
