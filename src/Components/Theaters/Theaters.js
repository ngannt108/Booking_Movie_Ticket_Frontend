import React, { useEffect, useContext, useState } from "react";
import { StoreContext } from "../../Redux/Store/Store";
import { API_THEATERS, API_SHOWTIME } from "../../common/ApiController";
import ModalBookingPopUp from "../ModalBookingPopUp/ModalBookingPopUp";
import ModalSignInPopUp from "../ModalSignInPopUp/ModalSignInPopUp";
import VideoPopUp from "../VideoPopUp/VideoPopUp";
import { Link } from "react-router-dom";
import "./Theater.css";

export default function Theaters() {
  const store = useContext(StoreContext);

  //Các biến để xử lý việc chọn chi tiết rạp sau khi chọn hãng rạp
  const [cinemaName, setCinemaName] = useState(null);
  const [cinemaId, setCinemaId] = useState(null);
  const [films, setFilms] = useState(null);

  const [daily, setDaily] = useState(null);
  const [currentDate, setCurentDate] = useState(null);

  const dateHandle = (date) => {
    setCurentDate(date);
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
      day =
        day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
      week.push(day);
    }
    setDaily(week);
  }, []);

  useEffect(() => {
    if (currentDate && cinemaId) {
      GetShowtimeOfCluster(currentDate, cinemaId);
    }
  }, [currentDate, cinemaId]);

  const GetShowtimeOfCluster = async (date, cinemaId) => {
    let time = { ngayDaChon: date };
    let res = await fetch(API_SHOWTIME.CLUSTER + cinemaId, {
      headers: {
        //Nó sẽ nói cho sever biết, web này sẽ gởi giá trị đi là json
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(time),
    });
    console.log(res.status);
    let data = await res.json();
    setFilms(data.data);
  };

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
    <div>
      {/* {console.log(store)} */}
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
          <div style={{ padding: "0" }}>
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
                        // setCineplex(cinema.Cineplex);
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
                      {date.slice(8, 10)}/{date.slice(5, 7)}
                    </div>
                  );
                })}
              </div>
              {cinemaName && currentDate && (
                <h3 style={{ margin: "28px" }}>
                  {"Lịch chiếu phim " +
                    cinemaName +
                    " ngày " +
                    currentDate.slice(8, 10) +
                    "/" +
                    currentDate.slice(5, 7)}
                </h3>
              )}
              <div className="date__item row">
                <Link
                  // to={"/Movie/" + film.ApiFilmId}
                  className="col-md-2"
                  to=""
                >
                  <img
                    className="img-fluid"
                    src="http://res.cloudinary.com/debmcaerj/image/upload/v1666607967/BookingTicket/Graphic_BlackAdam_baavpg.jpg"
                    alt=""
                  />
                </Link>
                <div className="col-md-10">
                  <h1>Hành Động</h1>
                  <h2>Black Adam</h2>
                  <p>
                    Dwayne Johnson sẽ góp mặt trong tác phẩm hành động - phiêu
                    lưu mới của New Line Cinema, mang tên BLACK ADAM. Đây là bộ
                    phim đầu tiên trên màn ảnh rộng khai thác câu chuyện của
                    siêu anh hùng DC này, dưới sự sáng tạo của đạo diễn Jaume
                    Collet-Serra (đạo diễn của Jungle Cruise). Gần 5.000 năm sau
                    khi bị cầm tù với quyền năng tối thượng từ những vị thần cổ
                    đại, Black Adam (Dwayne Johnson) sẽ được giải phóng khỏi nấm
                    mồ chết chóc của mình, mang tới thế giới hiện đại một kiểu
                    nhận thức về công lý hoàn toàn mới.
                  </p>
                  <div className="rating-row">
                    <div className="film-rating">18+</div>
                    <div className="film-trailer">
                      <VideoPopUp link="https://www.youtube.com/embed/ucqg5k5vSVU" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="date__time col-md-10">
                      <i className="far fa-clock"></i>
                      <span>VIEWING TIMES</span>
                      <div>
                        <div style={{ display: "inline-block" }}>
                          <ModalBookingPopUp
                            info={["CGV", "Black Adam", "16h30"]}
                          />
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
    </div>
  );
}
