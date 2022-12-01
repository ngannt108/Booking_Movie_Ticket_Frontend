import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_USER } from "../../common/ApiController";
import swal from "sweetalert";

export default function ModalChangeProfile(props) {
  const [isConfirm, setConfirm] = useState(props.show);
  const [fileImage, setFileImage] = useState();
  const [info, setInfo] = useState({
    tentaiKhoan: props.profile.tentaiKhoan,
    email: props.profile.email,
    hoTen: props.profile.hoTen,
    SDT: props.profile.SDT,
    anhDaiDien: props.profile.anhDaiDien,
  });
  const inputInfo = {
    email: info.email,
    hoTen: info.hoTen,
    SDT: info.SDT,
    // anhDaiDien: info.anhDaiDien,
  };

  const navigate = useNavigate();
  const UpdateProfile = async (event, inputInfo) => {
    event.preventDefault();
    if (Validation(inputInfo)) {
      const fd = new FormData();
      if (fileImage != null) {
        fd.append("anhDaiDien", fileImage, fileImage.name);
        // console.log(fd);
      }
      console.log(">> fd", fd);
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
      // console.log(res.status);
      if (res.status === 200) {
        await swal({
          title: "Successfully",
          text: "Update Profile Successfully",
          icon: "success",
          button: "Ok",
        });
        navigate("/Profile");
      } else {
        swal(
          "Update Profile Unsuccessfully",
          "There is something wrong! Please try again later!",
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
              inputInfo = info;
            }}
          >
            HỦY
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
