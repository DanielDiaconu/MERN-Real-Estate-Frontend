import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrorToast } from "../../../slices/toastSlice";
import { selectUser, updateUserWishlist } from "../../../slices/userSlice";
import Loader from "../../shared/components/Loader";
import Pagination from "../../shared/components/Pagination";
import UserPropertyCard from "../../shared/components/UserPropertyCard";

function UserWishlist() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const getWishlist = async () => {
    try {
      let res = await axios.get(
        `https://mern-online-properties.herokuapp.com/users/wishlist/${user._id}?page=${currentPage}`
      );
      setProperties(res.data.wishlist);
      setTotal(res.data.total);
      setLoading(false);
    } catch (error) {
      dispatch(setErrorToast(error.message));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const clearWishlist = () => {
    dispatch(updateUserWishlist({ id: user._id, data: [] }));
  };

  useEffect(() => {
    if (user._id) {
      getWishlist();
    }
  }, [user, currentPage]);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4 pb-2">
        <h1 className="h2 mb-0">Wishlist</h1>
        {user?.wishlist && (
          <span
            className="fw-bold color-primary cursor-pointer"
            onClick={clearWishlist}
          >
            <i className="fi-x fs-xs mt-n1 me-2"></i>Clear all
          </span>
        )}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {properties?.length > 0 ? (
            <>
              {properties?.map((property, i) => (
                <UserPropertyCard property={property} key={i} />
              ))}{" "}
            </>
          ) : (
            <div>
              <h3 className="text-muted">
                Currently you have no properties on your wishlist!
              </h3>
            </div>
          )}
        </>
      )}
      {total > 0 && (
        <Pagination
          handlePageChange={handlePageChange}
          count={total}
          limit={4}
        />
      )}
    </>
  );
}

export default UserWishlist;
