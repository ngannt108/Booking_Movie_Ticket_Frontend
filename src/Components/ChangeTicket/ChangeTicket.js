import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../Redux/Store/Store";
import "./ChangeTicket.css";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_BOOKING } from "../../Common/ApiController";
import QRCode from "qrcode";
import swal from "sweetalert";
import Sweetalert2 from "sweetalert2";

export default function ChangeTicket() {
  const store = useContext(StoreContext);
  let [count, setCount] = useState(0);

  const [chair, setChair] = useState(null);
  const [seatRow, setSeatRow] = useState(null);
  const [clusterName, setClusterName] = useState(null);
  const [orderedChairs, setOrderedChairs] = useState(null);
  const [oldChairs, setOldChairs] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (store.bookingRoom.ChangeTicket.ticket && store.lsRooms.Rooms.rooms) {
      store.lsRooms.Rooms.rooms.forEach((n) => {
        if (
          n._id === store.bookingRoom.ChangeTicket.ticket.maLichChieu.tenRap._id
        ) {
          setClusterName(n.tenRap);
          setChair(n.ghe);
        }
      });
    }
  }, [store.bookingRoom.ChangeTicket.ticket, store.lsRooms.Rooms.rooms]);

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
      if (arrSelectedSeat.length < oldChairs.length) {
        e.target.classList.add("selected");
        setArr([...arrSelectedSeat, e.target.innerText]);
        setCount(count + 1);
      }
    } else if (e.target.classList.contains("selected")) {
      e.target.classList.remove("selected");
      arrSelectedSeat.splice(arrSelectedSeat.indexOf(e.target.innerText), 1);
      setCount(count - 1);
    }
  };

  useEffect(() => {
    if (store.bookingRoom.ChangeTicket.ticket.maLichChieu) {
      setOrderedChairs(
        store.bookingRoom.ChangeTicket.ticket.maLichChieu.gheDaChon
      );
      let old = [];
      store.bookingRoom.ChangeTicket.ticket.danhSachVe.map((n) =>
        old.push(n.maGhe)
      );
      setOldChairs(old);
      // setArr(old);
    }
  }, [store.bookingRoom.ChangeTicket.ticket.maLichChieu.gheDaChon]);

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date); //d.toLocaleString("en-AU")//

      return d.toLocaleString("en-AU", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }); // `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    }
    return "";
  };
  const formatTime = (date) => {
    if (date) {
      const d = new Date(date); //d.toLocaleString("en-AU")//
      const time = d.toLocaleString("en-AU", {
        hour: "numeric",
        minute: "numeric",
      });
      return time;
    }
    return "";
  };

  const [isConfirm, setConfirm] = useState(false);

  const modalConfirm = () => {
    return (
      <>
        <Modal show={isConfirm} onHide={() => setConfirm(false)}>
          <Modal.Header>
            <Modal.Title>X??c nh???n ?????i v??</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="payment-form">
              <div className="payment-cinema">
                <div className="payment-cluster">
                  <label className="card-number-label">T??n kh??ch h??ng</label>
                  <br />
                  <input
                    className="card-number-input"
                    value={store.account.Profile.profile.hoTen}
                    disabled
                  />
                </div>
                <div className="payment-cineplex">
                  <label className="card-name-label">Phim</label>
                  <br />
                  <input
                    className="card-name-input"
                    value={store.bookingRoom.ChangeTicket.ticket.phim.tenPhim}
                    disabled
                  />
                </div>
              </div>
              <div>
                <label className="card-name-label">L???ch chi???u</label>
                <br />
                <input
                  className="card-name-input"
                  value={
                    formatDate(
                      store.bookingRoom.ChangeTicket.ticket.maLichChieu
                        .ngayChieu
                    ) +
                    " - " +
                    formatTime(
                      store.bookingRoom.ChangeTicket.ticket.maLichChieu
                        .ngayChieu
                    )
                  }
                  disabled
                />
              </div>

              <div className="payment-cinema">
                <div className="payment-cluster">
                  <label className="card-name-label">C???m r???p</label>
                  <br />
                  <input
                    className="card-name-input"
                    value={
                      store.bookingRoom.ChangeTicket.ticket.maLichChieu
                        .tenCumRap.tenCumRap
                    }
                    disabled
                  />
                </div>
                <div className="payment-cineplex">
                  <label className="card-name-label">Ph??ng chi???u</label>
                  <br />
                  <input
                    className="card-name-input"
                    value={
                      store.bookingRoom.ChangeTicket.ticket.maLichChieu.tenRap
                        .tenRap
                    }
                    disabled
                  />
                </div>
              </div>

              <div className="payment-cinema">
                <div className="payment-cineplex">
                  <label className="card-name-label">Gh??? c??</label>
                  <br />
                  <input
                    className="card-name-input"
                    value={oldChairs.join(", ")}
                    disabled
                  />
                </div>
                <div className="payment-cineplex">
                  <label className="card-name-label">Gh??? m???i</label>
                  <br />
                  <input
                    className="card-name-input"
                    value={arrSelectedSeat.join(", ")}
                    disabled
                  />
                </div>
              </div>
              <button
                onClick={(e) => {
                  ConfirmChangeTicket(e);
                }}
                className="payment-button"
              >
                X??C NH???N
              </button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="cancel-button"
              onClick={() => {
                setConfirm(false);
                navigate("/Profile");
              }}
            >
              H???Y
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const SendChangeTicketEmail = async (dataChangeTicketEmail) => {
    const token = JSON.parse(localStorage.getItem("token"));
    await fetch(API_BOOKING.CHANGE_TICKET_MAIL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataChangeTicketEmail),
    });
  };

  const ConfirmChangeTicket = async (event) => {
    event.preventDefault();
    Sweetalert2.fire({
      title: "Xin ch??? gi??y l??t",
      allowOutsideClick: false,
    });
    Sweetalert2.showLoading();
    const token = JSON.parse(localStorage.getItem("token"));
    let res = await fetch(
      `${
        API_BOOKING.CHANGE_TICKET + store.bookingRoom.ChangeTicket.ticket._id
      }`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ danhSachGheMoi: arrSelectedSeat }),
      }
    );
    let message = await res.json();
    if (res.status === 200) {
      let dataBooking;
      const qr = await QRCode.toDataURL(
        `H??? t??n: ${store.account.Profile.profile.hoTen}, Phim: ${
          store.bookingRoom.ChangeTicket.ticket.phim.tenPhim
        }, Su???t chi???u: ${formatDate(
          store.bookingRoom.ChangeTicket.ticket.maLichChieu.ngayChieu
        ).toString()}, V??o l??c ${formatTime(
          store.bookingRoom.ChangeTicket.ticket.maLichChieu.ngayChieu
        ).toString()}, C???m r???p: ${
          store.bookingRoom.ChangeTicket.ticket.maLichChieu.tenCumRap.tenCumRap
        }, Ph??ng chi???u: ${
          store.bookingRoom.ChangeTicket.ticket.maLichChieu.tenRap.tenRap
        }, Gh??? c??: ${oldChairs}, Gh??? m???i: ${arrSelectedSeat} `
      ).then(); //setQR
      if (qr !== false) {
        dataBooking = {
          taiKhoan: store.account.Profile.profile.hoTen,
          tenPhim: store.bookingRoom.ChangeTicket.ticket.phim.tenPhim,
          ngayChieu: formatDate(
            store.bookingRoom.ChangeTicket.ticket.maLichChieu.ngayChieu
          ).toString(),
          gioChieu: formatTime(
            store.bookingRoom.ChangeTicket.ticket.maLichChieu.ngayChieu
          ).toString(),
          tenCumRap:
            store.bookingRoom.ChangeTicket.ticket.maLichChieu.tenCumRap
              .tenCumRap,
          QRCode: qr,
        };
        await SendChangeTicketEmail(dataBooking);
        Sweetalert2.close();
        await swal({
          title: "Th??nh c??ng",
          text: message.message,
          icon: "success",
          button: "Ok",
        });
        navigate("/Profile");
      }
    } else {
      swal("Th???t b???i", message.error, "error");
    }
  };

  return (
    <>
      <div>{console.log(store.bookingRoom.ChangeTicket.ticket)}</div>
      {store.bookingRoom.ChangeTicket.ticket && (
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
                            if (oldChairs.includes(chair)) {
                              return (
                                <div
                                  key={i}
                                  // onClick={(e) => {
                                  //   checkSelected(e);
                                  // }}
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
                                  className="seat booked-chair"
                                  name={chair}
                                >
                                  {chair}
                                </div>
                              );
                            }
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
                            if (oldChairs.includes(chair)) {
                              return (
                                <div
                                  key={i}
                                  // onClick={(e) => {
                                  //   checkSelected(e);
                                  // }}
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
                                  className="seat booked-chair"
                                  name={chair}
                                >
                                  {chair}
                                </div>
                              );
                            }
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
                    <div className="single">Gh??? tr???ng</div>
                    <div className="choosing">Gh??? b???n ch???n</div>
                    <div className="busy">Gh??? ???? ???????c ?????t</div>
                    <div className="old">Gh??? mu???n ?????i</div>
                    <div style={{ display: "flex", paddingLeft: "12px" }}>
                      <div style={{ marginRight: "50px" }}>
                        <div>Gh??? c??:</div>
                        <div>
                          {store.bookingRoom.ChangeTicket.ticket.danhSachVe.map(
                            (n, i) => (
                              <p key={i}>{n.maGhe}</p>
                            )
                          )}
                        </div>
                      </div>
                      {arrSelectedSeat.length > 0 ? (
                        <div>
                          <div>Gh??? ?????i:</div>
                          <div>
                            {arrSelectedSeat.map((n, i) => (
                              <p key={i}>{n}</p>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div style={{ paddingTop: "12px" }}>
                          <p>Vui l??ng ch???n l???i gh???!</p>
                        </div>
                      )}
                    </div>
                    {oldChairs && count < oldChairs.length ? (
                      <div className="noClick" style={{ paddingLeft: "12px" }}>
                        <button className="btn btn-secondary">?????i v??</button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setConfirm(true);
                        }}
                        className="btn booking-btn text-white"
                      >
                        ?????i v??
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="booking-info">
                  <img
                    className="booking-movie-banner"
                    height={"320px"}
                    src={store.bookingRoom.ChangeTicket.ticket.phim.hinhAnh}
                    alt=""
                  />
                  <div className="booking-movie-name">
                    {store.bookingRoom.ChangeTicket.ticket.phim.tenPhim}
                  </div>
                  <div className="booking-date">
                    {formatDate(
                      store.bookingRoom.ChangeTicket.ticket.maLichChieu
                        .ngayChieu
                    )}{" "}
                    -{" "}
                    {formatTime(
                      store.bookingRoom.ChangeTicket.ticket.maLichChieu
                        .ngayChieu
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>{isConfirm && modalConfirm()}</div>
    </>
  );
}
