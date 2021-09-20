import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Property from "./features/property/pages/Property";
import Header from "./features/shared/components/Header";
import Login from "./features/authentication/pages/Login";
import Register from "./features/authentication/pages/Register";
import "./styles/global.scss";
import "./styles/theme.css";
import "react-toastify/dist/ReactToastify.css";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import "react-input-range/lib/css/index.css";
import axios from "axios";
import Home from "./features/home/pages/Home";
import Catalog from "./features/catalog/pages/Catalog";
import AddProperty from "./features/property/pages/AddProperty";
import { useDispatch, useSelector } from "react-redux";
import { getUser, selectUser, setUser } from "./slices/userSlice";
import UserDashboard from "./features/user/pages/UserDashboard";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const getUserDetails = () => {
    const token = localStorage.getItem("auth-token");
    const parsedToken = JSON.parse(atob(token.split(".")[1]));
    dispatch(getUser(parsedToken._id));
  };

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      axios.interceptors.request.use((req) => {
        req.headers["Content-Type"] = "application/json; charset=utf-8";
        req.headers["auth_token"] = token;
        return req;
      });
      getUserDetails();
    }
  }, [user]);

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
      <Router>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/" exact>
            <Header />
            <Home />
          </Route>
          <Route path="/properties">
            <Header />
            <Catalog />
          </Route>
          <Route path="/property/:id">
            <Header />
            <Property />
          </Route>
          <Route path="/addproperty" exact>
            <Header />
            <AddProperty />
          </Route>
          <Route path="/user" exact>
            <Redirect to="/user/dashboard" />
          </Route>
          <Route path="/user/dashboard">
            <Header />
            <UserDashboard />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
