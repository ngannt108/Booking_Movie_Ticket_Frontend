import React from "react";
import { useEffect, useContext } from "react";
import { StoreContext } from "../../Redux/Store/Store";
import "./Profile.css";
import { useState } from "react";
import ModalChangeProfile from "../ModalChangeProfile/ModalChangeProfile";
import { API_USER } from "../../common/ApiController";
import ModalChangePassword from "../ModalChangePassword/ModalChangePassword";

export default function Profile() {
  const store = useContext(StoreContext);
  const [profile, setProfile] = useState(null);
  const [changeInfo, setChangeInfo] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [historyPayment, setHistoryPayment] = useState(null);
  useEffect(() => {
    if (store.account.userAccount.account) {
      let token = JSON.parse(sessionStorage.getItem("token"));
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
      console.log("profile******");
    }
  }, [store.account.userAccount.account]);
  useEffect(() => {
    if (store.account.Profile.profile) {
      setProfile(store.account.Profile.profile);
    }
  }, [store.account.Profile.profile]);

  useEffect(() => {
    if (store.account.userAccount.account) {
      let token = JSON.parse(sessionStorage.getItem("token"));
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
          setHistoryPayment(dt.data);
        });
    }
  }, [store.account.userAccount.account]);

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
              ) : historyPayment.length != 0 ? (
                <div className="history-field">
                  <div className="menu-field">
                    <div>
                      <h5>Lịch sử thanh toán</h5>
                    </div>
                    <div>
                      <h5>Chi tiết vé đã đặt</h5>
                    </div>
                  </div>
                  <div className="payment-ticket-detail">
                    <div className="payment-history">
                      {historyPayment.map((n, i) => (
                        <div key={i} className="history-ticket">
                          <p>Phim: {n.phim.tenPhim}</p>
                          <p>Thời lượng: {n.phim.thoiLuong}p</p>
                          {/* { <p>Combo đi kèm: {n.}</p>} */}
                          <p>Thanh toán: {n.tienThanhToan}</p>
                          {/* <p>Thời gian đặt: </p> */}
                          <button className="change-ticket">Đổi vé</button>
                        </div>
                      ))}
                    </div>
                    <div className="ticket-detail"></div>
                  </div>
                </div>
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
