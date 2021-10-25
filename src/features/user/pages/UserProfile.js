import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router";
import { setErrorToast, setSuccessToast } from "../../../slices/toastSlice";
import { selectUser } from "../../../slices/userSlice";
import { socket } from "../../../sockets";
import UserProfileAside from "../components/UserProfileAside";
import UserProfileNav from "../components/UserProfileNav";
import UserProfileProperties from "../components/UserProfileProperties";
import UserProfileReviews from "../components/UserProfileReviews";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function UserPublic() {
  let { id } = useParams();
  let queryParams = useQuery();

  const [profileUser, setProfileUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const currentUser = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedReview, setHighlightedReview] = useState({});
  const dispatch = useDispatch();
  let { url, path } = useRouteMatch();

  const getUserInfo = async () => {
    console.log("here");
    let endpoint = `https://mern-online-properties.herokuapp.com/users/profile-user/${id}?page=${currentPage}`;
    if (queryParams.has("notification")) {
      endpoint += `&highlight=${queryParams.get("notification")}`;
    }
    try {
      if (queryParams.has("notification")) {
        let highlightRes = await axios.get(
          `https://mern-online-properties.herokuapp.com/reviews/highlighted-review/${queryParams.get(
            "notification"
          )}`
        );
        setHighlightedReview(highlightRes.data[0]);
      }
      let res = await axios.get(endpoint);
      setProfileUser({ ...res.data.user, reviews: res.data.reviews });
      setTotalPages(res.data.total);
    } catch (error) {
      dispatch(
        setErrorToast("There has been a error proccessing your request!")
      );
    }
  };

  const handleSorting = async (data) => {
    let sortUrl = `?sort=${encodeURIComponent(data)}`;
    let res = await axios.get(
      `https://mern-online-properties.herokuapp.com/users/profile-user/${id}${sortUrl}`
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
      let res = await axios.post(
        "https://mern-online-properties.herokuapp.com/reviews",
        {
          data,
          profileUser: profileUser._id,
          currentUser: currentUser._id,
        }
      );
      await socket.emit("review-post", {
        ownerId: profileUser._id,
        username: currentUser.fullName,
        reviewId: res.data.populatedReview._id,
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
      let res = await axios.delete(
        `https://mern-online-properties.herokuapp.com/reviews/${id}`,
        {
          data: { profileUser: profileUser._id },
        }
      );
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
            <UserProfileNav />
            <Switch>
              <Route exact path={path}>
                <Redirect to={`${url}/reviews`}></Redirect>
              </Route>
              <Route path={`${url}/reviews`}>
                <UserProfileReviews
                  onReviewPost={handleReviewPost}
                  reviews={profileUser?.reviews}
                  count={totalPages}
                  onPageChange={onPageChange}
                  handleReviewDelete={handleReviewDelete}
                  handleSorting={handleSorting}
                  total={totalPages}
                  loading={isLoading}
                  profileUser={profileUser}
                  highlightedReview={highlightedReview}
                />
              </Route>
              <Route exact path={`${url}/properties`}>
                <UserProfileProperties user={profileUser} />
              </Route>
            </Switch>

            <div className="d-sm-flex align-items-center justify-content-between pb-4 mb-sm-2"></div>
          </div>
          <UserProfileAside user={profileUser} total={totalPages} />
        </div>
      </div>
    </>
  );
}

export default UserPublic;
