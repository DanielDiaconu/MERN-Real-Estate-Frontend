import React from "react";

function PropertyImages() {
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
                  data-thumbnails="true"
                  style={{ minWidth: "30rem" }}
                  lg-uid="lg0"
                >
                  <div className="col-8">
                    <a
                      className="gallery-item rounded rounded-md-3"
                      href="img/real-estate/single/01.jpg"
                      data-sub-html='<h6 className="fs-sm text-light">Bathroom</h6>'
                    >
                      <img src="/img/single01.jpg" alt="Gallery thumbnail" />
                    </a>
                  </div>
                  <div className="col-4">
                    <a
                      className="gallery-item rounded rounded-md-3 mb-2 mb-md-3"
                      href="img/real-estate/single/02.jpg"
                      data-sub-html='<h6 className="fs-sm text-light">Bedroom</h6>'
                    >
                      <img src="/img/single02.jpg" alt="Gallery thumbnail" />
                    </a>
                    <a
                      className="gallery-item rounded rounded-md-3"
                      href="img/real-estate/single/03.jpg"
                      data-sub-html='<h6 className="fs-sm text-light">Living room</h6>'
                    >
                      <img src="/img/single03.jpg" alt="Gallery thumbnail" />
                    </a>
                  </div>
                  <div className="col-12">
                    <div className="row g-2 g-md-3">
                      <div className="col">
                        <a
                          className="gallery-item rounded-1 rounded-md-2"
                          href="img/real-estate/single/04.jpg"
                          data-sub-html='<h6 className="fs-sm text-light">Bedroom</h6>'
                        >
                          <img
                            src="/img/single04.jpg"
                            alt="Gallery thumbnail"
                          />
                        </a>
                      </div>
                      <div className="col">
                        <a
                          className="gallery-item rounded-1 rounded-md-2"
                          href="img/real-estate/single/05.jpg"
                          data-sub-html='<h6 className="fs-sm text-light">Kitchen</h6>'
                        >
                          <img
                            src="/img/single05.jpg"
                            alt="Gallery thumbnail"
                          />
                        </a>
                      </div>
                      <div className="col">
                        <a
                          className="gallery-item rounded-1 rounded-md-2"
                          href="img/real-estate/single/06.jpg"
                          data-sub-html='<h6 className="fs-sm text-light">Living room</h6>'
                        >
                          <img
                            src="/img/single06.jpg"
                            alt="Gallery thumbnail"
                          />
                        </a>
                      </div>
                      <div className="col">
                        <a
                          className="gallery-item rounded-1 rounded-md-2"
                          href="img/real-estate/single/07.jpg"
                          data-sub-html='<h6 className="fs-sm text-light">Bathroom</h6>'
                        >
                          <img
                            src="/img/single07.jpg"
                            alt="Gallery thumbnail"
                          />
                        </a>
                      </div>
                      <div className="col">
                        <a
                          className="gallery-item more-item rounded-1 rounded-md-2"
                          href="img/real-estate/single/08.jpg"
                          data-sub-html='<h6 className="fs-sm text-light">Bathroom</h6>'
                        >
                          <img
                            s
                            src="/img/single08.jpg"
                            alt="Gallery thumbnail"
                          />
                          <span className="gallery-item-caption fs-base">
                            +5{" "}
                            <span className="d-none d-md-inline">photos</span>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
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
