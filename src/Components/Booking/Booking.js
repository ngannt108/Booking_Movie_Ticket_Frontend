import React, { useContext, useState, useEffect } from "react";
import "./Booking.css";
import { StoreContext } from "../../Redux/Store/Store";
import PaymentPopUp from "../ModalPaymentPopUp/ModalPaymentPopUp";

export default function Booking() {
  const store = useContext(StoreContext);
  let [count, setCount] = useState(0);
  // const date = `${store.Booking.booking[2]} - ${store.Booking.booking[3]}/2022`;
  const arrSeat = "ABCDEFGHI".split("");
  const arrSeatLeftNum = "1 2 3 4 5 6 7 8".split(" ");
  const arrSeatRightNum = "9 10 11 12".split(" ");
  var [arrSelectedSeat, setArr] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    // store.Booking.booking.length > 0 && (
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
            <div className="booking-screen">Screen</div>
            <div className="room-name">Rạp 1</div>
            <div className="seat-wrapper">
              <div className="seat-left">
                {arrSeat.map((seat) => {
                  return arrSeatLeftNum.map((num, i) => {
                    return (
                      <div
                        key={i}
                        onClick={(e) => {
                          checkSelected(e);
                        }}
                        className="seat"
                        name={seat + num}
                      >
                        {seat + num}
                      </div>
                    );
                  });
                })}
              </div>
              <div className="seat-right">
                {arrSeat.map((seat) => {
                  return arrSeatRightNum.map((num, i) => {
                    return (
                      <div
                        key={i}
                        onClick={(e) => {
                          checkSelected(e);
                        }}
                        className="seat"
                        name={seat + num}
                      >
                        {seat + num}
                      </div>
                    );
                  });
                })}
              </div>
              <div className="cinema-note">
                <div className="single">Casual seat</div>
                <div className="choosing">Seat selecting</div>
                <div className="busy">Seat have been selected</div>
                <div style={{ paddingLeft: "12px" }}>
                  {count} ticket / {count * 90}.000 VND
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
              {/* <img
                className="booking-movie-banner"
                height={"480px"}
                src={store.Booking.booking[4]}
                alt=""
              />
              <div className="booking-movie-name">
                {store.Booking.booking[1]}
              </div>
              <div className="booking-date">{date}</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    //   )
  );
}
