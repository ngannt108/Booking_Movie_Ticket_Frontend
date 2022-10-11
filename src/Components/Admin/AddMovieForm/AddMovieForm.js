import React, { useEffect, useContext } from "react";
import { StoreContext } from "../../../Redux/Store/Store";
import { API_MOVIE } from "../../../common/ApiController";
import HeaderAdmin from "../../../Page/Admin/Header/HeaderAdmin";
import { Button } from "../../Button/Button";
import { Input } from "../../Input/Input.js";
import isEmpty from 'validator/lib/isEmpty';
import swal from 'sweetalert'


function AddMovieForm(props) {
    const store = useContext(StoreContext);
    const [validationMsg, setValidationMsg] = React.useState({})
    const [image, setDisplayImage] = React.useState()
    const [fileImage, setFileImage] = React.useState(null)

    let emptyMovie = {
        tenPhim: "",
        hinhAnh: "",
        moTa: "",
        ngayKhoiChieu: "",
        thoiLuong: "",
        trailer: ""
    }
    const [detailMovie, setDetailMovie] = React.useState(emptyMovie);
    console.log('>> detailMovie', detailMovie)

    const initModal = () => {
        setDetailMovie(emptyMovie)
        setDisplayImage()
        setValidationMsg({})
    }
    const AddMovieAction = async (e) => {
        e.preventDefault();
        const fd = new FormData();
        if (fileImage != null)
            fd.append("hinhAnh", fileImage, fileImage.name)
        for (let keyOfObj in detailMovie) {
            fd.append(keyOfObj, detailMovie[keyOfObj])
        }
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRiN2Q3MDljMGQxZDA4NjA5ZjUzY2EiLCJtYUxvYWlOZ3VvaUR1bmciOiIwIiwiaWF0IjoxNjY1NTAxNjEwLCJleHAiOjE2NjU1MDUyMTB9.Cxy-tsEdS49rD8ODVbCII_V6WpGev0qizWbZMhjxA6w'

        let res = await fetch(API_MOVIE.ADD, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: "POST",
            body: fd
        })
        if (res.status === 201) {

            swal({
                title: "Thêm phim thành công",
                text: "",
                icon: "success",
            });
        } else swal({
            title: "Thêm phim mới thất bại",
            text: "Hãy thử lại",
            icon: "warning",
            buttons: true,
            // dangerMode: true,
        })

    }
    const handleAdd = async (e) => {
        AddMovieAction(e)
    }
    const formattedDate = (dateInput) => {
        let today = new Date(dateInput);
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return yyyy + '-' + mm + '-' + dd;

    }
    const validateAll = (event) => {
        const msg = { ...validationMsg }
        const labelOfField = {
            "tenPhim": "tên phim",
            "ngayKhoiChieu": "ngày khởi chiếu",
            "thoiLuong": "thời lượng",
            "hinhAnh": "hình ảnh"
        }
        if (fileImage == null)
            msg.hinhAnh = 'Chọn hình đại diện cho phim'
        if (event.target.value == "hinhAnh" && fileImage != null)
            delete msg["hinhAnh"]
        if (isEmpty(event.target.value) || event.target.value.trim() == 0) {
            msg[event.target.name] = `Vui lòng điền ${labelOfField[event.target.name]} `
        } else delete msg[event.target.name]

        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    const uploadImage = async (event) => {
        if (event.target.files[0] != null) {
            setFileImage(event.target.files[0]);
            console.log('>> uploadImage', event.target.files[0])
            let url = URL.createObjectURL(event.target.files[0]);
            setDisplayImage(url);
        }
    };
    console.log('>> Error', validationMsg)
    const handleOnChange = (event) => {
        if (['tenPhim', 'ngayKhoiChieu', 'thoiLuong'].includes(event.target.name))
            validateAll(event)
        console.log('>> in handleOnChange', event.target.name)
        setDetailMovie({ ...detailMovie, [event.target.name]: event.target.value })
    }
    return (
        <>
            <HeaderAdmin />
            <div className="general">
                <div className="vertical-menu">
                    <a href="#" className="active">Tất cả phim</a>
                    <a href="#">Tạo phim mới</a>
                    <a href="#">Phim được yêu thích</a>
                </div>
                <div className="container mt-3">
                    {/* 
            <Button variant="success" onClick={initModal}>
                Open Modal
            </Button> */}
                    <form>
                        <label>THÔNG TIN PHIM MỚI</label>
                        <Input type="text"
                            value={detailMovie?.tenPhim}
                            disabled={false}
                            label="Tên phim"
                            name="tenPhim"
                            onChange={(event) => handleOnChange(event)}
                            onClick={(event) => handleOnChange(event)} />
                        <span style={{ color: 'red' }}>{validationMsg?.tenPhim}</span>
                        <Input type={"date"}
                            value={formattedDate(detailMovie?.ngayKhoiChieu)}
                            label="Khởi chiếu"
                            name="ngayKhoiChieu"
                            disabled={false}
                            onChange={(event) => handleOnChange(event)}
                            onClick={(event) => handleOnChange(event)}
                        />
                        <div><span style={{ color: 'red' }}>{validationMsg?.ngayKhoiChieu}</span></div>
                        Mô tả
                        <br />
                        <textarea
                            rows="4"
                            cols="76"
                            disabled={false}
                            name="moTa"
                            value={detailMovie?.moTa}
                            onChange={(event) => handleOnChange(event)}
                            onClick={(event) => handleOnChange(event)}
                        />
                        <br />
                        Thời lượng
                        <input type="number"
                            style={{
                                "height": "25px",
                                "width": "100%",
                                "border": "1px solid lightgray"
                            }}
                            value={detailMovie?.thoiLuong}
                            onKeyDown={(e) => e.preventDefault()}
                            name="thoiLuong"
                            disabled={false}
                            min={0}
                            onChange={(event) => handleOnChange(event)}
                            onClick={(event) => handleOnChange(event)}
                        />
                        <div><span style={{ color: 'red' }}>{validationMsg?.thoiLuong}</span></div>

                        <input type="file" name='hinhAnh' onChange={(event) => {
                            uploadImage(event)
                            validateAll(event)
                        }} />
                        <div><span style={{ color: 'red' }}>{validationMsg?.hinhAnh}</span></div>

                        <img src={image || detailMovie?.hinhAnh} height="80px"></img>
                        <Button color="white" background="green" name="Đồng ý" disabled={Object.keys(validationMsg).length > 0} onClick={(e) => handleAdd(e)} />
                        <Button color="danger" name="Hủy" onClick={initModal} />
                    </form>
                </div >
            </div>
        </>
    )
}
export default AddMovieForm