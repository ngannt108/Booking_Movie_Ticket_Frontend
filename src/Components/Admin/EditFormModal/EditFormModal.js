import React, { useEffect, useContext } from "react";
import { StoreContext } from "../../../Redux/Store/Store";
import { API_MOVIE } from "../../../common/ApiController";
import { Modal } from 'react-bootstrap';
import { Button } from "../../Button/Button";
import { Input } from "../../Input/Input.js";
import isEmpty from 'validator/lib/isEmpty';
import swal from 'sweetalert'


function EditModalDialog(props) {
    const [isShow, setInvokeModal] = React.useState(false)
    const [isEdit, setIsEdit] = React.useState(false)
    const store = useContext(StoreContext);
    const [validationMsg, setValidationMsg] = React.useState({})
    const [image, setDisplayImage] = React.useState()
    const [fileImage, setFileImage] = React.useState('')

    const [biDanh, setBiDanh] = React.useState()
    let emptyMovie = {
        hinhAnh: "",
        moTa: "",
        ngayKhoiChieu: "",
        thoiLuong: "",
    }
    const [detailMovie, setDetailMovie] = React.useState(emptyMovie);

    const handleClick = (biDanh) => {
        setBiDanh(biDanh)
        setInvokeModal(true)
    }
    var data
    useEffect(() => {
        if (!biDanh) return
        fetch(API_MOVIE.DETAIL + biDanh)
            .then((res) => res.json())
            .then((dt) => {
                store.movie.DetailMovieDispatch({
                    type: "GETDETAILMOVIE",
                    payload: dt.data[0],
                });
                console.log('>> biDanh', dt.data[0])
                setDetailMovie({
                    hinhAnh: dt.data[0]?.hinhAnh,
                    moTa: dt.data[0]?.moTa,
                    ngayKhoiChieu: dt.data[0]?.ngayKhoiChieu,
                    thoiLuong: dt.data[0]?.thoiLuong.toString(),
                })
            });
        console.log(">> useEffect")

    }, [biDanh, isEdit]);

    data = store.movie.DetailMovie
    console.log('>> detailMovie', detailMovie)

    const initModal = () => {
        setInvokeModal(!isShow)
        setBiDanh()
        setIsEdit(false)
        setDetailMovie(emptyMovie)
        setDisplayImage()
        setValidationMsg({})
    }
    const UpdateMovieAction = async (e) => {
        e.preventDefault()
        const fd = new FormData();
        if (fileImage != null && fileImage != "")
            fd.append("hinhAnh", fileImage, fileImage.name)
        for (let keyOfObj in detailMovie) {
            fd.append(keyOfObj, detailMovie[keyOfObj])
        }
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRiN2Q3MDljMGQxZDA4NjA5ZjUzY2EiLCJtYUxvYWlOZ3VvaUR1bmciOiIwIiwiaWF0IjoxNjY1NTkyNzQzLCJleHAiOjE2NjU1OTYzNDN9.KIUDS3J_XmcIPrSaSZfSVljlDcRHPRNDKQJIgJk9Ph0'
        let res = await fetch(API_MOVIE.UPDATE + biDanh, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: "PUT",
            body: fd
        });
        if (res.status === 200) {
            swal({
                title: "Cập nhật thành công!",
                text: "",
                icon: "success",
            });
            setIsEdit(false)
        } else swal({
            title: "Cập nhật thất bại",
            text: "Hãy thử lại",
            icon: "warning",
            buttons: true,
            // dangerMode: true,
        })
    }
    const handleEdit = async (e, movie) => {
        UpdateMovieAction(e)
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
            "ngayKhoiChieu": "ngày khởi chiếu",
            "thoiLuong": "thời lượng",
        }
        if (isEmpty(event.target.value) || event.target.value.trim()) {
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
    return (
        <div className="container mt-3">
            <Button color='black' name="Detail" background="pink" width="fit-content" borderRadius="0.2em" fontWeight="bold" onClick={() => handleClick(props.biDanh)} />
            <Button margin="0px 4px" color='red' name="Remove" background="pink" width="fit-content" borderRadius="0.2em" fontWeight="bold" />

            {/* 
            <Button variant="success" onClick={initModal}>
                Open Modal
            </Button> */}
            <Modal size="lg" show={isShow}>
                <Modal.Header closeButton onClick={initModal}>
                    {isEdit ?
                        <Modal.Title>CHỈNH SỬA PHIM</Modal.Title>
                        :
                        <Modal.Title>CHI TIẾT PHIM</Modal.Title>}
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-7">
                            <Input type="text"
                                value={data.detailMovie?.tenPhim}
                                label="Tên phim"
                                name="Tên phim" />
                        </div>
                        <div className="col-md-5">
                            <Input type={isEdit ? "date" : "text"}
                                value={isEdit ? formattedDate(detailMovie?.ngayKhoiChieu) : new Date(data.detailMovie?.ngayKhoiChieu).toDateString()}
                                label="Khởi chiếu"
                                name="ngayKhoiChieu"
                                disabled={isEdit ? false : true}
                                onChange={(event) => {
                                    validateAll(event)
                                    //console.log(">> toLocaleString()", new Date(detailMovie?.ngayKhoiChieu).toLocaleString())
                                    setDetailMovie({ ...detailMovie, ngayKhoiChieu: event.target.value })
                                }
                                }
                                onClick={(event) => validateAll(event)}
                            />
                        </div>
                    </div>
                    Mô tả
                    <br />
                    <textarea
                        rows="4"
                        cols="76"
                        disabled={isEdit ? false : true}
                        name="moTa"
                        value={detailMovie?.moTa}
                        onChange={(event) => {
                            setDetailMovie({ ...detailMovie, moTa: event.target.value })
                        }}
                    />
                    <span style={{ color: 'red' }}>{validationMsg?.moTa}</span>
                    <div className="row">
                        <div className="col-md-5">
                            <Input type={isEdit ? "hidden" : "text"}
                                value={data.detailMovie?.ngayKetThuc ? new Date(data.detailMovie?.ngayKetThuc).toDateString() : "Chưa có thông tin"}
                                label={!isEdit ? "Ngày kết thúc" : ""}
                                name="Ngày kết thúc" />
                        </div>
                        <div className="col-md-5">
                            Thời lượng
                            <input className="form-control"
                                type="number"
                                style={{
                                    "height": "25px",
                                    "width": "100%",
                                    "border": "1px solid lightgray",
                                    "boxShadow": "none",
                                }}
                                value={detailMovie?.thoiLuong}
                                onKeyDown={(e) => e.preventDefault()}
                                name="thoiLuong"
                                disabled={isEdit ? false : true}
                                min={0}
                                onChange={(event) => {
                                    validateAll(event)
                                    setDetailMovie({ ...detailMovie, thoiLuong: event.target.value })
                                }}
                                onClick={(event) => validateAll(event)}
                            />
                        </div>
                    </div>
                    {isEdit ?
                        <input type="file" name="hinhAnh" onChange={(event) => {
                            uploadImage(event)
                        }} />
                        : <div>Hình ảnh</div>}
                    <img style={{ "margin-top": "8px" }} src={image || detailMovie?.hinhAnh} height="80px"></img>
                    <div className="row">
                        <div className="col-md-5">
                            <Input type="number"
                                value={data.detailMovie?.danhGia}
                                label="Đánh giá"
                                name="Đánh giá" />
                        </div>
                        <div className="col-md-5">
                            <Input type="number"
                                value={data.detailMovie?.soLuongBan}
                                label="Đã bán"
                                name="Đã bán" />
                        </div>
                    </div>


                    {/* <EditForm /> */}
                </Modal.Body>
                <Modal.Footer>
                    {
                        isEdit ? (<><Button color="white" background="green" name="Đồng ý" disabled={Object.keys(validationMsg).length > 0} onClick={(e, movie) => handleEdit(e, movie)} />
                            <Button color="danger" name="Hủy" onClick={initModal} /></>) : (
                            <>
                                <Button color="black" background="yellow" name="Chỉnh sửa" onClick={() => setIsEdit(true)} />
                                <Button color="danger" name="Hủy" onClick={initModal} />
                            </>
                        )
                    }
                </Modal.Footer>
            </Modal>
        </div >
    )
}
export default EditModalDialog