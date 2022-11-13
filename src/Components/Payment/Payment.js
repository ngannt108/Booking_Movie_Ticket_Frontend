import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Redux/Store/Store";
import { API_DOMAIN } from "../../common/ApiController";
import swal from "sweetalert";
import "./Payment.css";

export default function Payment2() {
  const store = useContext(StoreContext);
  const navigate = useNavigate();

  const movieName = store.bookingRoom.Booking.booking.info[1];
  const cinemaName = store.bookingRoom.Booking.booking.info[0];

  const handleInput = (e, handleMethod) => {
    handleMethod(e.target.value);
  };

  // const userEmail = store.account.userAccount.email;

  const [cardNum, setCardNum] = useState(null);
  const [cardName, setCardName] = useState(null);
  const [exDate, setExDate] = useState({
    month: "January",
    year: "2023",
  });
  const [cvc, setCvc] = useState(null);

  const cineplex = store.Booking.booking[5];
  const apiCinemaId = store.Booking.booking[6];
  const apiFilmId = store.Booking.booking[7];
  const seat = store.Payment.payment[0];
  const movieTime = store.Payment.payment[1];

  const postPaymenInfo = async (e) => {
    e.preventDefault();
    // if (cardNum !== null && cvc !== null && cardName !== null) {
    //   const res = await fetch(`${API_DOMAIN}user/payment`, {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: userEmail.toString(),
    //       card: {
    //         cardNum: cardNum.toString(),
    //         CardName: cardName.toString(),
    //         exDate: exDate.toString(),
    //         cvc: cvc.toString(),
    //       },
    //       ticket: {
    //         cineplex: cineplex.toString(),
    //         apiCinemaId: apiCinemaId.toString(),
    //         apiFilmId: apiFilmId.toString(),
    //         seatCode: seat.toString(),
    //         date: movieTime.toString(),
    //       },
    //     }),
    //   });
    //   const status = await res.text();
    //   if (status === "OK") {
    //     await swal({
    //       title: "Payment Successful",
    //       text: "Enjoy your movie",
    //       icon: "success",
    //       button: "Okeee",
    //     });
    //     navigate("/");
    //   } else {
    //     swal(
    //       "Payment Unsuccessful",
    //       "There is something wrong! Please try again later!",
    //       "error"
    //     );
    //   }
    // } else {
    //   swal(
    //     "Payment Unsuccessful",
    //     "Make sure all fields are filled correctly",
    //     "error"
    //   );
    // }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const monthArr =
    "January Febuary March April May June Jule August September October November December".split(
      " "
    );
  const yearArr = "2023 2024 2025 2026 2027 2028 2029 2030".split(" ");

  return (
    <div className="main-payment">
      <div className="payment-wrapper">
        <div style={{ padding: "56px", display: "flex" }}>
          <div className="payment-info">
            <p className="payment-info-title">Credit/Debit Cards</p>
            <form className="payment-form">
              <p className="card-detail-title">Enter Card Details</p>
              <div>
                <label className="card-number-label">
                  Enter Debit / Credit Card Number
                </label>
                <br />
                <input
                  className="card-number-input"
                  placeholder="Card Number"
                  // onKeyUp={(e) => {
                  //   handleInput(e, setCardNum);
                  // }}
                />
              </div>
              <div className="three-input">
                <div>
                  <label>Expiry Month</label>
                  <br />
                  <select
                    onChange={(e) => {
                      setExDate((state) => {
                        return { ...state, month: e.target.value.toString() };
                      });
                    }}
                  >
                    {monthArr.map((month, i) => (
                      <option key={i} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Expiry Year</label>
                  <br />
                  <select
                    onChange={(e) => {
                      setExDate((state) => {
                        return { ...state, year: e.target.value.toString() };
                      });
                    }}
                  >
                    {yearArr.map((year, i) => (
                      <option key={i} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>CVC</label>
                  <br />
                  <input
                    required
                    onKeyUp={(e) => {
                      handleInput(e, setCvc);
                    }}
                    placeholder="CVC Number"
                    className="cvc-input"
                  />
                </div>
              </div>
              <div>
                <label className="card-name-label">Card Holder Name</label>
                <br />
                <input
                  className="card-name-input"
                  placeholder="Card Holder Name"
                  onKeyUp={(e) => {
                    handleInput(e, setCardName);
                  }}
                />
              </div>
              <button
                // onClick={(e) => {
                //   postPaymenInfo(e);
                // }}
                className="payment-button"
              >
                Proceed To Pay
              </button>
            </form>
          </div>
          <div className="booking-info-pm">
            <div className="booking-movie-info">
              <div style={{ padding: "20px", boxSizing: "border-box" }}>
                <h3>{movieName}</h3>
                {/* <p>{movieTime}</p> */}
                <p>{cinemaName}</p>
                <p>
                  {seat.slice(0, 1)}
                  {seat.slice(1).map((seat, i) => {
                    return (
                      <p key={i} style={{ display: "inline-block" }}>
                        {"-" + seat}
                      </p>
                    );
                  })}
                </p>
              </div>
            </div>
            <div className="summary-info">
              <div style={{ padding: "20px", margin: "0" }}>
                <h3>Payable Amount</h3>
                <div className="payment-amount">
                  <p>Ticket Price</p>
                  <p style={{ fontWeight: "bold" }} className="sum-in-num">
                    90.000 VND
                  </p>
                </div>
                <div className="payment-amount">
                  <p>Ticket(s)</p>
                  <p style={{ fontWeight: "bold" }} className="sum-in-num">
                    {seat.length}
                  </p>
                </div>
                <hr />
                <div className="payment-amount">
                  <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                    Total Amount
                  </p>
                  <p style={{ fontWeight: "bold" }} className="sum-in-num">
                    {seat.length * 90}.000 VND
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
