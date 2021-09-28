import React from "react";
import Loader from "../../shared/components/Loader";
import PropertiesCard from "../../shared/components/PropertiesCard";
import SmallLoader from "../../shared/components/SmallLoader";

function CatalogPropertiesList({
  properties,
  handleViewMore,
  onSortChange,
  hasNext,
  loading,
  isLoadingViewMore,
}) {
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="col-lg-8 col-xl-9 position-relative overflow-hidden pb-5 pt-4 px-3 px-xl-4 px-xxl-5">
      <div className="d-sm-flex align-items-center justify-content-between pb-3 pb-sm-4">
        <h1 className="h2 mb-sm-0">Property for sale</h1>
      </div>

      <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch my-2">
        {!!properties?.length && (
          <div className="d-flex align-items-center flex-shrink-0">
            <label className="fs-sm me-2 pe-1 text-nowrap" htmlFor="sortby">
              <i className="fi-arrows-sort text-muted mt-n1 me-2"></i>Sort by:
            </label>
            <select
              className="form-select form-select-sm"
              onChange={handleSortChange}
              id="sortby"
              defaultValue=""
            >
              <option disabled value="">
                Select...
              </option>
              <option value="price">Low - High Price</option>
              <option value="-price">High - Low Price</option>
            </select>
          </div>
        )}

        <hr className="d-none d-sm-block w-100 mx-4" />
        <div className="d-none d-sm-flex align-items-center flex-shrink-0 text-muted">
          <i className="fi-check-circle me-2"></i>
          <span className="fs-sm mt-n1">{properties?.length} results</span>
        </div>
      </div>

      <div className="row g-4 py-4 h-100 pb-5">
        {loading ? (
          <Loader />
        ) : (
          <>
            {properties?.length > 0 ? (
              <>
                {properties?.map((property, i) => (
                  <div className="col-sm-6 col-xl-4" key={i}>
                    <PropertiesCard property={property} />
                  </div>
                ))}
                {hasNext && (
                  <>
                    {isLoadingViewMore ? (
                      <div className="d-flex align-items-center justify-content-center mb-5">
                        <SmallLoader />
                      </div>
                    ) : (
                      <div className="d-flex justify-content-center mb-5">
                        <button
                          onClick={handleViewMore}
                          className=" btn btn-primary btn-sm py-1 px-4 mt-3"
                        >
                          View more
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <div className="d-flex justify-content-center">
                <img src="/img/results.jpg" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default CatalogPropertiesList;
