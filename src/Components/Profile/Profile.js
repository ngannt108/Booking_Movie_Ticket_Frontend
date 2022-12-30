import React from "react";
import { useEffect, useContext } from "react";
import { StoreContext } from "../../Redux/Store/Store";
import "./Profile.css";
import { useState } from "react";
import ModalChangeProfile from "../ModalChangeProfile/ModalChangeProfile";
import { API_USER, API_FOODDRINKS } from "../../Common/ApiController";
import ModalChangePassword from "../ModalChangePassword/ModalChangePassword";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const store = useContext(StoreContext);
  const [profile, setProfile] = useState(null);
  const [changeInfo, setChangeInfo] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [historyPayment, setHistoryPayment] = useState(null);
  const [paymentDetail, setPaymentDetail] = useState(null);
  const [listCombo, setCombo] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (store.account.userAccount.account) {
      let token = JSON.parse(localStorage.getItem("token"));
      fetch(API_USER.PROFILE, {
        headers: {
          //Nó sẽ nói cho sever biết, web này sẽ gởi giá trị đi là json
          "Content-Type": "application/json",
          Authorization: `Basic ${token}`,
        },
        method: "GET",
      })
        .then((res) => res.json())
        .then((dt) =>
          store.account.ProfileDispatch({
            type: "PROFILE",
            payload: dt.data[0],
          })
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.account.userAccount.account]);
  useEffect(() => {
    if (store.account.Profile.profile) {
      setProfile(store.account.Profile.profile);
    }
  }, [store.account.Profile.profile]);

  useEffect(() => {
    if (store.account.userAccount.account) {
      let token = JSON.parse(localStorage.getItem("token"));
      fetch(API_USER.HISTORY_TICKET, {
        headers: {
          //Nó sẽ nói cho sever biết, web này sẽ gởi giá trị đi là json
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      })
        .then((res) => res.json())
        .then((dt) => {
          console.log(dt.data);
          setHistoryPayment(dt.data);
        });
    }
  }, [store.account.userAccount.account]);

  useEffect(() => {
    fetch(API_FOODDRINKS.GETALL)
      .then((res) => res.json())
      .then((dt) => {
        setCombo(dt.data);
        // console.log(dt.data);
      });
  }, [historyPayment]);

  const checkOnClick = (e, className) => {
    [...document.getElementsByClassName(className)].forEach((element) => {
      if (element.classList.value.includes("active-profile")) {
        element.classList.remove("active-profile");
      }
    });
    if (e.target.classList.value.includes(className))
      e.target.classList.add("active-profile");
  };
  const [changeProfile, setChangeProfile] = useState(true);

  const ClickModal = (data) => {
    setChangeInfo(data);
  };
  const ClickModalChangePassword = (data) => {
    setChangePassword(data);
  };

  const checkOnClickPaymentDetail = (e, className) => {
    [...document.getElementsByClassName(className)].forEach((element) => {
      if (element.classList.value.includes("active-payment")) {
        element.classList.remove("active-payment");
      }
    });
    if (e.target.classList.value.includes(className))
      e.target.classList.add("active-payment");
  };

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

  const [detailHistory, setDetailHistory] = useState(null);
  const [isShowing, setIsShowing] = useState(true);
  const [isTimeExpired, setExpired] = useState(false);

  const TimeExpiredPayment = () => {
    let lsPayment = [];
    if (isTimeExpired) {
      historyPayment.map((n) => {
        if (new Date(n.maLichChieu.ngayChieu) < Date.now()) {
          lsPayment.push(n);
        }
      });
      setDetailHistory(lsPayment);
    }
  };

  const ShowingPayment = () => {
    let lsPayment = [];
    if (isShowing) {
      historyPayment.map((n) => {
        if (new Date(n.maLichChieu.ngayChieu) >= Date.now()) {
          lsPayment.push(n);
        }
      });
      setDetailHistory(lsPayment);
    }
    setExpired(false);
  };

  return (
    <>
      {profile && (
        <div>
          <div className="cinemas-wallpaper">
            <img
              width={"100%"}
              alt="cinemas wallpaper"
              src="https://www.ascottproductions.com/wp-content/uploads/2020/02/as_production_banner-1.png"
            />
          </div>
          <div className="profile">
            <div className="profile-item">
              <div className="profile-img">
                <img src={profile.anhDaiDien} height={200} width={200} alt="" />
              </div>
              <div className="profile-info">
                <p>{profile.hoTen}</p>
                <p>Điểm tích lũy: {profile.diemThuong}</p>
              </div>
            </div>
            <div className="ticket-history">
              <div className="profile-menu">
                <div
                  className="menu update-profile onClick-cinema active-profile"
                  onClick={(e) => {
                    checkOnClick(e, "onClick-cinema");
                    setChangeProfile(true);
                  }}
                >
                  THAY ĐỔI THÔNG TIN
                </div>
                <div
                  className="menu history onClick-cinema"
                  onClick={(e) => {
                    checkOnClick(e, "onClick-cinema");
                    setChangeProfile(false);
                  }}
                >
                  LỊCH SỬ GIAO DỊCH
                </div>
              </div>
              {changeProfile ? (
                <div className="change-profile">
                  <div>
                    <div className="profile-row">
                      <div className="payment-cluster">
                        <label className="card-number-label">
                          Tên tài khoản
                        </label>
                        <input
                          className="card-number-input"
                          value={profile.tentaiKhoan}
                          disabled
                        />
                      </div>
                      <div className="payment-cineplex">
                        <label className="card-name-label">Họ và tên</label>
                        <input
                          className="card-name-input"
                          value={profile.hoTen}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="profile-row">
                      <div className="payment-cluster">
                        <label className="card-number-label">Email</label>
                        <input
                          className="card-number-input"
                          value={profile.email}
                          disabled
                        />
                      </div>
                      <div className="payment-cineplex">
                        <label className="card-name-label">Số điện thoại</label>
                        <input
                          className="card-name-input"
                          value={profile.SDT}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="profile-row">
                      <div className="payment-cluster">
                        <button
                          className="profile-button change-info"
                          onClick={() => {
                            setChangeInfo(true);
                          }}
                        >
                          THAY ĐỔI THÔNG TIN CÁ NHÂN
                        </button>
                      </div>
                      <div className="payment-cineplex">
                        <button
                          className="profile-button change-password"
                          onClick={() => {
                            setChangePassword(true);
                          }}
                        >
                          THAY ĐỔI MẬT KHẨU
                        </button>
                      </div>
                    </div>
                  </div>
                  {changeInfo && (
                    <ModalChangeProfile
                      show={changeInfo}
                      HandleClick={ClickModal}
                    />
                  )}
                  {changePassword && (
                    <ModalChangePassword
                      show={changePassword}
                      HandleClick={ClickModalChangePassword}
                    />
                  )}
                </div>
              ) : historyPayment.length !== 0 ? (
                <>
                  <div style={{ padding: "30px" }}>
                    <button
                      className="btn btn-danger"
                      style={{ marginRight: "30px" }}
                      onClick={() => {
                        setIsShowing(false);
                        setExpired(true);
                        TimeExpiredPayment();
                      }}
                    >
                      Đã hết hạn
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setExpired(false);
                        setIsShowing(true);
                        ShowingPayment();
                      }}
                    >
                      Chưa xem
                    </button>
                  </div>
                  <div className="history-field">
                    <div className="menu-field">
                      <div className="field-type">
                        <h5>Lịch sử thanh toán</h5>
                      </div>
                      <div className="field-type">
                        <h5>Chi tiết vé đã đặt</h5>
                      </div>
                    </div>
                    <div className="payment-ticket-detail">
                      <div className="payment-history">
                        {detailHistory &&
                          detailHistory.map((n, i) => (
                            <div
                              key={i}
                              className="history-ticket onClick-payment"
                              onClick={(e) => {
                                checkOnClickPaymentDetail(e, "onClick-payment");
                                setPaymentDetail(n);
                              }}
                            >
                              <p>Phim: {n.phim?.tenPhim}</p>
                              <p>Thời lượng: {n.phim?.thoiLuong}p</p>
                              {n.danhSachAnUong.length > 0 && (
                                <p>
                                  Combo đi kèm:{" "}
                                  {listCombo.map((combo) =>
                                    n.danhSachAnUong.map((fD, i) => {
                                      if (fD.maAnUong === combo._id) {
                                        return (
                                          <span key={i}>{combo.tenCombo} </span>
                                        );
                                      }
                                    })
                                  )}
                                </p>
                              )}
                              <p>Thanh toán: {n.tienThanhToan}</p>
                              <p>
                                Thời gian đặt: {formatDate(n.thoiGianDat)} -{" "}
                                {formatTime(n.thoiGianDat)}
                              </p>
                              {new Date(n.maLichChieu.ngayChieu) > Date.now() &&
                                n.daDoi === false && (
                                  <button
                                    className="change-ticket"
                                    onClick={() => {
                                      store.bookingRoom.ChangeTicketDispatch({
                                        type: "CHANGE_TICKET",
                                        payload: n,
                                      });
                                      navigate("/ChangeTicket");
                                    }}
                                  >
                                    Đổi vé
                                  </button>
                                )}
                              {n.daDoi === true && (
                                <p
                                  style={{ color: "red", fontStyle: "italic" }}
                                >
                                  ĐÃ ĐỔI VÉ
                                </p>
                              )}
                            </div>
                          ))}
                      </div>
                      <div className="ticket-detail">
                        {paymentDetail ? (
                          <div>
                            <p>
                              Tên cụm rạp:{" "}
                              {paymentDetail.maLichChieu.tenCumRap.tenCumRap}
                            </p>
                            <p>
                              Phòng chiếu:{" "}
                              {paymentDetail.maLichChieu.tenRap.tenRap}
                            </p>
                            <p>
                              Ngày chiếu:{" "}
                              {formatDate(paymentDetail?.maLichChieu.ngayChieu)}{" "}
                              -{" "}
                              {formatTime(paymentDetail?.maLichChieu.ngayChieu)}
                            </p>
                            {paymentDetail.daDoi ? (
                              <>
                                <p>
                                  Ghế cũ:{" "}
                                  {paymentDetail.danhSachVe
                                    .map((n) => n.maGhe)
                                    .join(", ")}
                                </p>
                                <p>
                                  Ghế mới:{" "}
                                  {paymentDetail.danhSachGheDoi
                                    .map((ghe) => ghe)
                                    .join(", ")}
                                </p>
                              </>
                            ) : (
                              <p>
                                Ghế đã đặt:{" "}
                                {paymentDetail.danhSachVe
                                  .map((ghe) => ghe.maGhe)
                                  .join(", ")}
                              </p>
                            )}
                          </div>
                        ) : (
                          <p>Hãy nhấp chọn vào 1 vé bất kỳ để xem chi tiết</p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="noPaymentHistory">
                  Không có thông tin giao dịch gần nhất!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
