import axios from "axios";
import React, { useEffect, useState } from "react";
import UserPropertyCard from "../../shared/components/UserPropertyCard";

function UserProfileProperties({ user }) {
  const [properties, setProperties] = useState([]);

  const getUserProperties = async () => {
    try {
      let res = await axios.get(
        `http://localhost:8080/users/my-properties/${user._id}`
      );
      setProperties(res.data);
    } catch (error) {}
  };
  useEffect(() => {
    if (user._id) {
      getUserProperties();
    }
  }, [user]);

  return (
    <div>
      {properties?.map((property, i) => (
        <UserPropertyCard key={i} property={property} />
      ))}
    </div>
  );
}

export default UserProfileProperties;
