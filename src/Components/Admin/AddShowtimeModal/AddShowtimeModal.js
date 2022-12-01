import React, { useEffect, useContext, useState } from "react";
import { StoreContext } from "../../../Redux/Store/Store";
import {
  API_MOVIE,
  API_ROOMS,
  API_SHOWTIMES,
} from "../../../common/ApiController";
import { Col, FloatingLabel, Modal, Row } from "react-bootstrap";
import { Button } from "../../Button/Button";
import isEmpty from "validator/lib/isEmpty";
import swal from "sweetalert";
import { NavLink, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

function AddShowtimeModal(props) {
  const [isShow, setInvokeModal] = useState(false);
  const [isInvalid, setInvalid] = useState(true);
  const store = useContext(StoreContext);
  const navigate = useNavigate();
  // const [validationMsg, setValidationMsg] = React.useState({
  //   ngayChieu: "Vui lòng chọn ngày chiếu cho phim",
  // });

  const [validated, setValidated] = useState(true);
  let emptyShowtime = {
    ngayChieu: "",
    gioChieu: "",
    phutChieu: "",
    tenRap: "",
  };
  const [detailShowtime, setDetailShowtime] = React.useState(emptyShowtime);
  // console.log("*", detailShowtime);
  // console.log("**", props.clusterName);

  let price = {
    Mon: "95000",
    Tue: "95000",
    Wed: "75000",
    Thu: "95000",
    Fri: "115000",
    Sat: "115000",
    Sun: "115000",
  };
  const checkPrice = (e) => {
    const formatDay = e.target.value;
    const dayName = new Date(formatDay).toString().split(" ")[0];
    let priceTicket = price[dayName];
    setDetailShowtime({
      ...detailShowtime,
      ngayChieu: formatDay,
      giaVe: priceTicket,
    });
  };
  useEffect(() => {
    fetch(API_ROOMS.GET)
      .then((res) => res.json())
      .then((dt) => {
        store.lsRooms.GetRoomsDispatch({
          type: "GETROOMS",
          payload: dt.data,
        });
      });
  }, []);
  const token = JSON.parse(localStorage.getItem("token"));

  const AddShowtimeAction = async (e) => {
    e.preventDefault();
    let formatDateTime = `${detailShowtime.ngayChieu} ${detailShowtime.gioChieu}:${detailShowtime.phutChieu}`;
    // console.log(">> formatDateTime", formatDateTime);
    swal({
      icon: "info",
      title: "Xin chờ giây lát",
      buttons: false,
      closeOnClickOutside: false,
    });
    fetch(API_SHOWTIMES.ADD + props.slug + "/showtime", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        ngayChieu: formatDateTime,
        tenRap: detailShowtime.tenRap,
        tenCumRap: props.clusterID,
        giaVe: detailShowtime.giaVe,
      }),
    })
      .then((res) => {
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
        if (res.status == 201) {
          swal({
            title: "Thêm lịch chiếu thành công",
            text: "",
            icon: "success",
          });
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        } else return res.json();
      })
      .then((response) => {
        if (response != true)
          return swal({
            title: "Thêm lịch chiếu thất bại",
            text: response.error,
            icon: "error",
          });
      });
  };
  let rooms = store.lsRooms?.Rooms?.rooms;
  const initModal = () => {
    setInvokeModal(!isShow);
    setDetailShowtime(emptyShowtime);
    rooms = rooms.sort((a, b) => a.tenRap.localeCompare(b.tenRap));
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

  const handleClick = (e) => {
    AddShowtimeAction(e);
    // setInvokeModal(true)
  };
  const checkValid = (event) => {
    let temp = document.getElementsByName(event.target.name).item(0);
    if (
      (isEmpty(temp.value) || temp.value.toString() === "") &&
      temp.required
    ) {
      event.preventDefault();
      //temp.className = "is-invalid add-showtime form-select";
      temp.classList.add("is-invalid");
    } else {
      //temp.className = "form-select";
      temp.classList.remove("is-invalid");
    }
    // Check and rerender if needed
    checkInvalidAndRerender();
  };

  const checkInvalidAndRerender = () => {
    // console.log("isInvalid", isInvalid);
    if (document.getElementsByClassName("is-invalid add-showtime").length > 0) {
      // If needed
      if (!isInvalid || isInvalid === undefined) {
        setInvalid(true);
      }
    } else {
      // Should be rerender
      if (isInvalid || isInvalid === undefined) {
        setInvalid(false);
      }
    }
  };

  var today = new Date();
  var tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  return (
    <div style={{ display: "flex" }}>
      <Button
        color="black"
        name="Thêm lịch chiếu"
        background="pink"
        width="fit-content"
        borderRadius="10.2em"
        fontWeight="bold"
        onClick={initModal}
      />
      <Form id="edit-form" style={{ maxWidth: "800px" }} onSubmit={handleClick}>
        <Modal size="lg" show={isShow}>
          <Modal.Header closeButton onClick={initModal}>
            <Modal.Title style={{ fontWeight: "bold" }}>
              THÊM LỊCH CHIẾU CHO RẠP{" "}
              <span style={{ color: "#e98d9d" }}>{props.clusterName}</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ background: "white", maxWidth: "800px" }}>
              <Form style={{ maxWidth: "800px" }} onSubmit={handleClick}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="4">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Ngày chiếu"
                      className="mb-3"
                    >
                      <Form.Control
                        className="is-invalid add-showtime"
                        required
                        type="date"
                        name="ngayChieu"
                        min={formattedDate(tomorrow)}
                        onChange={(e) => {
                          checkValid(e);
                          checkPrice(e);
                          detailShowtime.ngayChieu = e.target.value;
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Chọn ngày khởi chiếu cho phim
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group as={Col} md="4">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Rạp"
                      className="mb-3"
                    >
                      <Form.Select
                        className="is-invalid add-showtime"
                        required
                        name="rapChieu"
                        onChange={(e) => {
                          checkValid(e);
                          detailShowtime.tenRap = e.target.value;
                        }}
                      >
                        <option value="">Chọn rạp chiếu</option>
                        {rooms?.map((item, index) => {
                          return (
                            <option key={index} value={item._id}>
                              {item.tenRap}
                            </option>
                          );
                        })}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Chọn rạp chiếu phim
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group as={Col} md="3">
                    {detailShowtime?.giaVe
                      ? `Giá vé: ${detailShowtime?.giaVe} VNĐ`
                      : ""}
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="4">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Giờ"
                      className="mb-3"
                    >
                      <Form.Select
                        className="is-invalid add-showtime"
                        name="gioChieu"
                        onChange={(e) => {
                          checkValid(e);
                          detailShowtime.gioChieu = e.target.value;
                        }}
                        required
                      >
                        <option value="">Chọn giờ chiếu</option>
                        {Array.from(Array(15).keys())?.map((item, index) => {
                          return (
                            <option key={index} value={item + 9}>
                              {item + 9}
                            </option>
                          );
                        })}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Chọn giờ chiếu cho phim
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group as={Col} md="4">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Phút"
                      className="mb-3"
                    >
                      <Form.Select
                        className="is-invalid add-showtime"
                        name="phutChieu"
                        required
                        onChange={(e) => {
                          checkValid(e);
                          detailShowtime.phutChieu = e.target.value;
                        }}
                      >
                        <option value="">Chọn phút chiếu</option>
                        {Array.from(Array(12).keys())?.map((item, index) => {
                          return (
                            <option key={index} value={item * 5}>
                              {item * 5}
                            </option>
                          );
                        })}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Chọn ngày khởi chiếu cho phim
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </Row>
              </Form>
            </div>

            {/* <EditForm /> */}
          </Modal.Body>

          <Modal.Footer>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button
                className="button-custom yes"
                name="Đồng ý"
                borderRadius="0.4em"
                disabled={isInvalid === undefined ? true : isInvalid}
                onClick={(e, movie) => handleClick(e, movie)}
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
          </Modal.Footer>
        </Modal>
      </Form>
    </div>
  );
}
export default AddShowtimeModal;
