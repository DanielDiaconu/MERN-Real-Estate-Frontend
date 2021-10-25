import React from "react";

function PropertyImages({ gallery }) {
  return (
    <section
      className="container overflow-auto mb-4 pb-3"
      data-simplebar="init"
    >
      <div className="simplebar-wrapper" style={{ margin: "0px -12px -16px" }}>
        <div className="simplebar-height-auto-observer-wrapper">
          <div className="simplebar-height-auto-observer"></div>
        </div>
        <div className="simplebar-mask">
          <div
            className="simplebar-offset"
            style={{ right: "0px", bottom: "0px" }}
          >
            <div
              className="simplebar-content-wrapper"
              style={{ height: "auto", overflow: "hidden" }}
            >
              <div
                className="simplebar-content"
                style={{ padding: "0px 12px 16px" }}
              >
                <div
                  className="row g-2 g-md-3 gallery"
                  style={{ minWidth: "30rem" }}
                  lg-uid="lg0"
                >
                  {gallery?.map((img, i) => (
                    <div className="col-4" key={i}>
                      <a className="gallery-item rounded rounded-md-3 mb-2 mb-md-3">
                        <img
                          style={{ minHeight: "300px", maxHeight: "300px" }}
                          src={`https://mern-online-properties.herokuapp.com/images/property/${img}`}
                        />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PropertyImages;
