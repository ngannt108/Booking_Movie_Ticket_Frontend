import React, { useState } from "react";
import { API_USER } from "../../common/ApiController";
import { Modal } from "react-bootstrap";
import swal from "sweetalert";

export default function ModalChangePassword(props) {
  const [isConfirm, setConfirm] = useState(props.show);
  const [userPassword, setUserPassword] = useState({
    matKhau: "",
    matKhauMoi: "",
    nhapLaiMatKhau: "",
  });
  const UpdatePassword = async (event, info) => {
    event.preventDefault();
    if (Validation(info)) {
      let token = JSON.parse(sessionStorage.getItem("token"));
      let res = await fetch(API_USER.CHANGE_PASSWORD, {
        headers: {
          //Nó sẽ nói cho sever biết, web này sẽ gởi giá trị đi là json
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
        body: JSON.stringify(info),
      });
      console.log(res.status);
      let message = await res.json();
      if (res.status === 200) {
        await swal({
          title: "Thành công",
          text: message.message,
          icon: "success",
          button: "Ok",
        });
        setConfirm(false);
      } else {
        swal("Thất bại", `${message.error}! Vui lòng thử lại!`, "error");
      }
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
          <Modal.Title>Đổi Mật Khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="payment-form">
            <div>
              <label className="card-number-label">Mật khẩu hiện tại</label>
              <input
                className="card-number-input"
                type="password"
                onChange={(event) =>
                  setUserPassword((pre) => ({
                    ...pre,
                    matKhau: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="card-name-label">Mật khẩu mới</label>
              <input
                className="card-name-input"
                type="password"
                onChange={(event) =>
                  setUserPassword((pre) => ({
                    ...pre,
                    matKhauMoi: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="card-number-label">Nhập lại mật khẩu mới</label>
              <input
                className="card-number-input"
                type="password"
                onChange={(event) =>
                  setUserPassword((pre) => ({
                    ...pre,
                    nhapLaiMatKhau: event.target.value,
                  }))
                }
              />
            </div>

            <button
              onClick={(e) => {
                UpdatePassword(e, userPassword);
              }}
              className="payment-button"
            >
              CẬP NHẬT MẬT KHẨU
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
