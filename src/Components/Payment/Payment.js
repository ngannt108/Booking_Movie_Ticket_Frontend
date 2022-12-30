import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Redux/Store/Store";
import { API_BOOKING, API_FOODDRINKS } from "../../Common/ApiController";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";
import "./Payment.css";
import QRCode from "qrcode";
import { FormatDate, FormatTime } from "../../Common/Format";
// import { queryAllByText } from "@testing-library/react";

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
    let message = await res.json();
    if (res.status === 200) {
      await swal({
        title: "Thành công",
        text: message.message,
        icon: "success",
        button: "Ok",
      });
      navigate("/Profile");
    } else {
      swal("Thất bại", message.error, "error");
    }
  };

  const ConfirmTicket = (event) => {
    event.preventDefault();
    setConfirm(true);
    if (listFD === []) {
      setTotalPrice(store.bookingRoom.Payment.payment.tongTien);
      setTotalPriceBefore(store.bookingRoom.Payment.payment.tongTien);
    } else {
      let tienCombo = 0;
      listFD.map((n) => (tienCombo += n.giaTien));
      console.log(tienCombo);
      setTotalPrice(store.bookingRoom.Payment.payment.tongTien + tienCombo);
      setTotalPriceBefore(
        store.bookingRoom.Payment.payment.tongTien + tienCombo
      );
    }
  };

  useEffect(() => {
    fetch(API_FOODDRINKS.GETALL)
      .then((res) => res.json())
      .then((dt) => {
        setCombo(dt.data);
        console.log(dt.data);
      });
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
      let Combo = [];
      let tongTienCb = 0;
      listCombo.map((n) =>
        listFD.map((cb) => {
          if (n._id === cb.maAnUong) {
            Combo.push({
              tenCombo: n.tenCombo,
              soLuongCombo: cb.soLuong,
              donGiaCombo: cb.giaTien,
            });
            tongTienCb += cb.giaTien;
          }
        })
      );

      const dataSendEmail = {
        taiKhoan: store.bookingRoom.Payment.payment?.hoTen,
        tenCumRap: store.bookingRoom.Payment.payment?.tenRap,
        tenPhim: store.bookingRoom.Payment.payment?.tenPhim,
        ngayChieu: FormatDate(
          store.bookingRoom.Payment.payment?.lichChieu.ngayChieu
        ).toString(),
        gioChieu: FormatTime(
          store.bookingRoom.Payment.payment?.lichChieu.ngayChieu
        ).toString(),
        QRCode: qr,
        soLuongVe: store.bookingRoom.Payment.payment.danhSachGhe.length,
        donGiaVe:
          store.bookingRoom.Payment.payment.tongTien /
          store.bookingRoom.Payment.payment.danhSachGhe.length,
        tongTienVe: store.bookingRoom.Payment.payment.tongTien,
        Combo: Combo,
        tongTienCombo: tongTienCb,
        tongTienBanDau: totalPriceBefore,
        diemDaSuDung: RewardPoints,
        tongTienThanhToan: totalPrice,
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
        ngayChieu: FormatDate(
          store.bookingRoom.Payment.payment?.lichChieu.ngayChieu
        ).toString(),
        gioChieu: FormatTime(
          store.bookingRoom.Payment.payment?.lichChieu.ngayChieu
        ).toString(),
        QRCode: CreateQR(),
      };
      // console.log(dataSendEmail);
      const DATA_BOOKING = {
        danhSachGhe: store.bookingRoom.Payment.payment.danhSachGhe,
        danhSachAnUong: listFD,
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
      if (listFD === []) {
        setTotalPrice(store.bookingRoom.Payment.payment.tongTien);
        setTotalPriceBefore(store.bookingRoom.Payment.payment.tongTien);
      } else {
        let tienCombo = 0;
        listFD.map((n) => (tienCombo += n.giaTien));
        setTotalPrice(store.bookingRoom.Payment.payment.tongTien + tienCombo);
        setTotalPriceBefore(
          store.bookingRoom.Payment.payment.tongTien + tienCombo
        );
      }
    }
  }, [store.bookingRoom.Payment.payment.tongTien, listFD]);

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
                <h6 style={{ color: "red", fontStyle: "italic" }}>
                  Mỗi điểm tích lũy sử dụng sẽ tương ứng với giảm 1.000 VND.
                </h6>
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
              <div>
                <h6 style={{ color: "black", fontStyle: "italic" }}>
                  Số điểm sử dụng tối thiểu là 20 điểm
                </h6>
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
              <div className="payment-cinema">
                <div className="payment-cluster">
                  <label className="card-name-label">Lịch chiếu</label>
                  <br />
                  <input
                    className="card-name-input"
                    value={
                      FormatTime(
                        store.bookingRoom.Payment.payment.lichChieu.ngayChieu
                      ) +
                      " - " +
                      FormatDate(
                        store.bookingRoom.Payment.payment.lichChieu.ngayChieu
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
                  <label className="card-name-label">Số lượng ghế</label>
                  <br />
                  <input
                    className="card-name-input"
                    value={store.bookingRoom.Payment.payment.danhSachGhe.length}
                    disabled
                  />
                </div>
                <div className="payment-cineplex">
                  <label className="card-name-label">Tổng tiền ghế</label>
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
              </div>

              <div>
                <label className="card-name-label">Combo đã chọn</label>
                <br />
                {listFD.length > 0 ? (
                  <>
                    {listCombo.map((combo) =>
                      listFD.map((n, i) => {
                        if (combo._id === n.maAnUong) {
                          return (
                            <div key={i}>
                              <input
                                className="card-name-input"
                                value={
                                  combo.tenCombo +
                                  ": số lượng " +
                                  n.soLuong +
                                  ", giá tiền: " +
                                  n.giaTien.toLocaleString({
                                    style: "currency",
                                    currency: "VND",
                                  }) +
                                  " VND"
                                }
                                disabled
                              />
                            </div>
                          );
                        }
                      })
                    )}
                  </>
                ) : (
                  <div>
                    <input
                      className="card-name-input"
                      value={"Không có combo được chọn"}
                      disabled
                    />
                  </div>
                )}
              </div>

              {RewardPoints >= 20 ? (
                <div>
                  <label className="card-name-label">
                    Số điểm tích lũy sử dụng để thanh toán
                  </label>
                  <br />
                  <input
                    className="card-name-input"
                    value={
                      RewardPoints +
                      " điểm => Số tiền được khấu trừ là: " +
                      (RewardPoints * 1000).toLocaleString({
                        style: "currency",
                        currency: "VND",
                      }) +
                      " VND"
                    }
                    disabled
                  />
                </div>
              ) : (
                // <h6 style={{ color: "red", fontStyle: "italic" }}>
                //   Bạn đã sử dụng {RewardPoints} điểm để thanh toán
                // </h6>
                ""
              )}
              <div>
                <label className="card-name-label">
                  Tổng tiền cần thanh toán
                </label>
                <br />
                <input
                  className="card-name-input"
                  value={
                    totalPrice.toLocaleString({
                      style: "currency",
                      currency: "VND",
                    }) + " VND"
                  }
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

  const CheckCombo = (combo, event) => {
    if (event.target.checked === true) {
      setFD([
        ...listFD,
        {
          maAnUong: combo.maAnUong,
          soLuong: combo.soLuong,
          giaTien: combo.giaTien,
        },
      ]);
    } else if (event.target.checked === false) {
      listFD.splice(listFD.indexOf(combo.maAnUong), 1);
    }
  };

  // const [minutes, setMinutes] = useState(2);
  // const [seconds, setSeconds] = useState(0);

  const addZeroToPrefix = (mNumber) => {
    if (mNumber < 10) {
      return `0${mNumber}`;
    }

    return `${mNumber}`
  }

  const startCountDown = () => {
    let m = Number(document.getElementById("minute").firstChild.nodeValue);
    let s = Number(document.getElementById("second").firstChild.nodeValue);
    // console.log(`${m}:${s}`)
    if (m <= 0 && s <= 0) return false;
    let timeout = setInterval(function () {
      s--;

      if (s <= 0) {

        if (m <= 0) {
          clearInterval(timeout);
          navigate(-1)
          alert("Phiên giao dịch đã hết hạn");
          return false;
        }

        m -= 1;
        s = 59;
      }

      console.log("H6")
      document.getElementById("minute").innerText = addZeroToPrefix(m);
      document.getElementById("second").innerText = addZeroToPrefix(s);
    }, 1000);


  };

  useEffect(() => {
    startCountDown();
  }, []);

  const cancelRemovePreorder = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await fetch(
      `${API_BOOKING.CANCEL}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Basic ${token}`,
        },
        body: JSON.stringify({ maLichChieu: showtimeID }),
      }
    );
  }
  // const preorder = async()=>{
  //   const token = JSON.parse(localStorage.getItem("token"));
  //   const res = await fetch(
  //     `${API_BOOKING.IS_CHOOSING_CHAIRS}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: `Basic ${token}`,
  //       },
  //       body: JSON.stringify({maLichChieu: showtimeID}),
  //     }
  //   );
  // }
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
                      <input
                        onClick={(event) => {
                          CheckCombo(
                            {
                              maAnUong: n._id,
                              giaTien: n.giaGoc,
                              checked: true,
                              soLuong: 1,
                              tenCombo: n.tenCombo,
                            },
                            event,
                            i
                          );
                        }}
                        className="combo-check"
                        type="checkbox"
                      />
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
                          {/* <div className="countFD">
                            <button className="count">-</button>
                            <input placeholder="0" type="number" />
                            <button
                              className="count"
                              // onClick={(e) =>
                              //   CheckCombo({
                              //     maAnUong,
                              //   })
                              // }
                            >
                              +
                            </button>
                          </div> */}
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
                  <label className="card-number-label">
                    Thời gian còn lại để thực hiện giao dịch
                  </label>
                  <br />
                  <div>
                    <span id="minute">02</span> : <span id="second">00</span>
                  </div>
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
                  <label className="card-name-label">Lịch chiếu</label>
                  <br />
                  <input
                    className="card-name-input"
                    value={
                      FormatTime(
                        store.bookingRoom.Payment.payment.lichChieu.ngayChieu
                      ) +
                      " - " +
                      FormatDate(
                        store.bookingRoom.Payment.payment.lichChieu.ngayChieu
                      )
                    }
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
                  <label className="card-name-label">Số lượng ghế</label>
                  <br />
                  <input
                    className="card-name-input"
                    value={store.bookingRoom.Payment.payment.danhSachGhe.length}
                    disabled
                  />
                </div>
                <div>
                  <label className="card-name-label">Tổng tiền vé</label>
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
                    console.log(listFD);
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
