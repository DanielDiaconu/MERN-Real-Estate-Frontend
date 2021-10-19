import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getUser } from "../../../slices/userSlice";
import { socket } from "../../../sockets";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const storageToken = sessionStorage.getItem("auth-token");
  const dispatch = useDispatch();

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:8080/login", user);
      sessionStorage.setItem("auth-token", res.data);
      const parsedToken = JSON.parse(atob(res.data.split(".")[1]));
      dispatch(getUser(parsedToken._id));
      socket.connect();
      await socket.emit("join-server", parsedToken?._id);

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
      <div className="container">
        <div className="row mx-0 align-items-center">
          <div className="col-md-6 border-end-md p-4 p-sm-5">
            <h2 className="h3 mb-4 mb-sm-5">
              Hey there!
              <br />
              Welcome back.
            </h2>
            <img
              className="d-block mx-auto"
              src="img/signin.svg"
              width="344"
              alt="Illustartion"
            />
            <div className="mt-4 mt-sm-5">
              Don't have an account? <Link to="/register">Sign up here</Link>
            </div>
          </div>
          <div className="col-md-6 px-4 pt-2 pb-4 px-sm-5 pb-sm-5 pt-md-5">
            <form className="needs-validation" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label mb-2" htmlFor="signin-email">
                  Email address
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="signin-email"
                  placeholder="Enter your email"
                  name="email"
                  value={user.email}
                  onChange={onInputChange}
                />
              </div>
              <div className="mb-4">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <label className="form-label mb-0" htmlFor="signin-password">
                    Password
                  </label>
                </div>
                <div className="password-toggle">
                  <input
                    className="form-control"
                    type="password"
                    id="signin-password"
                    placeholder="Enter password"
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
              <button
                className="btn btn-primary btn-lg w-100"
                type="submit"
                disabled={!user.email || !user.password}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
