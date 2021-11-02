import axios from "axios";
import React, { useEffect, useState } from "react";
import CitiesCard from "../../shared/components/CitiesCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const options = {
  type: "loop",
  autoplay: true,
  perPage: 3,
  perMove: 1,
  cover: true,
  lazyLoad: "nearby",
  breakpoints: {
    991.98: {
      perPage: 2,
      height: "350px",
      focus: 0,
    },
    575.98: {
      perPage: 1,
      height: "350px",
      focus: 0,
    },
  },
};

function CitiesRow() {
  const [cities, setCities] = useState([]);

  const getCities = async () => {
    let res = await axios.get(
      "https://mern-online-properties.herokuapp.com/cities"
    );
    setCities(res.data);
  };

  useEffect(() => {
    getCities();
  }, []);

  return (
    <section className="container mb-5">
      <div className="row row-cols-lg-4 row-cols-sm-3 row-cols-2 g-3 g-xl-4 cities-splide ">
        <Splide options={options}>
          {cities?.map((city, i) => (
            <SplideSlide key={i}>
              <CitiesCard city={city} url={`/properties?cityId=${city?._id}`} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
}

export default CitiesRow;
