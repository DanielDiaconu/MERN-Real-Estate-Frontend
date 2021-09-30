import React, { useState } from "react";
import ReactPaginate from "react-paginate";

function Pagination({ questions, handlePageChange, count }) {
  const changePage = ({ selected }) => {
    handlePageChange(selected + 1);
  };

  return (
    <ReactPaginate
      previousLabel={"Prev"}
      nextLabel={"Next"}
      pageCount={Math.ceil(count / 5)}
      onPageChange={changePage}
      containerClassName={"paggination"}
      previousLinkClassName={"previous-btn"}
      nextLinkClassName={"next-btn"}
      disabledClassName={"pagination-disable"}
      activeLinkClassName={"pagination-active"}
      breakLabel={"..."}
      pageClassName={"current-page"}
    />
  );
}

export default Pagination;
