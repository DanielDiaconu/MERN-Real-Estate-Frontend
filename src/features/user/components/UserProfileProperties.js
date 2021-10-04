import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "../../shared/components/Pagination";
import UserPropertyCard from "../../shared/components/UserPropertyCard";

function UserProfileProperties({ user }) {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const getUserProperties = async () => {
    try {
      let res = await axios.get(
        `http://localhost:8080/users/my-properties/${user._id}?page=${currentPage}`
      );
      setProperties(res.data.properties);
      setTotal(res.data.total);
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
      <Pagination count={total} handlePageChange={onPageChange} limit={3} />
    </div>
  );
}

export default UserProfileProperties;
