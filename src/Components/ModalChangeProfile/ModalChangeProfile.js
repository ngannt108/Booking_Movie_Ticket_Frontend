import React, { useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../../Redux/Store/Store";
import { Modal } from "react-bootstrap";
import { API_USER } from "../../common/ApiController";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export default function ModalChangeProfile(props) {
  const store = useContext(StoreContext);
  const [isConfirm, setConfirm] = useState(props.show);
  const [fileImage, setFileImage] = useState(null);
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    tentaiKhoan: store.account.Profile.profile.tentaiKhoan,
    email: store.account.Profile.profile.email,
    hoTen: store.account.Profile.profile.hoTen,
    SDT: store.account.Profile.profile.SDT,
    anhDaiDien: store.account.Profile.profile.anhDaiDien,
  });
  const inputInfo = {
    email: info.email,
    hoTen: info.hoTen,
    SDT: info.SDT,
    anhDaiDien: info.anhDaiDien,
  };

  const UpdateProfile = async (event, inputInfo) => {
    event.preventDefault();
    if (Validation(inputInfo)) {
      const fd = new FormData();
      if (fileImage != null) {
        fd.append("anhDaiDien", fileImage, fileImage.name);
      }
      for (let keyOfObj in inputInfo) {
        fd.append(keyOfObj, inputInfo[keyOfObj]);
      }

      let token = JSON.parse(localStorage.getItem("token"));
      let res = await fetch(API_USER.PROFILE, {
        headers: {
          //Nó sẽ nói cho sever biết, web này sẽ gởi giá trị đi là json
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body: fd,
      });
      if (res.status === 200) {
        await swal({
          title: "Thành công",
          text: "Cập nhật thông tin thành công!",
          icon: "success",
          button: "Ok",
        });
        setConfirm(false);
      } else {
        swal(
          "Cập nhật thất bại",
          "Có lỗi ở đây! Vui lòng kiểm tra và thử lại!",
          "error"
        );
      }
    }
  };

  const uploadImage = async (event) => {
    if (event.target.files[0] != null) {
      setFileImage(event.target.files[0]);
      // console.log(event.target.files[0]);
    }
  };

  const Validation = (account) => {
    Object.values(account).forEach((info) => {
      if (info.trim() === "") {
        alert("Vui lòng nhập đầy đủ");
        return false;
      }
    });
    return true;
  };
  return (
    <>
      <Modal
        onClick={props.HandleClick(isConfirm)}
        show={isConfirm}
        onHide={() => setConfirm(false)}
      >
        <Modal.Header>
          <Modal.Title>Thay Đổi Thông Tin Cá Nhân</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="payment-form">
            <div>
              <label className="card-number-label">Tên tài khoản</label>
              <input
                className="card-number-input"
                value={info.tentaiKhoan}
                disabled
              />
            </div>
            <div>
              <label className="card-name-label">Họ và tên</label>
              <input
                className="card-name-input"
                value={info.hoTen}
                onChange={(event) =>
                  setInfo((previousInfo) => ({
                    ...previousInfo,
                    hoTen: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="card-number-label">Email</label>
              <input
                className="card-number-input"
                value={info.email}
                onChange={(event) =>
                  setInfo((previousInfo) => ({
                    ...previousInfo,
                    email: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="card-name-label">Số điện thoại</label>
              <input
                className="card-name-input"
                value={info.SDT}
                onChange={(event) =>
                  setInfo((previousInfo) => ({
                    ...previousInfo,
                    SDT: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="card-number-label">Ảnh đại diện</label>
              <input
                onChange={(event) => {
                  // setFileImage(event.target.files[0]);
                  uploadImage(event);
                }}
                className="card-name-input"
                type="file"
              // src={info.anhDaiDien}
              />
            </div>
            <button
              onClick={(e) => {
                UpdateProfile(e, inputInfo);
              }}
              className="payment-button"
            >
              CẬP NHẬT THÔNG TIN
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="cancel-button"
            onClick={() => {
              setConfirm(false);
            }}
          >
            HỦY
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
