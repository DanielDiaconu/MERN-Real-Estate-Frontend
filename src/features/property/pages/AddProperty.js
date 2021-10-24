import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrorToast, setSuccessToast } from "../../../slices/toastSlice";
import DropzoneWithPreview from "../../shared/components/DropzoneWithPreview";
import AddPropertyAmenities from "../components/addProperty/AddPropertyAmenities";
import AddPropertyBasicInfo from "../components/addProperty/AddPropertyBasicInfo";
import AddPropertyDetails from "../components/addProperty/AddPropertyDetails";
import AddPropertyPets from "../components/addProperty/AddPropertyPets";
import AddPropertyProgress from "../components/addProperty/AddPropertyProgress";
import { selectUser } from "../../../slices/userSlice";
import { useHistory } from "react-router";

const initPropertyObject = {
  name: "",
  overview: "",
  address: "",
  area: 0,
  price: null,
  bedrooms: 0,
  bathrooms: 0,
  built: 0,
  views: 0,
  isSponsored: false,
  amenities: [],
  catsAllowed: false,
  dogsAllowed: false,
  cityId: "",
  categoryId: "",
  ownerId: "",
  thumbnail: "",
  gallery: [],
};

function AddProperty() {
  const [property, setProperty] = useState(initPropertyObject);
  const [progress, setProgress] = useState(0);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const handlePropertyChange = (payload) => {
    setProperty({ ...property, ...payload });
  };

  const handleAmenitiesChange = (payload) => {
    setProperty({ ...property, amenities: payload });
  };

  const handleGalleryChange = (files) => {
    setProperty({ ...property, gallery: files });
  };

  const handleThumbnailChange = (files) => {
    setProperty({ ...property, thumbnail: files[0] });
  };

  const handlePropertySubmit = async (e) => {
    e.preventDefault();

    let data = new FormData();
    for (let image of property.gallery) {
      data.append("gallery", image);
    }
    data.append("name", property.name);
    data.append("thumbnail", property.thumbnail);
    data.append("overview", property.overview);
    data.append("address", property.address);
    data.append("area", property.area);
    data.append("price", property.price);
    data.append("bedrooms", property.bedrooms);
    data.append("bathrooms", property.bathrooms);
    data.append("built", property.built);
    data.append("views", property.views);
    data.append("isSponsored", property.isSponsored);
    data.append("amenities", property.amenities);
    data.append("catsAllowed", property.catsAllowed);
    data.append("dogsAllowed", property.dogsAllowed);
    data.append("cityId", property.cityId);
    data.append("categoryId", property.categoryId);
    data.append("ownerId", user._id);

    try {
      await axios.post("http://localhost:8080/properties", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      history.push("/user/dashboard/my-properties");
    } catch (error) {
      dispatch(
        setErrorToast("There has been a problem processing your request!")
      );
    }
  };

  return (
    <>
      <div className="container mt-5 mb-md-4 py-5">
        <div className="row">
          <div className="col-lg-8">
            <AddPropertyBasicInfo onBasicInfoChange={handlePropertyChange} />
            <section
              className="card card-body border-0 shadow-sm p-4 mb-4"
              id="details"
            >
              <AddPropertyDetails
                onPropertyDetailsChange={handlePropertyChange}
              />
              <AddPropertyAmenities onAmenitiesChange={handleAmenitiesChange} />
              <AddPropertyPets onPetsChange={handlePropertyChange} />
            </section>

            <DropzoneWithPreview
              onFilesDrop={handleGalleryChange}
              title="Gallery"
              maxFiles={6}
            />
            <DropzoneWithPreview
              onFilesDrop={handleThumbnailChange}
              title="Thumbnail"
              multiple={false}
              maxFiles={1}
            />
            <div className="d-sm-flex justify-content-between pt-2">
              <button
                className="btn btn-primary btn-lg d-block mb-2"
                onClick={handlePropertySubmit}
                disabled={progress < 99}
              >
                Save and continue
              </button>
            </div>
          </div>
          <AddPropertyProgress
            property={property}
            onProgressChange={(data) => setProgress(data)}
            progress={progress}
          />
        </div>
      </div>
    </>
  );
}

export default AddProperty;
