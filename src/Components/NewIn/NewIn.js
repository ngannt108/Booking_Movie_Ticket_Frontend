import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { StoreContext } from "../../Redux/Store/Store";
import VideoPopUp2 from "../VideoPopUp2/VideoPopUp2";
import "./NewIn.css";

export default function NewIn() {
  const store = useContext(StoreContext);
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [link, setLink] = useState();

  var sliderFor = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };
  var sliderNav = {
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    centerMode: true,
    arrows: false,

    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  useEffect(() => {
    if (store.lsShowingMovie.ShowingMovie.listMovie) {
      setLink(store.lsShowingMovie.ShowingMovie.listMovie[0].trailer);
    }
  }, [store.lsShowingMovie.ShowingMovie.listMovie]);

  return (
    // Coming Soon
    store.lsShowingMovie.ShowingMovie.listMovie && (
      <>
        <section id="comingsoon" className="dark">
          <div>
            <Slider
              asNavFor={nav2}
              ref={(slider1) => setNav1(slider1)}
              {...sliderFor}
              className="slider-for"
            >
              {store.lsShowingMovie.ShowingMovie.listMovie?.map(
                (movie, index1) => (
                  <div key={index1} className="comingsoon__top top-1 pt-5">
                    <h1 className="container heading pt-4 pb-4">Đang chiếu</h1>
                    <div className="container comingsoon__content px-0">
                      <div className="comingsoon__item" data-slick-index="0">
                        <div className="row">
                          <div className="comingsoon__left col-6 pr-5">
                            <h1>{movie.theLoai}</h1>
                            <h2>{movie.tenPhim}</h2>
                            <div className="date">
                              <i
                                style={{ marginRight: "16px" }}
                                className="fas fa-calendar-week"
                              ></i>
                              {movie.ngayKhoiChieu.slice(0, 10)}
                            </div>
                            <p className="pr-5 movie-decription">
                              {movie.moTa}
                            </p>
                            <div style={{ display: "flex" }}>
                              <div className="newin-popup">
                                <VideoPopUp2 link={link} />
                              </div>
                              <Link
                                style={{ paddingTop: "16px" }}
                                to={"/Movie/" + movie.biDanh}
                              >
                                Xem thêm...
                              </Link>
                            </div>
                          </div>
                          <div
                            style={{
                              background: `url(${movie.hinhAnh})`,
                              height: "400px",
                            }}
                            className="comingsoon__right item1 col-6"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </Slider>
            <div className="container py-4">
              <Slider
                asNavFor={nav1}
                ref={(slider2) => setNav2(slider2)}
                {...sliderNav}
                className="comingsoon__nav slider-nav"
              >
                {store.lsShowingMovie.ShowingMovie.listMovie?.map(
                  (movie, index) => (
                    <div
                      onClick={() => {
                        setLink(movie.trailer);
                      }}
                      key={index}
                      className="cmnav__item"
                      data-slick-index="0"
                    >
                      <img src={movie.hinhAnh} alt="" className="mx-auto" />
                      <h5 className="mb-2">{movie.tenPhim}</h5>
                      <h6>{movie.ngayKhoiChieu.slice(0, 10)}</h6>
                    </div>
                  )
                )}
              </Slider>
            </div>
          </div>
        </section>
      </>
    )
  );
}
