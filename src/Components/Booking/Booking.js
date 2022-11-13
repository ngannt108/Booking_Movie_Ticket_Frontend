import React, { useContext, useState, useEffect } from "react";
import "./Booking.css";
import { StoreContext } from "../../Redux/Store/Store";
import PaymentPopUp from "../ModalPaymentPopUp/ModalPaymentPopUp";

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
                        <PaymentPopUp />
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          // store.PaymentDisPatch({
                          //   type: "PAYMENT",
                          //   payload: [arrSelectedSeat, date],
                          // });
                        }}
                        style={{ paddingLeft: "12px" }}
                      >
                        <PaymentPopUp />
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
