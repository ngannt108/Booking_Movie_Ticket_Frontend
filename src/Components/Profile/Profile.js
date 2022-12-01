import React from "react";
import { useEffect, useContext } from "react";
import { StoreContext } from "../../Redux/Store/Store";
import "./Profile.css";
import { useState } from "react";
import ModalChangeProfile from "../ModalChangeProfile/ModalChangeProfile";
import { API_USER } from "../../common/ApiController";

export default function Profile() {
  const store = useContext(StoreContext);
  const [profile, setProfile] = useState(null);
  const [changeInfo, setChangeInfo] = useState(false);
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
  }, [store.account.userAccount.account]);
  useEffect(() => {
    if (store.account.Profile.profile) {
      setProfile(store.account.Profile.profile);
    }
  }, [store.account.Profile.profile]);

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
                  LỊCH SỬ ĐẶT VÉ
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
                        <button className="profile-button change-password">
                          THAY ĐỔI MẬT KHẨU
                        </button>
                      </div>
                    </div>
                  </div>
                  {changeInfo && (
                    <ModalChangeProfile
                      profile={profile}
                      show={changeInfo}
                      HandleClick={ClickModal}
                    />
                  )}
                </div>
              ) : (
                <div>LỊCH SỬ ĐẶT VÉ</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
