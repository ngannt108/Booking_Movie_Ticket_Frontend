import React, { useContext, useState, useEffect } from "react";
import "./Booking.css";
import { StoreContext } from "../../Redux/Store/Store";
import ModalPaymentPopUp from "../ModalPaymentPopUp/ModalPaymentPopUp";
import swal from "sweetalert";
import { FormatDate, FormatTime } from "../../Common/Format";

export default function Booking() {
  const store = useContext(StoreContext);
  let [count, setCount] = useState(0);

  const [chair, setChair] = useState(null);
  const [seatRow, setSeatRow] = useState(null);
  const [clusterName, setClusterName] = useState(null);
  const [orderedChairs, setOrderedChairs] = useState(null);
  const [isChoosingChairs, setIsChoosingChairs] = useState(null);

  useEffect(() => {
    if (
      store.bookingRoom.Booking.booking.showtime &&
      store.lsRooms.Rooms.rooms
    ) {
      store.lsRooms.Rooms.rooms.forEach((n) => {
        if (n._id === store.bookingRoom.Booking.booking.showtime.tenRap) {
          setClusterName(n.tenRap);
          setChair(n.ghe);
        }
      });
    }
  }, [store.bookingRoom.Booking.booking.showtime, store.lsRooms.Rooms.rooms]);

  var [arrSelectedSeat, setArr] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 552);
  }, []);

  useEffect(() => {
    if (chair) {
      setSeatRow(Object.keys(chair));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chair]);

  const checkSelected = (e) => {
    if (
      e.target.classList.contains("seat") &&
      !e.target.classList.contains("selected")
    ) {
      if (arrSelectedSeat.length < 10) {
        e.target.classList.add("selected");
        setArr([...arrSelectedSeat, e.target.innerText]);
        setCount(count + 1);
      } else {
        swal("Quá số lượng ghế", "Vui lòng chọn tối đa 10 ghế!", "error");
      }
    } else if (e.target.classList.contains("selected")) {
      e.target.classList.remove("selected");
      arrSelectedSeat.splice(arrSelectedSeat.indexOf(e.target.innerText), 1);
      setCount(count - 1);
    }
  };

  useEffect(() => {
    if (store.bookingRoom.Booking.booking.showtime) {
      // console.log(store.bookingRoom.Booking.booking.showtime);
      setOrderedChairs(store.bookingRoom.Booking.booking.showtime.gheDaChon);
      setIsChoosingChairs(
        store.bookingRoom.Booking.booking.showtime.gheDangChon
      );
    }
  }, [
    store.bookingRoom.Booking.booking.showtime.gheDaChon,
    store.bookingRoom.Booking.booking.showtime.gheDangChon,
  ]);

  return (
    <>
      {store.bookingRoom.Booking.booking && (
        <div>
          <img
            width={"100%"}
            alt=""
            src="https://s3.amazonaws.com/nightjarprod/content/uploads/sites/130/2021/12/17150018/BW-Wil_Haygood-54-1.jpg?fbclid=IwAR2h6hTgT0ag4vLusQN3CrBQyKZYa4T-4t-izl4q9NwMJGDuJLegzE2K8lQ"
            className="booking-wallpaper"
          />
          <div className="booking-wrapper">
            <div className="booking-header">
              <div className="booking-seat">
                {clusterName && <div className="room-name">{clusterName}</div>}
                <div className="booking-screen">Screen</div>
                <div className="seat-wrapper">
                  <div className="seat-left">
                    {chair &&
                      seatRow &&
                      seatRow.map((seat) =>
                        chair[seat].slice(0, 7).map((chair, i) => {
                          if (orderedChairs.includes(chair)) {
                            return (
                              <div
                                key={i}
                                className="seat booked-chair"
                                name={chair}
                              >
                                {chair}
                              </div>
                            );
                          } else if (isChoosingChairs.includes(chair)) {
                            return (
                              <div
                                key={i}
                                className="seat oldChair"
                                name={chair}
                              >
                                {chair}
                              </div>
                            );
                          } else {
                            return (
                              <div
                                key={i}
                                onClick={(e) => {
                                  checkSelected(e);
                                }}
                                className="seat"
                                name={chair}
                              >
                                {chair}
                              </div>
                            );
                          }
                        })
                      )}
                  </div>
                  <div className="seat-right">
                    {chair &&
                      seatRow &&
                      seatRow.map((seat) =>
                        chair[seat].slice(7, 10).map((chair, i) => {
                          if (orderedChairs.includes(chair)) {
                            return (
                              <div
                                key={i}
                                className="seat booked-chair"
                                name={chair}
                              >
                                {chair}
                              </div>
                            );
                          } else {
                            return (
                              <div
                                key={i}
                                onClick={(e) => {
                                  checkSelected(e);
                                }}
                                className="seat"
                                name={chair}
                              >
                                {chair}
                              </div>
                            );
                          }
                        })
                      )}
                  </div>
                  <div className="cinema-note">
                    <div className="single">Ghế trống</div>
                    <div className="choosing">Ghế bạn chọn</div>
                    <div className="busy">Ghế đã được đặt</div>
                    {arrSelectedSeat.length > 0 ? (
                      <div style={{ paddingLeft: "12px" }}>
                        <div>Các ghế được chọn là:</div>
                        {arrSelectedSeat.map((n, i) => (
                          <p key={i}>
                            {n}:{" "}
                            {store.bookingRoom.Booking.booking.showtime.giaVe}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <div style={{ paddingLeft: "12px" }}>
                        Quý khách vui lòng chọn ghế!
                      </div>
                    )}

                    <div style={{ paddingLeft: "12px" }}>
                      {count} ticket/{" "}
                      {(
                        count * store.bookingRoom.Booking.booking.showtime.giaVe
                      ).toLocaleString({
                        style: "currency",
                        currency: "VND",
                      })}
                      VND
                    </div>
                    {count === 0 ? (
                      <div className="noClick" style={{ paddingLeft: "12px" }}>
                        {/* <ModalPaymentPopUp /> */}
                        <button className="btn btn-secondary">Đặt vé</button>
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          // console.log(store.account.Profile.profile.hoTen);
                          store.bookingRoom.PaymentDisPatch({
                            type: "PAYMENT",
                            payload: {
                              danhSachGhe: arrSelectedSeat,
                              hoTen: store.account.Profile.profile.hoTen,
                              email: store.account.Profile.profile.email,
                              diemSuDung:
                                store.account.Profile.profile.diemThuong,
                              tongTien:
                                count *
                                store.bookingRoom.Booking.booking.showtime
                                  .giaVe,
                              tenPhim:
                                store.bookingRoom.Booking.booking.info[1],
                              biDanh: store.bookingRoom.Booking.booking.info[5],
                              tenRap: store.bookingRoom.Booking.booking.info[0],
                              lichChieu:
                                store.bookingRoom.Booking.booking.showtime,
                              phongChieu: clusterName,
                            },
                          });
                        }}
                        style={{ paddingLeft: "12px" }}
                      >
                        <ModalPaymentPopUp
                          maLichChieu={
                            store.bookingRoom.Booking.booking.showtime
                          }
                          gheDangChon={arrSelectedSeat}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="booking-info">
                  <img
                    className="booking-movie-banner"
                    height={"320px"}
                    src={store.bookingRoom.Booking.booking.info[4]}
                    alt=""
                  />
                  <div className="booking-movie-name">
                    {store.bookingRoom.Booking.booking.info[1]}
                  </div>
                  <div className="booking-date">
                    {FormatTime(
                      store.bookingRoom.Booking.booking.showtime.ngayChieu
                    ) +
                      " - " +
                      FormatDate(
                        store.bookingRoom.Booking.booking.showtime.ngayChieu
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
