import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../../slices/userSlice";
import Loader from "../../shared/components/Loader";
import Pagination from "../../shared/components/Pagination";
import UserPropertyCard from "../../shared/components/UserPropertyCard";

function UserProperties() {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);

  const getUserProperties = async () => {
    try {
      let res = await axios.get(
        `http://localhost:8080/users/my-properties/${user._id}?page=${currentPage}`
      );
      setProperties(res.data.properties);
      setTotal(res.data.total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (user._id) {
      getUserProperties();
    }
  }, [user, currentPage]);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="h2 mb-0">My Properties</h1>
      </div>
      <p className="pt-1 mb-4">
        Here you can see your property offers and edit them easily.
      </p>
      {loading ? (
        <Loader />
      ) : (
        <>
          {properties?.length > 0 ? (
            <>
              {properties?.map((property, i) => (
                <UserPropertyCard
                  property={property}
                  key={i}
                  canPromote={true}
                />
              ))}
            </>
          ) : (
            <div>
              <h4>
                Currently you have no properties listed for sale! If you wish to
                list a property you can click the Add Property button or
                <Link to="/addproperty" style={{ marginLeft: "6px" }}>
                  click here.
                </Link>
              </h4>
            </div>
          )}
          <Pagination handlePageChange={handlePageChange} count={total} />
        </>
      )}
    </>
  );
}

export default UserProperties;
