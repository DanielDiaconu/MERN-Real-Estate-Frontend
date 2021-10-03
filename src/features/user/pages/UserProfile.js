import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setErrorToast, setSuccessToast } from "../../../slices/toastSlice";
import { selectUser } from "../../../slices/userSlice";
import UserProfileAside from "../components/UserProfileAside";
import UserProfileReviews from "../components/UserProfileReviews";

function UserPublic() {
  let { id } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const currentUser = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const getUserInfo = async () => {
    let res = await axios.get(
      `http://localhost:8080/users/profile-user/${id}?page=${currentPage}`
    );
    setProfileUser({ ...res.data.user, reviews: res.data.reviews });
    setTotalPages(res.data.total);
  };

  const handleSorting = async (data) => {
    let sortUrl = `?sort=${encodeURIComponent(data)}`;
    let res = await axios.get(
      `http://localhost:8080/users/profile-user/${id}${sortUrl}`
    );
    setProfileUser({ ...res.data.user, reviews: res.data.reviews });
    setTotalPages(res.data.total);
  };

  const onPageChange = (data) => {
    setCurrentPage(data);
  };

  const handleReviewPost = async (data) => {
    setIsLoading(true);
    try {
      let res = await axios.post("http://localhost:8080/reviews", {
        data,
        profileUser: profileUser._id,
        currentUser: currentUser._id,
      });

      const updatedProfileUser = {
        ...profileUser,
        reviews: [...profileUser.reviews, res.data.populatedReview],
        rating: {
          ...profileUser.rating,
          average: res.data.userRating.rating.average,
        },
      };
      setProfileUser(updatedProfileUser);
      setTotalPages(res.data.total);
      dispatch(setSuccessToast("Review posted!"));
      setIsLoading(false);
    } catch (error) {
      dispatch(setErrorToast("An error ocurred, please try again!"));
    }
  };

  const handleReviewDelete = async (id) => {
    try {
      let res = await axios.delete(`http://localhost:8080/reviews/${id}`, {
        data: { profileUser: profileUser._id },
      });
      console.log(res);
      const updatedReview = {
        ...profileUser,
        reviews: profileUser.reviews.filter((item) => item._id !== id),
        rating: {
          ...profileUser.rating,
          average: res.data.newRating.rating.average,
        },
      };
      setProfileUser(updatedReview);
      setTotalPages(res.data.total);
      dispatch(setSuccessToast("Review deleted successfully!"));
    } catch (error) {
      dispatch(setErrorToast("An error has occured, please try again!"));
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [id, currentPage]);

  return (
    <>
      <div className="container mt-5 mb-md-2 pt-5 pb-3">
        <div className="row">
          <div className="col-lg-8 order-lg-2 mb-5">
            <div className="d-sm-flex align-items-center justify-content-between pb-4 mb-sm-2">
              <h1 className="h3 mb-sm-0 me-sm-3">User properties</h1>
              <div className="d-flex align-items-center">
                <label
                  className="fs-sm me-2 pe-1 text-nowrap"
                  htmlFor="sorting"
                >
                  <i className="fi-arrows-sort mt-n1 me-2"></i>Sort by:
                </label>
                <select className="form-select form-select-sm" id="sorting">
                  <option>Newest</option>
                  <option>Popular</option>
                  <option>Highest Salary</option>
                </select>
              </div>
            </div>
            <UserProfileReviews
              onReviewPost={handleReviewPost}
              reviews={profileUser?.reviews}
              count={totalPages}
              onPageChange={onPageChange}
              handleReviewDelete={handleReviewDelete}
              handleSorting={handleSorting}
              total={totalPages}
              loading={isLoading}
            />

            {/* <UserProfileProperties user={user} /> */}
          </div>
          <UserProfileAside user={profileUser} total={totalPages} />
        </div>
      </div>
    </>
  );
}

export default UserPublic;
