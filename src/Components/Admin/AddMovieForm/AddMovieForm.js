import React from "react";
import { API_MOVIE } from "../../../common/ApiController";
import HeaderAdmin from "../../../Page/Admin/Header/HeaderAdmin";
import { Button } from "../../Button/Button";
import { Input } from "../../Input/Input.js";
import isEmpty from "validator/lib/isEmpty";
import swal from "sweetalert";
import { Link, NavLink } from "react-router-dom";

function AddMovieForm(props) {
  const [validationMsg, setValidationMsg] = React.useState({});
  const [image, setDisplayImage] = React.useState();
  const [fileImage, setFileImage] = React.useState(null);

  let emptyMovie = {
    tenPhim: "",
    hinhAnh: "",
    moTa: "",
    ngayKhoiChieu: "",
    thoiLuong: "",
    trailer: "",
  };
  // const navigate = useNavigate();
  const [detailMovie, setDetailMovie] = React.useState(emptyMovie);
  console.log(">> detailMovie", detailMovie);

  const initModal = () => {
    setDetailMovie(emptyMovie);
    setDisplayImage();
    setValidationMsg({});
  };
  const AddMovieAction = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    if (fileImage != null) fd.append("hinhAnh", fileImage, fileImage.name);
    for (let keyOfObj in detailMovie) {
      fd.append(keyOfObj, detailMovie[keyOfObj]);
    }
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRiN2Q3MDljMGQxZDA4NjA5ZjUzY2EiLCJtYUxvYWlOZ3VvaUR1bmciOiIwIiwiaWF0IjoxNjY1NTAxNjEwLCJleHAiOjE2NjU1MDUyMTB9.Cxy-tsEdS49rD8ODVbCII_V6WpGev0qizWbZMhjxA6w";

    let res = await fetch(API_MOVIE.ADD, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: fd,
    });
    if (res.status === 201) {
      swal({
        title: "Thêm phim thành công",
        text: "",
        icon: "success",
      });
      //  navigate("/Admin")
    } else
      swal({
        title: "Thêm phim mới thất bại",
        text: "Hãy thử lại",
        icon: "warning",
        buttons: true,
        // dangerMode: true,
      });
  };

  const handleAdd = (e) => {
    if (validateAll(e)) AddMovieAction(e);
    else return;
  };
  const validateAll = (e) => {
    let msg = {};
    const labelOfField = {
      tenPhim: "tên phim",
      ngayKhoiChieu: "ngày khởi chiếu",
      thoiLuong: "thời lượng",
      hinhAnh: "hình ảnh",
    };
    for (let keyOfObj in labelOfField) {
      console.log(keyOfObj, ":");
      if (
        isEmpty(detailMovie[keyOfObj]) ||
        detailMovie[keyOfObj].trim() === 0
      ) {
        if (keyOfObj === "hinhAnh")
          msg[keyOfObj] = `Vui lòng chọn ${labelOfField[keyOfObj]} `;
        else msg[keyOfObj] = `Vui lòng điền ${labelOfField[keyOfObj]} `;
      }
    }
    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
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
  const validateField = (event) => {
    const msg = { ...validationMsg };
    const labelOfField = {
      tenPhim: "tên phim",
      ngayKhoiChieu: "ngày khởi chiếu",
      thoiLuong: "thời lượng",
      hinhAnh: "hình ảnh",
    };
    if (fileImage === null) msg.hinhAnh = "Chọn hình đại diện cho phim";
    if (event.target.value === "hinhAnh" && fileImage != null)
      delete msg["hinhAnh"];
    if (isEmpty(event.target.value) || event.target.value.trim() === 0) {
      msg[event.target.name] = `Vui lòng điền ${
        labelOfField[event.target.name]
      } `;
    } else delete msg[event.target.name];

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const uploadImage = async (event) => {
    if (event.target.files[0] !== null) {
      setFileImage(event.target.files[0]);
      console.log(">> uploadImage", event.target.files[0]);
      let url = URL.createObjectURL(event.target.files[0]);
      setDisplayImage(url);
    }
  };
  console.log(">> Error", validationMsg);
  const handleOnChange = (event) => {
    if (["tenPhim", "ngayKhoiChieu", "thoiLuong"].includes(event.target.name))
      validateField(event);
    console.log(">> in handleOnChange", event.target.name);
    setDetailMovie({ ...detailMovie, [event.target.name]: event.target.value });
  };
  return (
    <>
      <HeaderAdmin />
      <div className="general">
        <div className="vertical-menu">
          <NavLink end to="/Admin">
            Tất cả phim
          </NavLink>
          <Link to="#" className="active">
            Tạo phim mới
          </Link>
          <Link to="#">Phim được yêu thích</Link>
        </div>
        <div style={{ marginLeft: "40px" }} className="container mt-4">
          {/* 
            <Button variant="success" onClick={initModal}>
                Open Modal
            </Button> */}
          <form>
            <div style={{ textAlign: "center", width: "980px" }}>
              <label>THÔNG TIN PHIM MỚI</label>
            </div>
            <div className="row">
              <div className="col-md-5">
                <Input
                  type="text"
                  value={detailMovie?.tenPhim}
                  disabled={false}
                  label="Tên phim"
                  name="tenPhim"
                  onChange={(event) => handleOnChange(event)}
                  onClick={(event) => handleOnChange(event)}
                />
                <span style={{ color: "red" }}>{validationMsg?.tenPhim}</span>
              </div>
              <div className="col-md-4">
                <Input
                  type={"date"}
                  value={formattedDate(detailMovie?.ngayKhoiChieu)}
                  label="Khởi chiếu"
                  name="ngayKhoiChieu"
                  disabled={false}
                  onChange={(event) => handleOnChange(event)}
                  onClick={(event) => handleOnChange(event)}
                />
                <div>
                  <span style={{ color: "red" }}>
                    {validationMsg?.ngayKhoiChieu}
                  </span>
                </div>
              </div>
            </div>
            Mô tả
            <br />
            <textarea
              rows="4"
              cols="96"
              disabled={false}
              name="moTa"
              value={detailMovie?.moTa}
              onChange={(event) => handleOnChange(event)}
              onClick={(event) => handleOnChange(event)}
            />
            <br />
            <div className="row">
              <div className="col-md-3">
                Thời lượng
                <input
                  className="form-control"
                  type="number"
                  style={{
                    height: "25px",
                    width: "100%",
                    border: "1px solid lightgray",
                    boxShadow: "none",
                  }}
                  value={detailMovie?.thoiLuong}
                  onKeyDown={(e) => e.preventDefault()}
                  name="thoiLuong"
                  disabled={false}
                  min={0}
                  onChange={(event) => handleOnChange(event)}
                  onClick={(event) => handleOnChange(event)}
                />
                <div>
                  <span style={{ color: "red" }}>
                    {validationMsg?.thoiLuong}
                  </span>
                </div>
              </div>
              <div className="col-md-4">
                Hình ảnh
                <br />
                <input
                  type="file"
                  name="hinhAnh"
                  onChange={(event) => {
                    uploadImage(event);
                    validateField(event);
                  }}
                />
                <div>
                  <span style={{ color: "red" }}>{validationMsg?.hinhAnh}</span>
                </div>
              </div>
              <div className="col-md-4">
                <img
                  src={image || detailMovie?.hinhAnh}
                  height="80px"
                  alt=""
                ></img>
              </div>
            </div>
            <div
              className="row"
              style={{ marginTop: "24px", marginLeft: "78px" }}
            >
              <div className="col-md-4">
                <Button
                  color="white"
                  background="green"
                  name="Đồng ý"
                  borderRadius="0.4em"
                  disabled={Object.keys(validationMsg).length > 0}
                  onClick={(e) => handleAdd(e)}
                />
              </div>
              <div className="col-md-4">
                <Button
                  color="danger"
                  name="Hủy"
                  borderRadius="0.4em"
                  onClick={initModal}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default AddMovieForm;
