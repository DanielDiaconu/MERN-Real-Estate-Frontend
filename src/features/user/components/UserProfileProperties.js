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
        `http://localhost:8080/users/my-properties/${user._id}?page=${currentPage}`
      );
      setProperties(res.data.properties);
      setTotal(res.data.total);
      setLoading(false);
    } catch (error) {}
  };
  console.log(total);

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
      {properties?.map((property, i) => (
        <UserPropertyCard key={i} property={property} />
      ))}
      {loading && (
        <div className="d-flex align-items-center justify-content-center mb-2 mt-2">
          <SmallLoader />
        </div>
      )}
      <Pagination count={total} handlePageChange={onPageChange} limit={3} />
    </div>
  );
}

export default UserProfileProperties;
