import axios from "axios";
import React, { useEffect, useState } from "react";
import CatalogFilters from "../components/CatalogFilters";
import CatalogPropertiesList from "../components/CatalogPropertiesList";
import { useHistory, useLocation } from "react-router-dom";

const defaultFilters = {
  cityId: "",
  categoryId: [],
  amenities: [],
  catsAllowed: false,
  dogsAllowed: false,
  bedrooms: null,
  bathrooms: null,
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Catalog() {
  const [properties, setProperties] = useState([]);
  const [totalProperties, setTotalProperties] = useState(0);
  const [isLoadingViewMore, setIsLoadingViewMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  let queryParams = useQuery();

  const buildQueryParamFromArray = (filterKey, filterValue, url) => {
    filterValue.forEach((item) => {
      url += `${filterKey}[]=${item}&`;
    });
    return url;
  };

  const buildQueryParams = (filters) => {
    let url = "skip=0&";

    if (queryParams.has("sort")) {
      url += `sort=${queryParams.get("sort")}&`;
    }

    for (let key in filters) {
      if (typeof filters[key] === "boolean") {
        url += `${key}=${filters[key]}&`;
      } else if (Array.isArray(filters[key])) {
        if (filters[key].length > 0) {
          url = buildQueryParamFromArray(key, filters[key], url);
        }
      } else if (filters[key]) {
        url += `${key}=${filters[key]}&`;
      }
    }
    return url;
  };

  const handleFiltersChange = async (filters) => {
    let res = await axios.get(
      `http://localhost:8080/catalog/properties?${buildQueryParams(filters)}`
    );
    setProperties(res.data.data);
    setTotalProperties(res.data.totalCount);
    history.push({
      search: buildQueryParams(filters),
    });
    setLoading(false);
  };

  const handleSortChange = async (sortValue) => {
    setLoading(true);
    let sortUrl = ``;

    if (!queryParams.get("sort")) {
      sortUrl += `sort=${encodeURIComponent(sortValue)}&`;
    }

    for (let [key, value] of queryParams.entries()) {
      if (key === "sort") {
        sortUrl += `sort=${encodeURIComponent(sortValue)}&`;
      } else {
        sortUrl += `${key}=${value}&`;
      }
    }

    let res = await axios.get(
      `http://localhost:8080/catalog/properties?${sortUrl}`
    );
    history.push({
      search: sortUrl,
    });
    setProperties(res.data.data);
    setLoading(false);
  };

  const loadMoreProperties = async () => {
    setIsLoadingViewMore(true);

    let loadUrl = "";

    for (let [key, value] of queryParams.entries()) {
      if (key === "skip") {
        loadUrl += `skip=${parseInt(value) + 6}&`;
      } else {
        loadUrl += `${key}=${value}&`;
      }
    }

    let res = await axios.get(
      `http://localhost:8080/catalog/properties?${loadUrl}`
    );
    history.push({
      search: loadUrl,
    });
    setProperties([...properties, ...res.data.data]);
    setIsLoadingViewMore(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container-fluid mt-5 pt-5 p-0">
      <div className="row g-0 mt-n3 ">
        <CatalogFilters onFiltersChange={handleFiltersChange} />
        <CatalogPropertiesList
          onSortChange={handleSortChange}
          properties={properties}
          handleViewMore={loadMoreProperties}
          hasNext={properties?.length < totalProperties}
          loading={loading}
          isLoadingViewMore={isLoadingViewMore}
        />
      </div>
    </div>
  );
}

export default Catalog;
