import React, { useEffect, useContext } from "react";
import { StoreContext } from "../../../Redux/Store/Store";
import { API_MOVIE } from "../../../common/ApiController";
import { Modal } from 'react-bootstrap';
import { Button } from "../../Button/Button";
import { Input } from "../../Input/Input.js";
import isEmpty from 'validator/lib/isEmpty';
import swal from 'sweetalert'
import { NavLink } from "react-router-dom";
import { Col, Form } from "react-bootstrap";
import { Multiselect } from 'multiselect-react-dropdown'

function EditModalDialog(props) {
    const [isShow, setInvokeModal] = React.useState(false)
    const [isEdit, setIsEdit] = React.useState(false)
    const store = useContext(StoreContext);
    const [validationMsg, setValidationMsg] = React.useState({})
    const [image, setDisplayImage] = React.useState()
    const [fileImage, setFileImage] = React.useState('')
    const [banner, setDislayBanner] = React.useState()
    const [fileBanner, setFileBanner] = React.useState('')
    const [biDanh, setBiDanh] = React.useState()

    let emptyMovie = {
        hinhAnh: "",
        moTa: "",
        ngayKhoiChieu: "",
        thoiLuong: "",
        trailer: "",
        anhBia: "",
        theLoai: [],
        quocGia: ""
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
                setDetailMovie({
                    hinhAnh: dt.data[0]?.hinhAnh,
                    anhBia: dt.data[0]?.anhBia,
                    theLoai: dt.data[0]?.theLoai,
                    quocGia: dt.data[0]?.quocGia,
                    trailer: dt.data[0]?.trailer,
                    moTa: dt.data[0]?.moTa,
                    ngayKhoiChieu: dt.data[0]?.ngayKhoiChieu,
                    thoiLuong: dt.data[0]?.thoiLuong.toString(),
                })
            });

    }, [biDanh, isEdit]);

    data = store.movie?.DetailMovie
    // console.log('>> detailMovie', detailMovie)
    // console.log('>> ERROR', validationMsg)

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
        if (fileBanner != null && fileBanner != "")
            fd.append("anhBia", fileBanner, fileBanner.name)
        for (let keyOfObj in detailMovie) {
            fd.append(keyOfObj, detailMovie[keyOfObj])
        }
        const token = JSON.parse(localStorage.getItem("token"))
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
                buttons: true,
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
            // console.log('>> uploadImage', event.target.files[0])
            let url = URL.createObjectURL(event.target.files[0]);
            setDisplayImage(url);
        }
    };
    const uploadBanner = async (event) => {
        if (event.target.files[0] != null) {
            setFileBanner(event.target.files[0]);
            // console.log('>> uploadBanner', event.target.files[0])
            let url = URL.createObjectURL(event.target.files[0]);
            setDislayBanner(url);
        }
    };
    return (
        /*className="container mt-3"*/
        <div style={{ "display": "flex" }}>
            <Button color='black' name="Chi tiết" background="pink" width="fit-content" borderRadius="10.2em" fontWeight="bold" onClick={() => handleClick(props.biDanh)} />
            <NavLink end to={`/Admin/${props.biDanh}/showtimes`}>
                <Button margin="0px 4px" color='red' name="Lịch chiếu" background="pink" width="fit-content" borderRadius="10.2em" fontWeight="bold" />
            </NavLink>
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
                        {/* <Input type={isEdit ? "date" : "text"}
                                    value={isEdit ? formattedDate(detailMovie?.ngayKhoiChieu) : new Date(data.detailMovie?.ngayKhoiChieu).toDateString()}
                                    label="Khởi chiếu"
                                    name="ngayKhoiChieu"
                                    disabled={isEdit ? false : true}
                                    onChange={(event) => {
                                        validateAll(event)
                                        setDetailMovie({ ...detailMovie, ngayKhoiChieu: event.target.value })
                                    }
                                    }
                                    onClick={(event) => validateAll(event)}
                                /> */}
                        <div className="col-md-5">
                            {!isEdit ?
                                <Input type={"text"}
                                    value={new Date(data.detailMovie?.ngayKhoiChieu).toDateString()}
                                    label="Khởi chiếu"
                                    name="ngayKhoiChieu"
                                />
                                :
                                <div style={{ "padding": "15px 0px" }}>Khởi chiếu
                                    <input className="form-control"
                                        type="date"
                                        style={{
                                            "height": "25px",
                                            "width": "100%",
                                            "border": "1px solid lightgray",
                                            "boxShadow": "none",
                                        }}
                                        value={formattedDate(detailMovie?.ngayKhoiChieu)}
                                        label="Khởi chiếu"
                                        name="ngayKhoiChieu"
                                        min={formattedDate(Date())}
                                        disabled={false}
                                        onChange={(event) => {
                                            validateAll(event)
                                            setDetailMovie({ ...detailMovie, ngayKhoiChieu: event.target.value })
                                        }
                                        }
                                        onClick={(event) => validateAll(event)}
                                    />
                                </div>
                            }

                        </div>
                    </div>
                    <div >
                        Mô tả
                        <br />
                        <textarea className="col-md-12"
                            rows="4"
                            cols="100%"
                            disabled={isEdit ? false : true}
                            name="moTa"
                            value={detailMovie?.moTa}
                            onChange={(event) => {
                                setDetailMovie({ ...detailMovie, moTa: event.target.value })
                            }}
                        />
                        <span style={{ color: 'red' }}>{validationMsg?.moTa}</span>
                    </div>
                    <div className="row">
                        <div className="col-md-5">
                            <Input type={isEdit ? "hidden" : "text"}
                                value={data.detailMovie?.ngayKetThuc ? new Date(data.detailMovie?.ngayKetThuc).toDateString() : "Chưa có thông tin"}
                                label={!isEdit ? "Ngày kết thúc" : ""}
                                name="Ngày kết thúc" />
                        </div>
                        <div className="col-md-5">

                            <Input className="form-control"
                                type="number"
                                value={detailMovie?.thoiLuong}
                                onKeyDown={(e) => e.preventDefault()}
                                label="Thời lượng"
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
                    <div className="row">
                        <div className="col-md-5">
                            Thể loại
                            <Multiselect
                                disable={isEdit ? false : true}
                                isObject={false}
                                onRemove={(event) => {
                                    setDetailMovie({ ...detailMovie, "theLoai": event });
                                }}
                                onSelect={(event) => {
                                    setDetailMovie({ ...detailMovie, "theLoai": event });
                                }}
                                options={["Kinh dị", "Hài hước", "Lãng mạn", "Hành động", "Hoạt hình", "Viễn tưởng"]}
                                selectedValues={detailMovie.theLoai}
                                showCheckbox
                                hidePlaceholder
                                placeholder="Nhấp để chọn"
                            />
                        </div>
                        <div className="col-md-5">
                            Quốc gia
                            <Form.Select disabled={isEdit ? false : true} aria-label="Default select example" value={detailMovie?.quocGia} onChange={(e) => setDetailMovie({ ...detailMovie, "quocGia": e.target.value })}>
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
                        <div className="col-md-6">

                        </div>
                    </div>
                    <div className="row">

                        <div className="col-md-6">
                            {isEdit ?
                                <>
                                    <div>Hình ảnh</div>
                                    <input type="file" name="hinhAnh" onChange={(event) => { uploadImage(event) }} />
                                </>
                                :
                                <div>Hình ảnh</div>
                            }
                        </div>

                        <div className="col-md-6">
                            {isEdit ?
                                <>
                                    <div>Ảnh bìa</div>
                                    <input type="file" name="anhBia" onChange={(event) => { uploadBanner(event) }} />
                                </>
                                :
                                <div>Ảnh bìa</div>
                            }
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <img style={{ "margin-top": "8px" }} src={image || detailMovie?.hinhAnh} height="80px"></img>
                        </div>

                        <div className="col-md-6">
                            <img style={{ "margin-top": "8px" }} src={banner || detailMovie?.anhBia} height="80px"></img>
                            <div className="row">
                            </div>
                        </div>

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
                        isEdit ? (<div class="d-grid gap-2 col-6 mx-auto">
                            <Button color="white" background="green" name="Đồng ý" borderRadius="0.4em" disabled={Object.keys(validationMsg).length > 0} onClick={(e, movie) => handleEdit(e, movie)} />
                            <Button color="danger" name="Hủy" borderRadius="0.4em" onClick={initModal} />
                        </div>) : (
                            <div class="d-grid gap-2 col-6 mx-auto">
                                <Button color="black" background="yellow" name="Chỉnh sửa" borderRadius="0.4em" onClick={() => setIsEdit(true)} />
                                <Button color="danger" name="Hủy" borderRadius="0.4em" onClick={initModal} />
                            </div>
                        )
                    }
                </Modal.Footer>
            </Modal>
        </div >
    )
}
export default EditModalDialog