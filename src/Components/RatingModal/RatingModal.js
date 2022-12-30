import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "../Button/Button";
import swal from "sweetalert";
import { Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { StarRating } from "../Rating/Rating";
import { StoreContext } from "../../Redux/Store/Store";
import { API_USER } from "../../Common/ApiController";

function RatingModal({ slug }) {
  const [isShow, setShow] = useState(false);
  const [star, setStar] = useState(0);
  const store = useContext(StoreContext);
  const navigate = useNavigate();
  const handleClick = () => {
    if (store.account.userAccount.account) setShow(true);
    else
      swal("Đăng nhập trước khi thực hiện đánh giá", {
        buttons: ["Hủy", "Đồng ý"],
      }).then((value) => {
        switch (value) {
          case true:
            navigate("/signIn");
            break;
          default:
            return;
        }
      });
  };
  const initModal = () => {
    setShow(!isShow);
  };

  const RatingAction = async (e) => {
    e.preventDefault();
    swal({
      icon: "info",
      title: "Xin chờ giây lát",
      buttons: false,
      closeOnClickOutside: false,
    });
    const token = JSON.parse(localStorage.getItem("token"));
    let res = await fetch(API_USER.POSTCOMMENT + `${slug}/rating`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        danhGia: star,
      }),
    });
    if (res.status === 401) {
      swal({
        title: "Vui lòng đăng nhập lại",
        text: "Phiên đăng nhập đã hết hạn",
        icon: "warning",
        buttons: true,
      });
      setTimeout(function () {
        localStorage.clear();
        navigate("/signIn");
      }, 1000);
    }
    if (res.status === 200) {
      swal({
        title: "Cám ơn bạn vì đã đánh giá!",
        text: "",
        icon: "success",
        buttons: false,
      });
      setTimeout(() => {
        navigate(0);
      }, 1000);
    } else
      swal({
        title: "Đánh giá thất bại",
        text: "Hãy thử lại",
        icon: "warning",
        dangerMode: true,
      });
  };
  const handleRating = async (e) => {
    RatingAction(e);
  };

  return (
    <div style={{ display: "flex" }}>
      <Button
        color="black"
        name="Đánh giá"
        background="pink"
        width="fit-content"
        borderRadius="10.2em"
        fontWeight="bold"
        onClick={() => handleClick()}
      />
      <Form
        id="rating-form"
        style={{ maxWidth: "800px" }}
        noValidate
        onSubmit={handleRating}
      >
        <Modal size="sm" show={isShow}>
          <Modal.Header closeButton onClick={initModal}>
            <Modal.Title style={{ fontWeight: "bold" }}>
              Đánh giá cho phim
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div style={{ background: "white" }}>
              <Form
                style={{ maxWidth: "800px" }}
                noValidate
                onSubmit={handleRating}
              >
                <Row className="mb-3">
                  <Form.Group>
                    <StarRating
                      edit={true}
                      a11y={true}
                      size={20}
                      rating={0}
                      onChange={(newValue) => {
                        setStar(newValue);
                        console.log(`>> New value is ${newValue}`);
                      }}
                    />
                  </Form.Group>
                </Row>
              </Form>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <div style={{ display: "flex" }}>
              <button
                className="button-custom yes"
                name="Đồng ý"
                borderRadius="0.4em"
                style={{ width: "fit-content" }}
                onClick={handleRating}
              >
                Gửi đánh giá
              </button>
              <button
                className="button-custom no"
                name="Hủy"
                borderRadius="0.4em"
                onClick={initModal}
              >
                Hủy
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      </Form>
    </div>
  );
}
/*className="container mt-3"*/
export default RatingModal;
