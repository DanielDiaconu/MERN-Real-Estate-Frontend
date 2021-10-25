import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrorToast, setSuccessToast } from "../../../slices/toastSlice";
import { selectUser } from "../../../slices/userSlice";
import CreditCard from "../../shared/components/CreditCard";

function UserSecurityDetails() {
  const [info, setInfo] = useState({ password: "", confirmPassword: "" });
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const onPasswordChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (info.password !== info.confirmPassword) {
      dispatch(setErrorToast("Password does not match!"));
      return;
    }

    try {
      let res = await axios.patch(
        `https://mern-online-properties.herokuapp.com/users/security/${user?._id}`,
        {
          password: info.password,
        }
      );
      dispatch(setSuccessToast("Password has been updated successfully!"));
      setInfo({ password: "", confirmPassword: "" });
    } catch (error) {
      dispatch(setErrorToast(error.response.data.message));
    }
  };

  return (
    <>
      <h1 className="h2">Password &amp; Security</h1>
      <p className="pt-1">
        Manage your password settings and secure your account.
      </p>
      <h2 className="h5">Password</h2>
      <form className="needs-validation pb-4" noValidate="">
        <div className="row mb-2">
          <div className="col-sm-6 mb-3">
            <label className="form-label" htmlFor="account-password-new">
              New password
            </label>
            <div className="password-toggle">
              <input
                className="form-control"
                type="password"
                id="account-password-new"
                required=""
                name="password"
                value={info.password}
                onChange={onPasswordChange}
              />
            </div>
          </div>
          <div className="col-sm-6 mb-3">
            <label className="form-label" htmlFor="account-password-confirm">
              Confirm password
            </label>
            <div className="password-toggle">
              <input
                className="form-control"
                type="password"
                id="account-password-confirm"
                required=""
                name="confirmPassword"
                value={info.confirmPassword}
                onChange={onPasswordChange}
              />
            </div>
          </div>
        </div>
        <button
          className="btn btn-outline-primary"
          onClick={handlePasswordSubmit}
        >
          Update password
        </button>
      </form>
      <div className="border-top pt-4 mt-3"></div>

      <a
        className="d-inline-block fw-bold text-decoration-none mt-3"
        href="#"
      ></a>
    </>
  );
}

export default UserSecurityDetails;
