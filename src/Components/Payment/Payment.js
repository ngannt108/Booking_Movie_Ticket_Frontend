import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Redux/Store/Store";
import { API_BOOKING, API_FOODDRINKS } from "../../common/ApiController";
import { Modal, Image } from "react-bootstrap";
import swal from "sweetalert";
import "./Payment.css";
import QRCode from "qrcode";
import { queryAllByText } from "@testing-library/react";

export default function Payment() {
  const store = useContext(StoreContext);
  const navigate = useNavigate();
  const [listCombo, setCombo] = useState(null);
  const [listFD, setFD] = useState([]);

  // const [QR, setQR] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceBefore, setTotalPriceBefore] = useState(0);
  const [isSuccessPaypal, setIsSuccessPaypal] = useState(false);
  const [useRewardPoints, setUseRewardPoints] = useState(false);
  const [RewardPoints, setRewardPoints] = useState(0);

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

  // const renderQR = () => {
  //   return (
  //     <div>
  //       <Image src={QR} />
  //     </div>
  //   );
  // };

  const CheckCombo = (combo, event) => {
    if (event.target.checked === true) {
      setFD([...listFD, combo]);
    } else if (event.target.checked === false) {
      setFD(listFD.splice(listFD.indexOf(combo.tenCombo), 1));
    }
  };

  const biDanh = store.bookingRoom.Payment.payment.biDanh;
  const showtimeID = store.bookingRoom.Payment.payment.lichChieu._id;

  const PostPaymenInfo = async (showtimeID, biDanh, DATA_BOOKING) => {
    let token = JSON.parse(localStorage.getItem("token"));
    const res = await fetch(
      `${API_BOOKING.BOOK_TICKET}${biDanh}/showtime/${showtimeID}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Basic ${token}`,
        },
        body: JSON.stringify(DATA_BOOKING),
      }
    );
    if (res.status === 200) {
      await swal({
        title: "Payment Successful",
        text: "Enjoy your movie",
        icon: "success",
        button: "Ok",
      });
      navigate("/Profile");
    } else {
      swal(
        "Payment Unsuccessful",
        "There is something wrong! Please try again later!",
        "error"
      );
    }
  };

  const ConfirmTicket = (event) => {
    event.preventDefault();
    setConfirm(true);
    setTotalPrice(store.bookingRoom.Payment.payment.tongTien);
    setTotalPriceBefore(store.bookingRoom.Payment.payment.tongTien);
  };

  useEffect(() => {
    fetch(API_FOODDRINKS.GETALL)
      .then((res) => res.json())
      .then((dt) => setCombo(dt.data));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isConfirm, setConfirm] = useState(false);

  //PAYPAL
  const Paypal = ({ total }) => {
    const paypal = useRef();
    // console.log("tổng tiền", total);
    useEffect(() => {
      FetchDataPaypal(total, paypal);
    }, [total]);

    return (
      <div>
        <div ref={paypal}></div>
      </div>
    );
  };

  const FetchDataPaypal = async (total, paypal) => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Thanh toán vé phim",
                amount: {
                  currency_code: "CAD",
                  value: (total / 23000).toFixed(2),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          // console.log(order);
          setIsSuccessPaypal(true);
        },
        onError: (err) => {
          // console.log(err);
        },
      })
      .render(paypal.current);
  };

  const CreateQR = async () => {
    let qr = await QRCode.toDataURL(
      `Họ tên: ${store.bookingRoom.Payment.payment?.hoTen}, Phim: ${store.bookingRoom.Payment.payment?.tenPhim
      }, Suất chiếu ${store.bookingRoom.Payment.payment?.lichChieu.ngayChieu.slice(11, 13) *
      1 +
      7 +
      store.bookingRoom.Payment.payment?.lichChieu.ngayChieu.slice(13, 16) +
      " - " +
      store.bookingRoom.Payment.payment?.lichChieu.ngayChieu.slice(8, 10) +
      "/" +
      store.bookingRoom.Payment.payment?.lichChieu.ngayChieu.slice(5, 7) +
      "/" +
      store.bookingRoom.Payment.payment?.lichChieu.ngayChieu.slice(0, 4)
      }, Ghế:${store.bookingRoom.Payment.payment?.danhSachGhe.join(
        ", "
      )}, Cụm rạp: ${store.bookingRoom.Payment.payment?.tenRap}, Phòng chiếu: ${store.bookingRoom.Payment.payment?.phongChieu
      }`
    );
    if (qr !== false) {
      const dataSendEmail = {
        taiKhoan: store.bookingRoom.Payment.payment?.hoTen,
        tenCumRap: store.bookingRoom.Payment.payment?.tenRap,
        tenPhim: store.bookingRoom.Payment.payment?.tenPhim,
        ngayChieu: formatDate(
          store.bookingRoom.Payment.payment?.lichChieu.ngayChieu
        ).toString(),
        gioChieu: formatTime(
          store.bookingRoom.Payment.payment?.lichChieu.ngayChieu
        ).toString(),
        QRCode: qr,
      };
      console.log(dataSendEmail);
      const DATA_BOOKING = {
        danhSachGhe: store.bookingRoom.Payment.payment.danhSachGhe,
        danhSachAnUong: [],
        diemSuDung: RewardPoints,
      };
      if (isSuccessPaypal === true) {
        console.log("Reward point", RewardPoints);
        const success = await PostPaymenInfo(showtimeID, biDanh, DATA_BOOKING); //{ danhSachGhe:
        if (success !== false) {
          await SendEmail(dataSendEmail);
        }
        setConfirm(false); //đóng modal
        setIsSuccessPaypal(false);
      }
    }
  };

  const SendEmail = async (dataSendEmail) => {
    const token = JSON.parse(localStorage.getItem("token"));
    await fetch(API_BOOKING.SEND_EMAIL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataSendEmail),
    });
  };

  useEffect(() => {
    //setQR
    if (CreateQR() !== false) {
      const dataSendEmail = {
        taiKhoan: store.bookingRoom.Payment.payment?.hoTen,
        tenCumRap: store.bookingRoom.Payment.payment?.tenRap,
        tenPhim: store.bookingRoom.Payment.payment?.tenPhim,
        ngayChieu: formatDate(
          store.bookingRoom.Payment.payment?.lichChieu.ngayChieu
        ).toString(),
        gioChieu: formatTime(
          store.bookingRoom.Payment.payment?.lichChieu.ngayChieu
        ).toString(),
        QRCode: CreateQR(),
      };
      // console.log(dataSendEmail);
      const DATA_BOOKING = {
        danhSachGhe: store.bookingRoom.Payment.payment.danhSachGhe,
        danhSachAnUong: [],
        diemSuDung: RewardPoints,
      };
      if (isSuccessPaypal === true) {
        // console.log("Reward point", RewardPoints);
        const success = PostPaymenInfo(showtimeID, biDanh, DATA_BOOKING); //{ danhSachGhe:
        if (success !== false) {
          SendEmail(dataSendEmail);
        }
        setConfirm(false); //đóng modal
        setIsSuccessPaypal(false);
      }
    }
  }, [isSuccessPaypal]);

  useEffect(() => {
    if (store.bookingRoom.Payment.payment.tongTien) {
      setTotalPrice(store.bookingRoom.Payment.payment.tongTien);
      setTotalPriceBefore(store.bookingRoom.Payment.payment.tongTien);
    }
  }, [store.bookingRoom.Payment.payment.tongTien]);

  const UseRewardPoints = (e) => {
    e.preventDefault();
    setUseRewardPoints(true);
    setRewardPoints(
      store.bookingRoom.Payment.payment.diemSuDung > totalPrice / 1000
        ? totalPrice / 1000
        : store.bookingRoom.Payment.payment.diemSuDung
    );
    setConfirm(false);
    // setUseRewardPoints(e.target.value)
  };

  const afterDiscount = (e) => {
    e.preventDefault();
    if (RewardPoints >= 20) {
      setTotalPrice(totalPriceBefore - RewardPoints * 1000);
      setUseRewardPoints(false);
      setConfirm(true);
    } else {
      swal(
        "Sử dụng điểm tích lũy không thành công",
        "Quý khách vui lòng sử dụng tối thiểu 20 điểm! Hãy thử lại nhé!",
        "error"
      );
    }
  };

  const modalRewardPoints = () => {
    return (
      <>
        <Modal show={useRewardPoints} onHide={() => setUseRewardPoints(false)}>
          <Modal.Header>
            <Modal.Title>Điểm tích lũy của bạn</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="payment-form">
              <div>
                <label className="card-number-label">Điểm tích lũy</label>
                <br />
                <input
                  className="card-number-input"
                  value={store.bookingRoom.Payment.payment?.diemSuDung || 0}
                  disabled
                />
              </div>
              <div>
                <label className="card-number-label">
                  Chọn điểm thanh toán
                </label>
                <br />
                <input
                  className="card-number-input"
                  min={20}
                  max={
                    store.bookingRoom.Payment.payment?.diemSuDung >
                      totalPrice / 1000
                      ? totalPrice / 1000
                      : store.bookingRoom.Payment.payment?.diemSuDung
                  }
                  value={RewardPoints}
                  type="number"
                  disabled={
                    store.bookingRoom.Payment.payment?.diemSuDung >= 2
                      ? false
                      : true
                  }
                  onChange={(e) => setRewardPoints(e.target.value)}
                />
              </div>
              <button
                onClick={(e) => afterDiscount(e)}
                className="points-button"
              >
                SỬ DỤNG
              </button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="cancel-button"
              onClick={() => {
                setUseRewardPoints(false);
                setRewardPoints(0);
              }}
            >
              HỦY
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const modalConfirm = () => {
    return (
      <>
        <Modal show={isConfirm} onHide={() => setConfirm(false)}>
          <Modal.Header>
            <Modal.Title>Xác nhận mua vé</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="payment-form">
              <div className="payment-cinema">
                <div className="payment-cluster">
                  <label className="card-number-label">Tên khách hàng</label>
                  <br />
                  <input
                    className="card-number-input"
                    value={store.bookingRoom.Payment.payment.hoTen}
                    disabled
                  />
                </div>
                <div className="payment-cineplex">
                  <label className="card-name-label">Phim</label>
                  <br />
                  <input
                    className="card-name-input"
                    value={store.bookingRoom.Payment.payment.tenPhim}
                    disabled
                  />
                </div>
              </div>
              <div className="payment-cinema">
                <div className="payment-cluster">
                  <label className="card-name-label">Lịch chiếu</label>
                  <br />
                  <input
                    className="card-name-input"
                    value={
                      store.bookingRoom.Payment.payment.lichChieu.ngayChieu.slice(
                        11,
                        13
                      ) *
                      1 +
                      7 +
                      store.bookingRoom.Payment.payment.lichChieu.ngayChieu.slice(
                        13,
                        16
                      ) +
                      " - " +
                      store.bookingRoom.Payment.payment.lichChieu.ngayChieu.slice(
                        8,
                        10
                      ) +
                      "/" +
                      store.bookingRoom.Payment.payment.lichChieu.ngayChieu.slice(
                        5,
                        7
                      ) +
                      "/" +
                      store.bookingRoom.Payment.payment.lichChieu.ngayChieu.slice(
                        0,
                        4
                      )
                    }
                    disabled
                  />
                </div>
                <div className="payment-cineplex">
                  <label className="card-name-label">Ghế đã chọn</label>
                  <br />
                  <input
                    className="card-name-input"
                    value={store.bookingRoom.Payment.payment.danhSachGhe.join(
                      ", "
                    )}
                    disabled
                  />
                </div>
              </div>

              <div className="payment-cinema">
                <div className="payment-cluster">
                  <label className="card-name-label">Cụm rạp</label>
                  <br />
                  <input
                    className="card-name-input"
                    value={store.bookingRoom.Payment.payment.tenRap}
                    disabled
                  />
                </div>
                <div className="payment-cineplex">
                  <label className="card-name-label">Phòng chiếu</label>
                  <br />
                  <input
                    className="card-name-input"
                    value={store.bookingRoom.Payment.payment.phongChieu}
                    disabled
                  />
                </div>
              </div>

              {RewardPoints >= 20 ? (
                <h6>Bạn đã sử dụng {RewardPoints} điểm để thanh toán</h6>
              ) : (
                ""
              )}
              <div>
                <label className="card-name-label">Thanh toán</label>
                <br />
                <input
                  className="card-name-input"
                  value={totalPrice}
                  disabled
                />
              </div>
              <button
                onClick={(e) => {
                  UseRewardPoints(e);
                }}
                disabled={
                  store.bookingRoom.Payment.payment?.diemSuDung >= 20 &&
                    RewardPoints === 0
                    ? false
                    : true
                }
                className="points-button"
              >
                {"SỬ DỤNG ĐIỂM THƯỞNG (ĐIỂM TÍCH LŨY > 20)"}
              </button>
              {/* <button
                onClick={(e) => {
                  PostPaymenInfo(e);
                }}
                className="payment-button"
              >
                XÁC NHẬN
              </button> */}
              {totalPrice === 0 ? (
                <button
                  onClick={(e) => {
                    PostPaymenInfo(e);
                    setIsSuccessPaypal(true);
                  }}
                  className="payment-button"
                >
                  XÁC NHẬN
                </button>
              ) : (
                <Paypal total={totalPrice} />
              )}
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="cancel-button"
              onClick={() => {
                setConfirm(false);
                setRewardPoints(0);
              }}
            >
              HỦY
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <>
      <div className="main-payment">
        <div className="payment-wrapper">
          <div style={{ padding: "56px", display: "flex" }}>
            <div className="payment-info">
              <p className="payment-info-title">COMBO HẤP DẪN</p>
              <div className="comboFD">
                {listCombo ? (
                  listCombo.map((n, i) => (
                    <div key={i} className="food-n-drink">
                      {/* <input
                        onClick={(event) => {
                          CheckCombo(
                            {
                              tenCombo: n.tenCombo,
                              gia: n.giaGoc,
                              checked: true,
                            },
                            event,
                            i
                          );
                        }}
                        className="combo-check"
                        type="checkbox"
                      /> */}
                      <div className="combo-info">
                        <img alt="" src={n.hinhAnh} width="200" />
                        <div className="combo-detail">
                          <p>{n.tenCombo}</p>
                          <p>{n.moTa}</p>
                          <p>
                            {n.giaGoc.toLocaleString({
                              style: "currency",
                              currency: "VND",
                            })}{" "}
                            VND
                          </p>
                          <div className="countFD">
                            <button className="count">-</button>
                            <input placeholder="0" type="number" />
                            <button className="count">+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Không có combo đồ ăn và thức uống!</p>
                )}
              </div>
            </div>
            <form className="payment-info">
              <p className="payment-info-title">CHI TIẾT VÉ XEM PHIM</p>
              <div className="payment-form">
                <div>
                  <label className="card-number-label">Tên khách hàng</label>
                  <br />
                  <input
                    className="card-number-input"
                    value={store.bookingRoom.Payment.payment.hoTen}
                    disabled
                  />
                </div>
                <div>
                  <label className="card-name-label">Phim</label>
                  <br />
                  <input
                    className="card-name-input"
                    value={store.bookingRoom.Payment.payment.tenPhim}
                    disabled
                  />
                </div>
                <div>
                  <label className="card-name-label">Ghế đã chọn</label>
                  <br />
                  <input
                    className="card-name-input"
                    value={store.bookingRoom.Payment.payment.danhSachGhe.join(
                      ", "
                    )}
                    disabled
                  />
                </div>
                <div>
                  <label className="card-name-label">Lịch chiếu</label>
                  <br />
                  <input
                    className="card-name-input"
                    value={
                      store.bookingRoom.Payment.payment.lichChieu.ngayChieu.slice(
                        11,
                        13
                      ) *
                      1 +
                      7 +
                      store.bookingRoom.Payment.payment.lichChieu.ngayChieu.slice(
                        13,
                        16
                      ) +
                      " - " +
                      store.bookingRoom.Payment.payment.lichChieu.ngayChieu.slice(
                        8,
                        10
                      ) +
                      "/" +
                      store.bookingRoom.Payment.payment.lichChieu.ngayChieu.slice(
                        5,
                        7
                      ) +
                      "/" +
                      store.bookingRoom.Payment.payment.lichChieu.ngayChieu.slice(
                        0,
                        4
                      )
                    }
                    disabled
                  />
                </div>
                <div>
                  <label className="card-name-label">Tổng tiền</label>
                  <br />
                  <input
                    className="card-name-input"
                    value={
                      store.bookingRoom.Payment.payment.tongTien.toLocaleString(
                        {
                          style: "currency",
                          currency: "VND",
                        }
                      ) + " VND"
                    }
                    disabled
                  />
                </div>
                <button
                  onClick={(e) => {
                    ConfirmTicket(e);
                  }}
                  className="payment-button"
                >
                  THANH TOÁN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <div>
        {store.bookingRoom.Payment.payment &&
        // console.log(store.bookingRoom.Payment.payment)}
      </div> */}
      <div>{isConfirm && modalConfirm()}</div>
      <div>{useRewardPoints && modalRewardPoints()}</div>
    </>
  );
}
