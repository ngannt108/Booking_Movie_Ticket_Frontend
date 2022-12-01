import React, { useEffect, useContext, useState, useRef } from "react";
import { StoreContext } from "../../../Redux/Store/Store";
import { Card, Modal, Spinner } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import { Button } from "../../Button/Button";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { List } from "react-content-loader";
import isEmpty from "validator/lib/isEmpty";

function InfoUserModal(props) {
  const [isShow, setInvokeModal] = useState(false);
  const store = useContext(StoreContext);
  const [image, setDisplayImage] = useState();
  const [fileImage, setFileImage] = useState("");
  const [tenTaiKhoan, setTenTaiKhoan] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  let emptyUser = {
    tenTaiKhoan: "",
    diemThuong: "",
    anhDaiDien: "",
    email: "",
    hoTen: "",
  };
  const [detailUser, setDetailUser] = useState(emptyUser);
  const handleClick = (tenTaiKhoan) => {
    setTenTaiKhoan(tenTaiKhoan);
    setInvokeModal(true);
  };
  var data;
  useEffect(() => {
    setLoading(true);
    if (!tenTaiKhoan) return;
    // fetch(API_FOODDRINKS.DETAIL + tenTaiKhoan)
    //   .then((res) => res.json())
    //   .then((dt) => {
    store.users.UsersDispatch({
      type: "GETDETAIL",
      payload: tenTaiKhoan,
    });
    let user = store.users?.listUsers?.detail;
    // console.log(">> detail user:", store.users?.listUsers);
    setDetailUser({
      tenTaiKhoan: user?.tentaiKhoan,
      diemThuong: user?.diemThuong,
      anhDaiDien: user?.anhDaiDien,
      email: user?.email,
      hoTen: user?.hoTen,
    });
    setLoading(false);
    //  });
  }, [tenTaiKhoan, store.users?.listUsers?.detail]);
  // console.log(">> detail user:", detailUser);
  const initModal = () => {
    setInvokeModal(!isShow);
    setTenTaiKhoan();
    setDetailUser(emptyUser);
    setDisplayImage();
  };

  const formattedDate = (dateInput) => {
    let today = new Date(dateInput);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return yyyy + "-" + mm + "-" + dd;
  };
  return (
    <div style={{ display: "flex" }}>
      <Button
        color="black"
        name="Chi tiết"
        background="pink"
        width="fit-content"
        borderRadius="10.2em"
        fontWeight="bold"
        onClick={() => handleClick(props.tenTaiKhoan)}
      />
      <Form id="edit-form" style={{ maxWidth: "800px" }} noValidate>
        <Modal size="lg" show={isShow}>
          <Modal.Header closeButton onClick={initModal}>
            <Modal.Title style={{ fontWeight: "bold" }}>
              CHI TIẾT KHÁCH HÀNG
            </Modal.Title>
          </Modal.Header>
          {!loading ? (
            <Modal.Body>
              <div style={{ background: "white", maxWidth: "800px" }}>
                <Form style={{ maxWidth: "800px" }} noValidate>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Tên tài khoản"
                        className="mb-3"
                      >
                        <Form.Control
                          required
                          type="text"
                          name="tenTaiKhoan"
                          value={detailUser?.tenTaiKhoan}
                          plaintext
                          readOnly
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Họ tên"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          name="hoTen"
                          min={0}
                          value={detailUser?.hoTen}
                          plaintext
                          readOnly
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom04">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Điểm thưởng"
                        className="mb-3"
                      >
                        <Form.Control
                          type={"text"}
                          name="diemThuong"
                          value={detailUser.diemThuong}
                          plaintext
                        />
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Email"
                        className="mb-3"
                      >
                        <Form.Control
                          type={"text"}
                          name="email"
                          value={detailUser.email}
                          plaintext
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group
                      style={{ width: "18rem" }}
                      controlId="validationCustom05"
                    >
                      <Card style={{ alignItems: "center" }}>
                        <Card.Img
                          style={{
                            maxHeight: "8rem",
                            maxWidth: "fit-content",
                          }}
                          variant="top"
                          src={detailUser?.anhDaiDien}
                        />
                      </Card>
                    </Form.Group>
                  </Row>
                </Form>
              </div>

              {/* <EditForm /> */}
            </Modal.Body>
          ) : (
            <List style={{ padding: "16px" }} />
          )}

          <Modal.Footer>
            <div class="d-grid gap-2 col-6 mx-auto">
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
export default InfoUserModal;
