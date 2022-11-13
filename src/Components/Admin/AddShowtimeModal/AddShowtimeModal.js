import React, { useEffect, useContext } from "react";
import { StoreContext } from "../../../Redux/Store/Store";
import {
  API_MOVIE,
  API_ROOMS,
  API_SHOWTIMES,
} from "../../../common/ApiController";
import { Modal } from "react-bootstrap";
import { Button } from "../../Button/Button";
import { Input } from "../../Input/Input.js";
import isEmpty from "validator/lib/isEmpty";
import swal from "sweetalert";
import { NavLink } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useRef } from "react";

function AddShowtimeModalDialog(props) {
  const [isShow, setInvokeModal] = React.useState(false);
  const store = useContext(StoreContext);
  const [validationMsg, setValidationMsg] = React.useState({
    ngayChieu: "Vui lòng chọn ngày chiếu cho phim",
  });
  let emptyShowtime = {
    ngayChieu: "",
    gioChieu: "",
    phutChieu: "",
    tenRap: "",
  };
  const [detailShowtime, setDetailShowtime] = React.useState(emptyShowtime);
  console.log("*", detailShowtime);
  console.log("**", props.clusterName);
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
        giaVe: "70000",
      }),
    })
      .then((res) => {
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
  var rooms = store.lsRooms?.Rooms?.rooms;
  const initModal = () => {
    setInvokeModal(!isShow);
    setDetailShowtime(emptyShowtime);
    setValidationMsg({});
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

  const validateDateShowtime = (e) => {
    if (!isEmpty(e.target.value) || e.target.value.trim() != 0)
      setValidationMsg({});
  };
  const handleClick = (e) => {
    AddShowtimeAction(e);
    // setInvokeModal(true)
  };

  console.log(">> date ISOString", detailShowtime);
  return (
    /*className="container mt-3"*/
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
      <Modal size="lg" show={isShow}>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>
            THÊM LỊCH CHIẾU CHO RẠP{" "}
            <span style={{ color: "#e98d9d" }}>{props.clusterName}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <Input
                type="date"
                disabled={false}
                min={formattedDate(
                  store.movie?.DetailMovie?.detailMovie?.ngayKhoiChieu
                )}
                label="Ngày chiếu"
                name="ngayChieu"
                onClick={(e) => {
                  validateDateShowtime(e);
                  console.log(">> validateMsg", validationMsg);
                  setDetailShowtime({
                    ...detailShowtime,
                    ngayChieu: e.target.value,
                  });
                }}
                onChange={(e) => {
                  validateDateShowtime(e);
                  console.log(">> validateMsg", validationMsg);
                  setDetailShowtime({
                    ...detailShowtime,
                    ngayChieu: e.target.value,
                  });
                }}
              />
              <span style={{ color: "red" }}>
                {detailShowtime?.ngayChieu
                  ? ""
                  : "Vui lòng chọn ngày chiếu cho phim"}
              </span>
            </div>

            <div className="col-md-6">
              Rạp
              <br />
              <Form.Select
                aria-label="Default select example"
                style={{ margin: "8px 0px 0px 0px" }}
                onClick={(e) => {
                  setDetailShowtime({
                    ...detailShowtime,
                    tenRap: e.target.value,
                  });
                }}
                onChange={(e) => {
                  setDetailShowtime({
                    ...detailShowtime,
                    tenRap: e.target.value,
                  });
                }}
              >
                {rooms?.map((item, index) => {
                  return (
                    <option key={index} value={item._id}>
                      {item.tenRap}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
              <Form.Select
                aria-label="Default select example"
                onChange={(e) =>
                  setDetailShowtime({
                    ...detailShowtime,
                    gioChieu: e.target.value,
                  })
                }
              >
                {Array.from(Array(15).keys())?.map((item, index) => {
                  return (
                    <option key={index} value={item + 9}>
                      {item + 9}
                    </option>
                  );
                })}
              </Form.Select>
            </div>{" "}
            Giờ
            <div className="col-md-2">
              <Form.Select
                aria-label="Default select example"
                onChange={(e) =>
                  setDetailShowtime({
                    ...detailShowtime,
                    phutChieu: e.target.value,
                  })
                }
              >
                {Array.from(Array(12).keys())?.map((item, index) => {
                  return (
                    <option key={index} value={item * 5}>
                      {item * 5}
                    </option>
                  );
                })}
              </Form.Select>
            </div>{" "}
            Phút
          </div>
        </Modal.Body>
        <Modal.Footer>
          {
            <div className="d-grid gap-2 col-6 mx-auto">
              <Button
                color="black"
                background="yellow"
                name="Đồng ý"
                borderRadius="0.4em"
                disabled={Object.keys(validationMsg).length > 0}
                onClick={(e) => handleClick(e)}
              />
              <Button
                color="danger"
                name="Hủy"
                borderRadius="0.4em"
                onClick={initModal}
              />
            </div>
          }
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default AddShowtimeModalDialog;
