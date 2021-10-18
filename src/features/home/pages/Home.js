import React from "react";
import LiveChat from "../../shared/components/LiveChat";
import Sockets from "../../shared/components/Sockets";
import CategoriesRow from "../components/CategoriesRow";
import CitiesRow from "../components/CitiesRow";
import PropertiesRow from "../components/PropertiesRow";

function Home() {
  return (
    <>
      <section className="container pt-5 my-5 pb-lg-4">
        <div className="row pt-0 pt-md-2 pt-lg-0">
          <div className="col-xl-7 col-lg-6 col-md-5 order-md-2 mb-4 mb-lg-3">
            <img src="img/hero-image.jpg" alt="Hero image" />
          </div>
          <div className="col-xl-5 col-lg-6 col-md-7 order-md-1 pt-xl-5 pe-lg-0 mb-3 text-md-start text-center">
            <h1 className="display-4 mt-lg-5 mb-md-4 mb-3 pt-md-4 pb-lg-2">
              Easy way to find <br /> a perfect property
            </h1>
            <p className="position-relative lead me-lg-n5">
              We provide a complete service for the sale, purchase or rental of
              real estate. We have been operating more than 10 years. Search
              millions of apartments and houses on Finder.
            </p>
          </div>
        </div>
      </section>
      <CategoriesRow />
      <PropertiesRow />
      <CitiesRow />
      {/* <LiveChat /> */}
      <section className="container mb-5 pb-2 pb-lg-4">
        <div className="row align-items-center">
          <div className="col-md-5">
            <img
              className="d-block mx-md-0 mx-auto mb-md-0 mb-4"
              src="img/calculator.svg"
              width="416"
              alt="Illustration"
            />
          </div>
          <div className="col-xxl-6 col-md-7 text-md-start text-center">
            <h2>Affordable costs for your property</h2>
            <p className="pb-3 fs-lg">
              Real estate appraisal is a procedure that allows you to determine
              the average market value of real estate (apartment, house, land,
              etc.). Сalculate the cost of your property with our new
              Calculation Service.
            </p>
          </div>
        </div>
        {/* <Sockets /> */}
      </section>
    </>
  );
}

export default Home;
