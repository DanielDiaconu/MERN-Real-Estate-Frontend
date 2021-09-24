import moment from "moment";
import React from "react";

function PropertyAnswer({ reply }) {
  const parseTime = () => {
    return moment(reply?.createdAt).format("MMM DD,YYYY");
  };
  return (
    <>
      <div className="mt-3 ms-5 mb-5 py-2">
        <div class="d-flex justify-content-between mb-3">
          <div class="d-flex align-items-center pe-2">
            <img
              class="rounded-circle me-1"
              src={`http://localhost:8080/images/avatars/${reply?.userId?.avatar}`}
              width="48"
              alt="Avatar"
            />
            <div class="ps-2">
              <h6 class="fs-base mb-0">{reply?.userId?.fullName}</h6>
            </div>
          </div>
          <span class="text-muted fs-sm">{parseTime()}</span>
        </div>
        <p>{reply?.replyBody}</p>
      </div>
    </>
  );
}

export default PropertyAnswer;
