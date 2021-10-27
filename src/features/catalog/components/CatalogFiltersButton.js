import React from "react";

function CatalogFiltersButton() {
  return (
    <div>
      <button
        class="btn btn-primary btn-sm w-100 rounded-0 fixed-bottom d-lg-none"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#filters-sidebar"
      >
        <i class="fi-filter me-2"></i>Filters
      </button>
    </div>
  );
}

export default CatalogFiltersButton;
