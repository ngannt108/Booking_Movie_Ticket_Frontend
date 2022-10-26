import React, { useEffect, useState, useContext } from "react";
import "./Cinemas.css";
import VideoPopUp from "../VideoPopUp/VideoPopUp";
import { Link } from "react-router-dom";
import ModalBookingPopUp from "../ModalBookingPopUp/ModalBookingPopUp";
import ModalSignInPopUp from "../ModalSignInPopUp/ModalSignInPopUp";
import { API_CINEMA } from "../../common/ApiController";
import { StoreContext } from "../../Redux/Store/Store";

export default function Cinemas() {
  const store = useContext(StoreContext);

  //Các biến để xử lý việc chọn hãng rạp
  const [cinemaLogos, setCinemas] = useState(null);
  const [branchId, setbranchId] = useState(null);
  const [cinemaList, setCinemaList] = useState(null);
  const [cinemaName, setCinemaName] = useState(null);
  const [cinemaAddress, setCinemaAddress] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  //Các biến để xử lý việc hiện thêm thông tin rạp
  const [pageCount, setPageCount] = useState(5);
  const [lastIndex, setLastIndex] = useState(null);
  const [totalItems, setTotalIems] = useState(null);

  //Các biến để xử lý việc chọn chi tiết rạp sau khi chọn hãng rạp
  const [cineplex, setCineplex] = useState(null);
  const [ApiCinemaId, setApiCinemaId] = useState(null);
  const [films, setFilms] = useState(null);

  //Biến ngày giờ hiện tại
  const current = new Date();
  const date = `${current.getMonth() + 1}-${current.getDate()}`;
  const [currentDate, setCurentDate] = useState(null);

  const branchHandle = (id) => {
    setbranchId(id);
  };

  const listSearchHandle = (event) => {
    setSearchValue(event.target.value.toLowerCase().replaceAll(" ", ""));
  };

  const dateHandle = (date) => {
    setCurentDate(date.slice(5, 10));
  };

  // Chỉ chạy dữ liệu lấy logo rạp 1 lần
  useEffect(() => {
    setCurentDate(date);
    fetch(API_CINEMA.CINEMA)
      .then((res) => res.json())
      .then((dt) => setCinemas(dt));
  }, [date]);

  //Khi user chọn branch hoặc nhấn xem thêm
  useEffect(() => {
    if (branchId !== null) {
      fetch(`${API_CINEMA.BRANCH}${branchId}&lastIndex=0&count=${pageCount}`)
        .then((res) => res.json())
        .then((dt) => {
          setFilms(null);
          setCinemaList(dt);
          setLastIndex(dt.LastIndex);
          setTotalIems(dt.TotalItems);
        });
    }
  }, [branchId, pageCount]);

  // Check mỗi khi user chuyển branch thì trả lastIndex, pageCount, totalItems và currentDate về giá trị mặc định
  useEffect(() => {
    if (branchId !== null) {
      setPageCount(5);
      setLastIndex(null);
      setTotalIems(null);
      setCurentDate(date);
      [...document.getElementsByClassName("onClick-cinema")].forEach(
        (element) => {
          if (element.classList.value.includes("active-cinemas")) {
            element.classList.remove("active-cinemas");
          }
        }
      );
    }
  }, [branchId, date]);

  useEffect(() => {
    if (cineplex && ApiCinemaId) {
      fetch(
        `${API_CINEMA.SCHEDULE}${ApiCinemaId}&cineplex=${cineplex}&date=2022-${currentDate}`
      )
        .then((res) => res.json())
        .then((dt) => {
          setFilms(dt);
        });

      fetch(`${API_CINEMA.DETAIL}${cineplex}&apiCinemaId=${ApiCinemaId}`)
        .then((res) => res.json())
        .then((dt) => setCinemaAddress(dt.Address));
    }
  }, [cineplex, ApiCinemaId, currentDate]);

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
          src="https://png.pngtree.com/thumb_back/fh260/back_our/20190621/ourmid/pngtree-leisure-time-cinema-watching-movie-background-image_195506.jpg?fbclid=IwAR3vi9xD-j841wN_7OhyoyVQpoYqMS42q0wlc7TfLTY80LMATSHpCglQGVw"
        />
      </div>
      <section id="date" className="container">
        <div className="row">
          {/* Nav pills */}
          <div>
            <ul className="nav nav-pills col-600-12">
              {cinemaLogos &&
                cinemaLogos.map((cinema, index) => (
                  <li
                    onClick={() => branchHandle(cinema.Id)}
                    key={index}
                    className="nav-item"
                  >
                    <a className="nav-link" data-toggle="pill" href="#film">
                      <img width={80} alt="" src={cinema.Logo} />
                    </a>
                  </li>
                ))}
            </ul>
          </div>
          {/* Tab panes */}
          <div className="tab-content">
            <div className="cinemas-list">
              {cinemaList ? (
                <>
                  <input
                    onKeyUp={(event) => listSearchHandle(event)}
                    className="cinemas-list-search"
                    placeholder="Find cinema"
                  />
                  {cinemaList.Items.filter((cinema) =>
                    cinema.Name.toLowerCase()
                      .replaceAll(" ", "")
                      .includes(searchValue)
                  ).map((cinema, i) => (
                    <div
                      key={i}
                      className="onClick-cinema"
                      onClick={(e) => {
                        setCineplex(cinema.Cineplex);
                        setApiCinemaId(cinema.ApiCinemaId);
                        setCinemaName(cinema.Name);
                        checkOnClick(e, "onClick-cinema");
                      }}
                    >
                      <img height={40} width={40} alt="" src={cinema.Logo} />
                      <p>{cinema.Name}</p>
                    </div>
                  ))}
                  {totalItems <= lastIndex ? (
                    true
                  ) : (
                    <button
                      onClick={() => setPageCount(lastIndex + 5)}
                      className="show-more-btn"
                    >
                      Hiện thêm rạp
                    </button>
                  )}
                </>
              ) : (
                <div className="message-empty">
                  Please choose a cinema's branch
                </div>
              )}
            </div>
            {/* Films */}
            <div id="film">
              {films && (
                <>
                  <div className="week">
                    {films.ShowTimes.map((date, i) => {
                      return (
                        <div
                          onClick={(e) => {
                            dateHandle(date);
                            checkOnClick(e, "day-wrapper");
                          }}
                          className="day-wrapper"
                          key={i}
                        >
                          {date.slice(8, 10)}/{date.slice(5, 7)}
                        </div>
                      );
                    })}
                  </div>
                  <h3 style={{ margin: "28px" }}>
                    {"Lịch chiếu phim " +
                      cinemaName +
                      " ngày " +
                      currentDate.slice(3, 5) +
                      "/" +
                      currentDate.slice(0, 2)}
                  </h3>
                  <div className="cinema-address">{cinemaAddress}</div>
                  {films.Films.length > 0 ? (
                    films.Films.map((film, i) => (
                      <div key={i} className="date__item row">
                        <Link
                          to={"/Movie/" + film.ApiFilmId}
                          className="col-md-2"
                          href="#"
                        >
                          <img
                            className="img-fluid"
                            src={film.GraphicUrl}
                            alt=""
                          />
                        </Link>
                        <div className="col-md-10">
                          <h1>{film.ApiGenreName}</h1>
                          <h2>{film.Title}</h2>
                          <p>{film.SynopsisEn}</p>
                          <div className="rating-row">
                            <div className="film-rating">{film.ApiRating}</div>
                            <div className="film-trailer">
                              <VideoPopUp
                                link={film.TrailerUrl.replace(
                                  "watch?v=",
                                  "embed/"
                                )}
                              />
                            </div>
                          </div>

                          <div className="row">
                            <div className="date__time col-md-10">
                              <i className="far fa-clock"></i>
                              <span>VIEWING TIMES</span>
                              <div>
                                {film.VersionsCaptions[0].ShowTimes.map(
                                  (showTime, i) => {
                                    return (
                                      <div
                                        style={{ display: "inline-block" }}
                                        key={i}
                                      >
                                        <div
                                          style={{ display: "inline-block" }}
                                          onClick={() => {
                                            store.BookingDispatch({
                                              type: "BOOKING",
                                              payload: [
                                                cinemaName,
                                                film.Title,
                                                showTime.ShowTime.slice(11, 16),
                                                currentDate.slice(3, 5) +
                                                  "/" +
                                                  currentDate.slice(0, 2),
                                                film.GraphicUrl,
                                                cineplex,
                                                ApiCinemaId,
                                                film.ApiFilmId,
                                                cinemaAddress,
                                              ],
                                            });
                                          }}
                                        >
                                          {store.userAccount.account ? (
                                            <ModalBookingPopUp
                                              info={[
                                                cinemaName,
                                                film.Title,
                                                showTime.ShowTime.slice(11, 16),
                                                currentDate.slice(3, 5) +
                                                  "/" +
                                                  currentDate.slice(0, 2),
                                              ]}
                                            />
                                          ) : (
                                            <ModalSignInPopUp
                                              info={showTime.ShowTime.slice(
                                                11,
                                                16
                                              )}
                                            />
                                          )}
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-schedule-mess">No schedule yet</div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
