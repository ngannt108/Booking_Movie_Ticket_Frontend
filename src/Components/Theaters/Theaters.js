import React, { useEffect, useContext, useState } from "react";
import { StoreContext } from "../../Redux/Store/Store";
import { API_THEATERS, API_SHOWTIME } from "../../Common/ApiController";
import ModalBookingPopUp from "../ModalBookingPopUp/ModalBookingPopUp";
import ModalSignInPopUp from "../ModalSignInPopUp/ModalSignInPopUp";
import VideoPopUp from "../VideoPopUp/VideoPopUp";
import { Link } from "react-router-dom";
import "./Theater.css";
import { FormatDate, FormatTime } from "../../Common/Format";

export default function Theaters() {
  const store = useContext(StoreContext);

  //Các biến để xử lý việc chọn chi tiết rạp sau khi chọn hãng rạp
  const [cinemaName, setCinemaName] = useState(null);
  const [cinemaId, setCinemaId] = useState(null);
  const [films, setFilms] = useState(null);

  const [daily, setDaily] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);

  const dateHandle = (date) => {
    setCurrentDate(date);
    // console.log(date);
  };

  useEffect(() => {
    fetch(API_THEATERS.THEATERS)
      .then((res) => res.json())
      .then((dt) => {
        store.lsTheater.TheaterDispatch({
          type: "GETTHEATERS",
          payload: dt.data,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let current = new Date();
    let week = [];
    for (let i = 0; i < 7; i++) {
      let day = new Date(current);
      day.setDate(current.getDate() + i);
      day = FormatDate(day);
      week.push(day);
    }
    setDaily(week);
    // console.log(week);
  }, []);

  useEffect(() => {
    if (currentDate && cinemaId) {
      let ngayDaChon = `${currentDate.slice(6, 10)}-${currentDate.slice(
        3,
        5
      )}-${currentDate.slice(0, 2)}`;
      // console.log(ngayDaChon);
      fetch(API_SHOWTIME.CLUSTER + cinemaId, {
        headers: {
          //Nó sẽ nói cho sever biết, web này sẽ gởi giá trị đi là json
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ ngayDaChon: ngayDaChon }),
      })
        .then((res) => res.json())
        .then((dt) => {
          setFilms(dt.data);
        });
    }
  }, [currentDate, cinemaId]);

  const checkOnClick = (e, className) => {
    [...document.getElementsByClassName(className)].forEach((element) => {
      if (element.classList.value.includes("active-cinemas")) {
        element.classList.remove("active-cinemas");
      }
    });
    if (e.target.classList.value.includes(className))
      e.target.classList.add("active-cinemas");
  };

  return (
    <>
      <div className="cinemas-wallpaper">
        <img
          width={"100%"}
          alt="cinemas wallpaper"
          src="https://www.ascottproductions.com/wp-content/uploads/2020/02/as_production_banner-1.png"
        />
      </div>

      <section id="date" className="container cinemas-field">
        <div className="row">
          {/* Nav pills */}
          <div style={{ padding: "0", width: "100%" }}>
            <div className="cinema-logo">
              <img
                style={{ marginRight: "20px" }}
                height={80}
                alt=""
                src="https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png"
              />
              <p>Hệ thống rạp chiếu phim lớn nhất Việt Nam!</p>
            </div>
          </div>
          {/* Tab panes */}
          <div className="tab-content">
            <div className="cinemas-list">
              {store.lsTheater.Theater.lsTheater ? (
                <>
                  {store.lsTheater.Theater.lsTheater.map((cinema, i) => (
                    <div
                      key={i}
                      className="onClick-cinema"
                      onClick={(e) => {
                        setCinemaId(cinema._id);
                        setCinemaName(cinema.tenCumRap);
                        checkOnClick(e, "onClick-cinema");
                      }}
                    >
                      <img
                        style={{ height: "32px" }}
                        alt=""
                        src="https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png"
                      />
                      <p style={{ display: "inline-block" }}>
                        {cinema.tenCumRap}
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                true
              )}
            </div>
            {/* Films */}
            <div id="film">
              <div className="week">
                {daily?.map((date, i) => {
                  return (
                    <div
                      onClick={(e) => {
                        dateHandle(date);
                        checkOnClick(e, "day-wrapper");
                      }}
                      className="day-wrapper"
                      key={i}
                    >
                      {date.slice(0, 5)}
                    </div>
                  );
                })}
              </div>
              {cinemaName && currentDate && (
                <h3 style={{ margin: "28px" }}>
                  {"Lịch chiếu phim " + cinemaName + " ngày " + currentDate}
                </h3>
              )}
              <div className="showtime-detail">
                {films ? (
                  films.map((movie, index) => (
                    <div key={index} className="date__item row">
                      <Link to={"/Movie/" + movie.biDanh} className="col-md-2">
                        <img className="img-fluid" src={movie.hinhAnh} alt="" />
                      </Link>
                      <div className="col-md-10">
                        <h1>{movie.theLoai.join(", ")}</h1>
                        <h2>{movie.tenPhim}</h2>
                        <p className="movie-decription">{movie.moTa}</p>
                        <div className="rating-row">
                          <div className="film-duration">
                            {movie.thoiLuong}p
                          </div>
                          <div className="film-trailer">
                            <VideoPopUp link={movie.trailer} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="date__time col-md-10">
                            <i className="far fa-clock"></i>
                            <span>LỊCH CHIẾU</span>
                            <div>
                              {movie.lichChieu.map((showtime, index) => (
                                <div
                                  key={index}
                                  style={{ display: "inline-block" }}
                                >
                                  {new Date(showtime.ngayChieu) >
                                    Date.now() && (
                                    <>
                                      {store.account.userAccount.account ? (
                                        <ModalBookingPopUp
                                          info={[
                                            cinemaName,
                                            movie.tenPhim,
                                            `${FormatTime(
                                              showtime.ngayChieu
                                            )}  - ${FormatTime(
                                              showtime.gioKetThuc
                                            )}`,
                                            currentDate,
                                            movie.hinhAnh,
                                            movie.biDanh,
                                          ]}
                                          showtimeDetail={showtime}
                                        />
                                      ) : (
                                        <ModalSignInPopUp
                                          info={`${FormatTime(
                                            showtime.ngayChieu
                                          )}  - ${FormatTime(
                                            showtime.gioKetThuc
                                          )}`}
                                        />
                                      )}
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-schedule-mess">No schedule yet</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
