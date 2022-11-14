import React, { useContext, useState, useEffect } from "react";
import "./Booking.css";
import { StoreContext } from "../../Redux/Store/Store";
import PaymentPopUp from "../ModalPaymentPopUp/ModalPaymentPopUp";
import ModalFoodAndDrink from "../FoodAndDrink/ModalFoodAndDrink";

export default function Booking() {
  const store = useContext(StoreContext);
  let [count, setCount] = useState(0);

  const [chair, setChair] = useState(null);
  const [seatRow, setSeatRow] = useState(null);
  const [clusterName, setClusterName] = useState(null);

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
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (chair) {
      setSeatRow(Object.keys(chair).slice(1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chair]);

  const checkSelected = (e) => {
    if (
      e.target.classList.contains("seat") &&
      !e.target.classList.contains("selected")
    ) {
      e.target.classList.add("selected");
      setArr([...arrSelectedSeat, e.target.innerText]);
      setCount(count + 1);
    } else if (e.target.classList.contains("selected")) {
      e.target.classList.remove("selected");
      arrSelectedSeat.splice(arrSelectedSeat.indexOf(e.target.innerText), 1);
      setCount(count - 1);
    }
  };

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
                        chair[seat].slice(0, 7).map((chair, i) => (
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
                        ))
                      )}
                  </div>
                  <div className="seat-right">
                    {chair &&
                      seatRow &&
                      seatRow.map((seat) =>
                        chair[seat].slice(7, 10).map((chair, i) => (
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
                        ))
                      )}
                  </div>
                  <div className="cinema-note">
                    <div className="single">Casual seat</div>
                    <div className="choosing">Seat selecting</div>
                    <div className="busy">Seat have been selected</div>
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
                      <div>Quý khách vui lòng chọn ghế!</div>
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
                        <ModalFoodAndDrink />
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          store.bookingRoom.PaymentDisPatch({
                            type: "PAYMENT",
                            payload: {
                              tentaiKhoan: store.account.Profile.profile._id,
                              danhSachVe: arrSelectedSeat.map((n) => {
                                return {
                                  maGhe: n,
                                  giaGhe:
                                    store.bookingRoom.Booking.booking.showtime
                                      .giaVe,
                                };
                              }),
                              maLichChieu:
                                store.bookingRoom.Booking.booking.showtime._id,
                              thoiGianDat: new Date().toISOString(),
                              // phim:
                            },
                          });
                        }}
                        style={{ paddingLeft: "12px" }}
                      >
                        <ModalFoodAndDrink />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="booking-info">
                  <img
                    className="booking-movie-banner"
                    height={"480px"}
                    src={store.bookingRoom.Booking.booking.info[4]}
                    alt=""
                  />
                  <div className="booking-movie-name">
                    {store.bookingRoom.Booking.booking.info[1]}
                  </div>
                  <div className="booking-date">
                    {store.bookingRoom.Booking.booking.showtime.ngayChieu.slice(
                      11,
                      13
                    ) *
                      1 +
                      7 +
                      store.bookingRoom.Booking.booking.showtime.ngayChieu.slice(
                        13,
                        16
                      ) +
                      " - " +
                      store.bookingRoom.Booking.booking.showtime.ngayChieu.slice(
                        8,
                        10
                      ) +
                      "/" +
                      store.bookingRoom.Booking.booking.showtime.ngayChieu.slice(
                        5,
                        7
                      ) +
                      "/" +
                      store.bookingRoom.Booking.booking.showtime.ngayChieu.slice(
                        0,
                        4
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
