import React, { useEffect, useContext, useState, useRef } from "react";
import { StoreContext } from "../../../Redux/Store/Store";
import { API_FOODDRINKS } from "../../../common/ApiController";
import { Card, Modal, Spinner } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import { Button } from "../../Button/Button";
import swal from "sweetalert";
import { NavLink } from "react-router-dom";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { List } from "react-content-loader";
import isEmpty from "validator/lib/isEmpty";

function EditFDModal(props) {
  const [isShow, setInvokeModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const store = useContext(StoreContext);
  const [image, setDisplayImage] = useState();
  const [fileImage, setFileImage] = useState("");
  const [biDanh, setBiDanh] = useState();
  const [loading, setLoading] = useState(true);
  const [isInvalid, setInvalid] = useState();
  const navigate = useNavigate();
  let emptyFD = {
    tenCombo: "",
    moTa: "",
    ghiChu: "",
    giaGoc: "",
    hinhAnh: "",
    giamGia: "",
    soLuongBan: "",
  };
  const [detailFD, setDetailFD] = useState(emptyFD);
  const handleClick = (biDanh) => {
    setBiDanh(biDanh);
    setInvokeModal(true);
  };
  var data;
  useEffect(() => {
    setLoading(true);
    if (!biDanh) return;
    fetch(API_FOODDRINKS.DETAIL + biDanh)
      .then((res) => res.json())
      .then((dt) => {
        store.fooddrinks.GetDetailFDDispatch({
          type: "GETDETAILFOODDRINK",
          payload: dt.data[0],
        });
        setDetailFD({
          tenCombo: dt.data?.tenCombo,
          moTa: dt.data?.moTa,
          ghiChu: dt.data?.ghiChu,
          giaGoc: dt.data?.giaGoc,
          hinhAnh: dt.data?.hinhAnh,
          giamGia: dt.data?.giamGia,
          soLuongBan: dt.data?.soLuongBan.toString(),
        });

        setLoading(false);
      });
  }, [biDanh, isEdit]);
  data = store.fooddrinks?.DetailFD;
  const [validated, setValidated] = useState(false);
  const initModal = () => {
    setInvokeModal(!isShow);
    setBiDanh();
    setIsEdit(false);
    setDetailFD(emptyFD);
    setDisplayImage();
  };
  const checkValid = (event) => {
    let temp = document.getElementsByName(event.target.name).item(0);
    if (
      temp.name === "banner" ||
      (temp.name === "image" && detailFD[temp.name])
    ) {
      return temp.classList.remove("is-invalid");
    }
    if (
      (isEmpty(temp.value) ||
        temp.checkValidity() == false ||
        temp.value.trim() == 0) &&
      temp.required
    ) {
      event.preventDefault();
      temp.classList.add("is-invalid");
    } else temp.classList.remove("is-invalid");
    checkInvalidAndRerender();
  };

  const checkInvalidAndRerender = () => {
    //console.log(isInvalid === undefined)
    if (document.getElementsByClassName("is-invalid").length > 0) {
      // If needed
      if (isInvalid || isInvalid === undefined) {
        setInvalid(true);
      }
    } else {
      // Should be rerender
      if (isInvalid || isInvalid === undefined) {
        setInvalid(false);
      }
    }
  };

  const UpdateFDAction = async (e) => {
    setValidated(true);
    e.preventDefault();
    const fd = new FormData();
    if (fileImage != null && fileImage != "")
      fd.append("hinhAnh", fileImage, fileImage.name);
    for (let keyOfObj in detailFD) {
      fd.append(keyOfObj, detailFD[keyOfObj]);
    }
    swal({
      icon: "info",
      title: "Xin chờ giây lát",
      buttons: false,
      closeOnClickOutside: false,
    });
    // console.log(">> fd", fd);
    const token = JSON.parse(sessionStorage.getItem("token"));
    let res = await fetch(API_FOODDRINKS.UPDATE + biDanh, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: fd,
    });
    if (res.status === 401) {
      swal({
        title: "Vui lòng đăng nhập lại",
        text: "Phiên đăng nhập đã hết hạn",
        icon: "warning",
        buttons: true,
      });
      setTimeout(function () {
        sessionStorage.clear();
        navigate("/signIn");
      }, 1000);
    }
    if (res.status === 200) {
      swal({
        title: "Cập nhật thành công!",
        text: "",
        icon: "success",
        buttons: false,
      });
      setTimeout(function () {
        setInvokeModal(false);
      }, 1000);
    } else
      swal({
        title: "Cập nhật thất bại",
        text: "Hãy thử lại",
        icon: "warning",
        dangerMode: true,
      });
  };
  const handleEdit = async (e, movie) => {
    UpdateFDAction(e);
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

  const uploadImage = async (event) => {
    if (event.target.files[0] != null) {
      setFileImage(event.target.files[0]);
      // console.log('>> uploadImage', event.target.files[0])
      let url = URL.createObjectURL(event.target.files[0]);
      setDisplayImage(url);
    }
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
        onClick={() => handleClick(props.biDanh)}
      />
      <NavLink end to={""}>
        <Button
          margin="0px 4px"
          color="red"
          name="Xóa"
          background="pink"
          width="fit-content"
          borderRadius="10.2em"
          fontWeight="bold"
        />
      </NavLink>
      <Form
        id="edit-form"
        style={{ maxWidth: "800px" }}
        noValidate
        validated={validated}
        onSubmit={handleEdit}
      >
        <Modal size="lg" show={isShow}>
          <Modal.Header closeButton onClick={initModal}>
            {isEdit ? (
              <Modal.Title style={{ fontWeight: "bold" }}>
                CHỈNH SỬA COMBO
              </Modal.Title>
            ) : (
              <Modal.Title style={{ fontWeight: "bold" }}>
                CHI TIẾT COMBO
              </Modal.Title>
            )}
          </Modal.Header>
          {!loading ? (
            <Modal.Body>
              <div style={{ background: "white", maxWidth: "800px" }}>
                <Form
                  style={{ maxWidth: "800px" }}
                  noValidate
                  validated={validated}
                  onSubmit={handleEdit}
                >
                  <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Tên combo"
                        className="mb-3"
                      >
                        <Form.Control
                          required
                          type="text"
                          name="tenCombo"
                          value={detailFD?.tenCombo}
                          readOnly={!isEdit}
                          disabled={isEdit}
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Đã bán"
                        className="mb-3"
                      >
                        <Form.Control
                          type="number"
                          name="soLuongBan"
                          min={0}
                          value={detailFD?.soLuongBan}
                          required
                          readOnly
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Mô tả</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="moTa"
                      rows={4}
                      value={detailFD?.moTa}
                      disabled={!isEdit}
                      onChange={(event) => {
                        setDetailFD({
                          ...detailFD,
                          moTa: event.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Ghi chú</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="ghiChu"
                      rows={4}
                      value={detailFD?.ghiChu}
                      disabled={!isEdit}
                      onChange={(event) => {
                        setDetailFD({
                          ...detailFD,
                          ghiChu: event.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Giá tiền (VNĐ)"
                        className="mb-3"
                      >
                        <Form.Control
                          type={isEdit ? "number" : "text"}
                          name="giaGoc"
                          min={"1000"}
                          step={"1000"}
                          value={
                            isEdit
                              ? detailFD?.giaGoc
                              : detailFD?.giaGoc.toLocaleString("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                })
                          }
                          required
                          disabled={!isEdit}
                          onChange={(event) => {
                            checkValid(event);
                            setDetailFD({
                              ...detailFD,
                              giaGoc: event.target.value,
                            });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          Số tiền không được âm
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          Bước nhảy là 1.000 VNĐ
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Giảm giá (%)"
                        className="mb-3"
                      >
                        <Form.Control
                          type={isEdit ? "number" : "text"}
                          name="giamGia"
                          min={"0"}
                          value={
                            isEdit
                              ? detailFD?.giamGia
                              : detailFD?.giamGia + " %"
                          }
                          required
                          disabled={!isEdit}
                          onChange={(event) => {
                            checkValid(event);
                            setDetailFD({
                              ...detailFD,
                              giamGia: event.target.value,
                            });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          Phần giảm giá không được âm
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group
                      style={{ width: "18rem" }}
                      controlId="validationCustom05"
                    >
                      <Form.Label>Hình ảnh</Form.Label>
                      <Form.Control
                        type="file"
                        name="image"
                        disabled={isEdit ? false : true}
                        onChange={(event) => {
                          checkValid(event);
                          uploadImage(event);
                        }}
                      />
                      <Card style={{ alignItems: "center" }}>
                        <Card.Img
                          style={{
                            maxHeight: "8rem",
                            maxWidth: "fit-content",
                          }}
                          variant="top"
                          src={image || detailFD?.hinhAnh}
                        />
                      </Card>
                      <Form.Control.Feedback type="invalid">
                        Vui lòng chọn hình ảnh cho combo
                      </Form.Control.Feedback>
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
            {isEdit ? (
              <div class="d-grid gap-2 col-6 mx-auto">
                <button
                  className="button-custom yes"
                  name="Đồng ý"
                  borderRadius="0.4em"
                  disabled={isInvalid}
                  onClick={(e, movie) => handleEdit(e, movie)}
                >
                  Đồng ý
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
            ) : (
              <div class="d-grid gap-2 col-6 mx-auto">
                <button
                  className="button-custom yes"
                  name="Chỉnh sửa"
                  borderRadius="0.4em"
                  style={{
                    "background-image":
                      "radial-gradient(100% 100% at 100% 0, #f6fa7e 0, #ffc107 100%)",
                  }}
                  onClick={() => setIsEdit(true)}
                >
                  Chỉnh sửa
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
            )}
          </Modal.Footer>
        </Modal>
      </Form>
    </div>
  );
}
/*className="container mt-3"*/
export default EditFDModal;
