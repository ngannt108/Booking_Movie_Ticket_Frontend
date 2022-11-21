import React from "react";
import { useEffect, useContext } from "react";
import { StoreContext } from "../../Redux/Store/Store";
import "./Profile.css";
import { useState } from "react";

export default function Profile() {
  const store = useContext(StoreContext);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    if (store.account.Profile.profile) {
      setProfile(store.account.Profile.profile);
    }
  }, [store.account.Profile.profile]);
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
                <img src={profile.anhDaiDien} height={200} width={200} />
              </div>
              <div className="profile-info">
                <p>Họ tên: {profile.hoTen}</p>
                <p>Email: {profile.email}</p>
                <p>Số điện thoại: {profile.SDT}</p>
                <p>Điểm thưởng: {profile.diemThuong}</p>
              </div>
            </div>
            <div className="ticket-history">
              <div className="profile-menu">
                <div className="menu update-profile">THAY ĐỔI THÔNG TIN</div>
                <div className="menu history">LỊCH SỬ ĐẶT VÉ</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
