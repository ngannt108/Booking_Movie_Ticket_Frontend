import React, { useEffect, useContext } from "react";
import { StoreContext } from "../../../Redux/Store/Store";
import { API_MOVIE } from "../../../common/ApiController";
import HeaderAdmin from "../../../Page/Admin/Header/HeaderAdmin";
import { Button } from "../../Button/Button";
import { Input } from "../../Input/Input.js";
import isEmpty from "validator/lib/isEmpty";
import swal from "sweetalert";
import { NavLink, useNavigate } from "react-router-dom";
import { Col, Form } from "react-bootstrap";
import { Multiselect } from "multiselect-react-dropdown";

function AddMovieForm(props) {
  const store = useContext(StoreContext);
  const [validationMsg, setValidationMsg] = React.useState({});
  const [image, setDisplayImage] = React.useState();
  const [fileImage, setFileImage] = React.useState(null);
  const [banner, setDisplayBanner] = React.useState();
  const [fileBanner, setFileBanner] = React.useState(null);
  const [genres, setGenres] = React.useState([]);

  let emptyMovie = {
    tenPhim: "",
    hinhAnh: "",
    moTa: "",
    ngayKhoiChieu: "",
    thoiLuong: "",
    trailer: "",
    anhBia: "",
    theLoai: [],
    quocGia: "",
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
    console.log(">> into AddAction");
    e.preventDefault();
    const fd = new FormData();
    if (fileImage != null) fd.append("hinhAnh", fileImage, fileImage.name);
    if (fileBanner != null) fd.append("anhBia", fileBanner, fileBanner.name);
    for (let keyOfObj in detailMovie) {
      fd.append(keyOfObj, detailMovie[keyOfObj]);
    }
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRiN2Q3MDljMGQxZDA4NjA5ZjUzY2EiLCJtYUxvYWlOZ3VvaUR1bmciOiIwIiwiaWF0IjoxNjY2NjE4NTQzLCJleHAiOjE2NjY2MjIxNDN9.YSyVzXMf0hnDtQQHEsoA5SJgciJme9z-iBbbnxZTQZg";

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
  console.log(">> file banner", fileBanner);
  console.log(">> file image", fileImage);
  const validateAll = (e) => {
    let msg = {};
    const labelOfField = {
      tenPhim: "tên phim",
      ngayKhoiChieu: "ngày khởi chiếu",
      thoiLuong: "thời lượng",
    };
    delete detailMovie.hinhAnh;
    delete detailMovie.anhBia;
    for (let keyOfObj in labelOfField) {
      console.log(keyOfObj, ":", detailMovie[keyOfObj]);
      if (
        isEmpty(detailMovie[keyOfObj]) ||
        detailMovie[keyOfObj].trim() === 0
      ) {
        // if (keyOfObj == "hinhAnh")
        //     msg[keyOfObj] = `Vui lòng chọn ${labelOfField[keyOfObj]} `
        // if (keyOfObj == "anhBia")
        //     msg[keyOfObj] = `Vui lòng chọn ${labelOfField[keyOfObj]} `
        msg[keyOfObj] = `Vui lòng điền ${labelOfField[keyOfObj]} `;
      }
    }
    if (image == null) msg.hinhAnh = "Chọn hình đại diện cho phim";
    if (banner == null) msg.anhBia = "Chọn ảnh bìa cho phim";
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
      trailer: "trailer",
      hinhAnh: "hình ảnh",
      anhBia: "ảnh bìa",
    };
    if (fileImage == null) msg.hinhAnh = "Chọn hình đại diện cho phim";
    if (fileBanner == null) msg.anhBia = "Chọn ảnh bìa cho phim";
    if (event.target.value == "hinhAnh" && fileImage != null)
      delete msg["hinhAnh"];
    if (event.target.value == "anhBia" && fileBanner != null)
      delete msg["anhBia"];
    if (isEmpty(event.target.value) || event.target.value.trim() == 0) {
      msg[event.target.name] = `Vui lòng điền ${
        labelOfField[event.target.name]
      } `;
    } else delete msg[event.target.name];

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const uploadImage = async (event) => {
    if (event.target.files[0] != null) {
      setFileImage(event.target.files[0]);
      console.log(">> uploadImage", event.target.files[0]);
      let url = URL.createObjectURL(event.target.files[0]);
      setDisplayImage(url);
    }
  };
  const uploadBanner = async (event) => {
    if (event.target.files[0] != null) {
      setFileBanner(event.target.files[0]);
      console.log(">> uploadBanner", event.target.files[0]);
      let url = URL.createObjectURL(event.target.files[0]);
      setDisplayBanner(url);
    }
  };
  console.log(">> Error", validationMsg);
  const handleOnChange = (event) => {
    if (
      ["tenPhim", "ngayKhoiChieu", "thoiLuong", "trailer"].includes(
        event.target.name
      )
    )
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
          <a href="#" className="active">
            Tạo phim mới
          </a>
          <a href="#">Phim được yêu thích</a>
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
              <div className="col-md-4" style={{ padding: "15px 12px" }}>
                Ngày khởi chiếu
                <input
                  className="form-control"
                  type="date"
                  style={{
                    height: "25px",
                    width: "100%",
                    border: "1px solid lightgray",
                    boxShadow: "none",
                  }}
                  value={formattedDate(detailMovie?.ngayKhoiChieu)}
                  min={formattedDate(Date())}
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
              className="col-md-9"
              rows="4"
              // cols="96"
              disabled={false}
              name="moTa"
              value={detailMovie?.moTa}
              onChange={(event) => handleOnChange(event)}
              onClick={(event) => handleOnChange(event)}
            />
            <br />
            <div className="row">
              <div className="col-md-3" style={{ padding: "15px 12px" }}>
                Thời lượng
                <input
                  className="form-control"
                  //   type="number"
                  style={{
                    height: "25px",
                    width: "100%",
                    border: "1px solid lightgray",
                    boxShadow: "none",
                  }}
                  value={detailMovie?.thoiLuong}
                  //   onKeyDown={(e) => e.preventDefault()}
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
              <div className="col-md-3">
                <Input
                  type={"url"}
                  value={detailMovie?.trailer}
                  label="Trailer"
                  name="trailer"
                  disabled={false}
                  onChange={(event) => handleOnChange(event)}
                  onClick={(event) => handleOnChange(event)}
                />
                <div>
                  <span style={{ color: "red" }}>{validationMsg?.trailer}</span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  Thể loại
                  <Multiselect
                    isObject={false}
                    onRemove={(event) => {
                      setDetailMovie({ ...detailMovie, theLoai: event });
                    }}
                    onSelect={(event) => {
                      setDetailMovie({ ...detailMovie, theLoai: event });
                    }}
                    options={[
                      "Kinh dị",
                      " Hài hước",
                      "Lãng mạn",
                      "Hành động",
                      "Hoạt hình",
                      "Viễn tưởng",
                    ]}
                    // selectedValues={genres}
                    showCheckbox
                    hidePlaceholder
                    placeholder="Nhấp để chọn"
                  />
                </div>
                <div className="col-md-4">
                  Quốc gia
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) =>
                      setDetailMovie({
                        ...detailMovie,
                        quocGia: e.target.value,
                      })
                    }
                  >
                    <option value="Mỹ">Mỹ</option>
                    <option value="Việt Nam">Việt Nam</option>
                    <option value="Anh">Anh</option>
                    <option value="Pháp">Pháp</option>
                    <option value="Nhật">Nhật</option>
                    <option value="Thái Lan">Thái Lan</option>
                    <option value="Hàn">Hàn</option>
                    <option value="Khác">Khác</option>
                  </Form.Select>
                </div>
                <div className="col-md-6"></div>
              </div>
            </div>
            <div className="row">
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
                Ảnh bìa
                <br />
                <input
                  type="file"
                  name="anhBia"
                  onChange={(event) => {
                    uploadBanner(event);
                    validateField(event);
                  }}
                />
                <div>
                  <span style={{ color: "red" }}>{validationMsg?.anhBia}</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <img src={image || detailMovie?.hinhAnh} height="80px"></img>
              </div>

              <div className="col-md-4">
                <img src={banner || detailMovie?.anhBia} height="80px"></img>
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
