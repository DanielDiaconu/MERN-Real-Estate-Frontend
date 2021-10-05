import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { setErrorToast } from "../../../slices/toastSlice";
import { extractUserFunds, selectUser } from "../../../slices/userSlice";
import UserPropertyCard from "../../shared/components/UserPropertyCard";

const initObject = {
  standard: false,
  premium: false,
  pro: false,
};

function UserPropertyPromote() {
  const [property, setProperty] = useState({});
  const [previewProperty, setPreviewProperty] = useState({});
  const [adPlan, setAdPlan] = useState(initObject);
  const [total, setTotal] = useState(0);
  const history = useHistory();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  let { id } = useParams();

  const getProperty = async () => {
    let res = await axios.get(`http://localhost:8080/users/promote/${id}`);
    setProperty(res.data);
    setPreviewProperty(res.data);
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
    setPreviewProperty({ ...previewProperty, ...checkedPlan });
  };

  const updateProperty = async () => {
    try {
      if (user.funds < total) {
        return dispatch(setErrorToast("Payment failed. Insufficient funds!"));
      }
      await axios.patch(`http://localhost:8080/property/promote/${id}`, {
        data: adPlan,
        userId: user._id,
        funds: total,
      });
      dispatch(extractUserFunds(total));
      history.push("/user/dashboard/my-properties");
    } catch (error) {
      dispatch(setErrorToast("There was a problem processing your request!"));
    }
  };

  const isChecked = (key) => {
    if (property[key]) {
      return "checked";
    } else if (adPlan[key]) {
      return "checked";
    } else {
      return "";
    }
  };

  useEffect(() => {
    getProperty();
  }, [id]);

  return (
    <div className="row">
      <UserPropertyCard property={previewProperty} />
      <div>
        <div className="container ps-0 mb-md-4 py-2">
          <h2 className="h3 pt-4 pt-md-5 mb-4">Select a plan</h2>
          <div className="card card-hover card-body px-4 mb-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="standard"
                name="standard"
                onChange={onInputChange}
                checked={isChecked("standard")}
                disabled={property.standard}
              />
              <label
                className="form-check-label d-sm-flex align-items-center justify-content-between"
                htmlFor="ad-option-3"
              >
                <span className="d-block px-1">
                  <span className="d-block h6 mb-2">Standard plan</span>
                  <span className="d-block mb-2 mb-sm-0">
                    Properties will display a Featured tag on the card.
                  </span>
                </span>
                <span className="d-block h4 mb-0">
                  ${`${adPlan.premium || adPlan.pro ? "0" : "10"}`}
                </span>
              </label>
            </div>
          </div>
          <div className="card card-hover card-body px-4 mb-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="premium"
                name="premium"
                onChange={onInputChange}
                checked={isChecked("premium")}
                disabled={property?.premium}
              />
              <label
                className="form-check-label d-sm-flex align-items-center justify-content-between"
                htmlFor="ad-option-2"
              >
                <span className="d-block px-1">
                  <span className="d-block h6 mb-2">Premium plan</span>
                  <span className="d-block mb-2 mb-sm-0">
                    Your ad appears above non-promoted ads in Catalog. <br />
                    You will also have the benefits from the Standard plan.
                  </span>
                </span>
                <span className="d-block h4 mb-0">
                  ${`${adPlan.pro ? "0" : "20"}`}
                </span>
              </label>
            </div>
          </div>
          <div className="card card-hover card-body px-4 mb-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="pro"
                name="pro"
                onChange={onInputChange}
                checked={isChecked("pro")}
              />
              <label
                className="form-check-label d-sm-flex align-items-center justify-content-between"
                htmlFor="ad-option-1"
              >
                <span className="d-block px-1">
                  <span className="d-block h6 mb-2">Pro plan</span>
                  <span className="d-block mb-2 mb-sm-0">
                    Your ad will stand out with a shiny border.
                    <br />
                    You will have the benefits from Standard and Premium plans.
                  </span>
                </span>
                <span className="d-block h4 mb-0">$35</span>
              </label>
            </div>
          </div>

          <div className="text-end pt-4">
            <div className="h4 mb-4">Total: ${total}</div>
            <button
              className="btn btn-outline-secondary btn-lg me-2"
              type="button"
              onClick={() => history.push("/user/dashboard/my-properties")}
            >
              Do not promote
            </button>
            <button
              className="btn btn-primary btn-lg"
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
