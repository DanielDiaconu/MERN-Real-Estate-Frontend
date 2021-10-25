import axios from "axios";
import React, { useEffect, useState } from "react";

function AddPropertyAmenities({ onAmenitiesChange }) {
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const getAmenities = async () => {
    let res = await axios.get(
      "https://mern-online-properties.herokuapp.com/ameneties"
    );
    setAmenities(res.data);
  };

  const onAmenitySelectChange = (id) => {
    if (!selectedAmenities.includes(id)) {
      setSelectedAmenities([...selectedAmenities, id]);
    } else {
      let filteredAmenities = selectedAmenities.filter(
        (amenity) => amenity !== id
      );
      setSelectedAmenities(filteredAmenities);
    }
  };

  useEffect(() => {
    getAmenities();
  }, []);

  useEffect(() => {
    onAmenitiesChange(selectedAmenities);
  }, [selectedAmenities]);

  return (
    <>
      <div className="mb-4">
        <label className="form-label d-block fw-bold mb-2 pb-1">
          Amenities
        </label>
        <div className="row">
          <div className="col-sm-4">
            {amenities?.map((amenity, i) => (
              <div className="form-check" key={i}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={amenity?.name}
                  value={amenity?._id}
                  onChange={() => onAmenitySelectChange(amenity?._id)}
                />
                <label className="form-check-label" htmlFor={amenity?.name}>
                  {amenity?.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddPropertyAmenities;
