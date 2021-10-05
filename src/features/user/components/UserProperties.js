import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../../slices/userSlice";
import Loader from "../../shared/components/Loader";
import UserPropertyCard from "../../shared/components/UserPropertyCard";

function UserProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);

  const getUserProperties = async () => {
    try {
      let res = await axios.get(
        `http://localhost:8080/users/my-properties/${user._id}`
      );
      setProperties(res.data.properties);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user._id) {
      getUserProperties();
    }
  }, [user]);

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
              ))}{" "}
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
          )}{" "}
        </>
      )}
    </>
  );
}

export default UserProperties;
