import axios from "axios";
import { set } from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { setErrorToast, setSuccessToast } from "../../../slices/toastSlice";
import UserPromotePropertyCard from "../../shared/components/UserPromotePropertyCard";
import UserPropertyCard from "../../shared/components/UserPropertyCard";

const initObject = {
  standard: false,
  premium: false,
  pro: false,
};

function UserPropertyPromote() {
  const [property, setProperty] = useState({});
  const [adPlan, setAdPlan] = useState(initObject);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  let { id } = useParams();

  const getProperty = async () => {
    let res = await axios.get(`http://localhost:8080/users/promote/${id}`);
    setProperty(res.data);
  };

  const onInputChange = (e) => {
    let price = 0;
    let checkedPlan = {};

    if (e.target.name === "premium") {
      checkedPlan = {
        standard: e.target.checked,
        premium: e.target.checked,
        pro: false,
      };
      price = e.target.checked ? 20 : 0;
    } else if (e.target.name === "pro") {
      checkedPlan = {
        standard: e.target.checked,
        premium: e.target.checked,
        pro: e.target.checked,
      };
      price = e.target.checked ? 35 : 0;
    } else {
      checkedPlan = { standard: e.target.checked, premium: false, pro: false };
      price = e.target.checked ? 10 : 0;
    }
    setAdPlan(checkedPlan);
    setTotal(price);
    setProperty({ ...property, ...checkedPlan });
  };

  console.log(adPlan);

  const updateProperty = async () => {
    try {
      await axios.patch(`http://localhost:8080/property/promote/${id}`, adPlan);
      dispatch(setSuccessToast("Property has been updated!"));
    } catch (error) {
      dispatch(setErrorToast("There was a problem processing your request!"));
    }
  };

  useEffect(() => {
    getProperty();
  }, [id]);

  return (
    <div className="row">
      {/* <UserPromotePropertyCard property={property} preview={adPlan} /> */}
      <UserPropertyCard property={property} />
      <div>
        <div class="container  mb-md-4 py-2">
          <h2 class="h3 pt-4 pt-md-5 mb-4">Other services</h2>
          <div class="card card-hover card-body px-4 mb-2">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="standard"
                name="standard"
                onChange={onInputChange}
                checked={adPlan.standard === true ? "checked" : ""}
              />
              <label
                class="form-check-label d-sm-flex align-items-center justify-content-between"
                for="ad-option-3"
              >
                <span class="d-block px-1">
                  <span class="d-block h6 mb-2">Standard plan</span>
                  <span class="d-block mb-2 mb-sm-0">
                    Properties will display a Featured tag on the card!
                  </span>
                </span>
                <span class="d-block h4 mb-0">$15</span>
              </label>
            </div>
          </div>
          <div class="card card-hover card-body px-4 mb-2">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="premium"
                name="premium"
                onChange={onInputChange}
                checked={adPlan.premium === true ? "checked" : ""}
              />
              <label
                class="form-check-label d-sm-flex align-items-center justify-content-between"
                for="ad-option-2"
              >
                <span class="d-block px-1">
                  <span class="d-block h6 mb-2">Premium plan</span>
                  <span class="d-block mb-2 mb-sm-0">
                    Your ad appears above non-promoted ads in Catalog. <br />
                    You will also have the benefits from the Featured plan.
                  </span>
                </span>
                <span class="d-block h4 mb-0">$20</span>
              </label>
            </div>
          </div>
          <div class="card card-hover card-body px-4 mb-2">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="pro"
                name="pro"
                onChange={onInputChange}
                checked={adPlan.pro === true ? "checked" : ""}
              />
              <label
                class="form-check-label d-sm-flex align-items-center justify-content-between"
                for="ad-option-1"
              >
                <span class="d-block px-1">
                  <span class="d-block h6 mb-2">Pro plan</span>
                  <span class="d-block mb-2 mb-sm-0">
                    Ads with this tier will also have the benefits from all the
                    plans!
                    <br />
                    Stands out with a shiny border!
                  </span>
                </span>
                <span class="d-block h4 mb-0">$35</span>
              </label>
            </div>
          </div>

          <div class="text-end pt-4">
            <div class="h4 mb-4">Total: ${total}</div>
            <button class="btn btn-outline-secondary btn-lg me-2" type="button">
              Do not promote
            </button>
            <button
              class="btn btn-primary btn-lg"
              type="button"
              disabled={!adPlan.standard && !adPlan.premium && !adPlan.pro}
              onClick={updateProperty}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPropertyPromote;
