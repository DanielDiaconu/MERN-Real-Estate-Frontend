import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "../../shared/components/Pagination";
import SmallLoader from "../../shared/components/SmallLoader";
import UserPropertyCard from "../../shared/components/UserPropertyCard";

function UserProfileProperties({ user }) {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const getUserProperties = async () => {
    setLoading(true);
    try {
      let res = await axios.get(
        `https://mern-online-properties.herokuapp.com/users/my-properties/${user._id}?page=${currentPage}`
      );
      setProperties(res.data.properties);
      setTotal(res.data.total);
      setLoading(false);
    } catch (error) {}
  };

  const onPageChange = (data) => {
    setCurrentPage(data);
  };

  useEffect(() => {
    if (user?._id) {
      getUserProperties();
    }
  }, [user, currentPage]);

  return (
    <div className="d-flex flex-column col-9 mt-3">
      <div className="d-flex flex-column justify-content-center my-4">
        <h1 className="h3 mb-sm-0 me-sm-3">User properties</h1>
      </div>
      {properties?.map((property, i) => (
        <UserPropertyCard key={i} property={property} />
      ))}
      {loading && (
        <div className="d-flex align-items-center justify-content-center mb-2 mt-2">
          <SmallLoader />
        </div>
      )}
      <Pagination count={total} handlePageChange={onPageChange} limit={4} />
    </div>
  );
}

export default UserProfileProperties;
