import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getUser } from "../../../slices/userSlice";
import { socket } from "../../../sockets";

function Register() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();
  const storageToken = sessionStorage.getItem("auth-token");
  const dispatch = useDispatch();

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const isDisabled = () => {
    return !user.fullName || !user.email || !user.password || !confirmPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    try {
      let res = await axios.post(
        "https://mern-online-properties.herokuapp.com/register",
        user
      );
      sessionStorage.setItem("auth-token", res.data);
      const parsedToken = JSON.parse(atob(res.data.split(".")[1]));
      dispatch(getUser(parsedToken._id));
      socket.connect();
      await socket.emit("join-server", parsedToken._id);
      history.push("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (storageToken) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
      <div className="container mt-5">
        <div className="row mx-0 align-items-center">
          <div className="col-md-6 border-end-md p-4 p-sm-5">
            <h2 className="h3 mb-4 mb-sm-5">
              Join Finder.
              <br />
              Get premium benefits:
            </h2>
            <ul className="list-unstyled mb-4 mb-sm-5">
              <li className="d-flex mb-2">
                <i className="fi-check-circle text-primary mt-1 me-2"></i>
                <span>Add and promote your listings</span>
              </li>
              <li className="d-flex mb-2">
                <i className="fi-check-circle text-primary mt-1 me-2"></i>
                <span>Easily manage your wishlist</span>
              </li>
              <li className="d-flex mb-0">
                <i className="fi-check-circle text-primary mt-1 me-2"></i>
                <span>Leave reviews</span>
              </li>
            </ul>
            <img
              className="d-block mx-auto"
              src="/img/signup.svg"
              width="344"
              alt="Illustartion"
            />
            <div className="mt-sm-4 pt-md-3">
              Already have an account? <Link to="/login">Sign in</Link>
            </div>
          </div>
          <div className="col-md-6 px-4 pt-2 pb-4 px-sm-5 pb-sm-5 pt-md-5">
            <form className="needs-validation" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label" htmlFor="signup-name">
                  Full name
                </label>
                <input
                  className="form-control"
                  name="fullName"
                  type="text"
                  id="signup-name"
                  placeholder="Enter your full name"
                  required=""
                  value={user.fullName}
                  onChange={onInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="form-label" htmlFor="signup-email">
                  Email address
                </label>
                <input
                  className="form-control"
                  type="email"
                  id="signup-email"
                  placeholder="Enter your email"
                  required=""
                  name="email"
                  value={user.email}
                  onChange={onInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="form-label" htmlFor="signup-password">
                  Password <span className="fs-sm text-muted">min. 6 char</span>
                </label>
                <div className="password-toggle">
                  <input
                    className="form-control"
                    type="password"
                    id="signup-password"
                    required=""
                    name="password"
                    value={user.password}
                    onChange={onInputChange}
                  />
                  <label
                    className="password-toggle-btn"
                    aria-label="Show/hide password"
                  >
                    <input className="password-toggle-check" type="checkbox" />
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label" htmlFor="signup-password-confirm">
                  Confirm password
                </label>
                <div className="password-toggle">
                  <input
                    className="form-control"
                    type="password"
                    id="signup-password-confirm"
                    required=""
                    name="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <label
                    className="password-toggle-btn"
                    aria-label="Show/hide password"
                  >
                    <input className="password-toggle-check" type="checkbox" />
                  </label>
                </div>
              </div>

              <button
                className="btn btn-primary btn-lg w-100"
                type="submit"
                disabled={isDisabled()}
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
