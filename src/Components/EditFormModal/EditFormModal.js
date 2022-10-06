import React, { useEffect, useContext } from "react";
import { StoreContext } from "../../Redux/Store/Store";
import { API_MOVIE } from "../../common/ApiController";
import { Modal } from 'react-bootstrap';
import { Button } from "../Button/Button";
import { Input } from "../Input/Input.js"
function EditModalDialog(props) {
    const [isShow, setInvokeModal] = React.useState(false)
    const [isEdit, setIsEdit] = React.useState(false)
    const store = useContext(StoreContext);


    const [biDanh, setBiDanh] = React.useState()
    console.log(">>biDanh", props.biDanh)
    console.log(">>show", isShow)
    const handleClick = (biDanh) => {
        setBiDanh(biDanh)
        setInvokeModal(true)
    }

    console.log(">> isEdit", isEdit)
    useEffect(() => {

        if (!biDanh) return

        fetch(API_MOVIE.DETAIL + biDanh)
            .then((res) => res.json())
            .then((dt) => {
                store.movie.DetailMovieDispatch({
                    type: "GETDETAILMOVIE",
                    payload: dt.data[0],
                });
            });
    }, [biDanh, isEdit]);
    let data = store.movie.DetailMovie;
    console.log(">>detailMovie", store.movie.DetailMovie.detailMovie?.tenPhim)
    const initModal = () => {
        setInvokeModal(!isShow)
        setBiDanh()
        setIsEdit(false)
    }
    return (
        <div className="container mt-3">
            <Button color='black' name="Detail" background="pink" width="fit-content" borderRadius="0.2em" fontWeight="bold" onClick={() => handleClick(props.biDanh)} />
            {/* 
            <Button variant="success" onClick={initModal}>
                Open Modal
            </Button> */}
            <Modal size="lg" show={isShow}>
                <Modal.Header closeButton onClick={initModal}>
                    <Modal.Title>CHI TIẾT PHIM</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input type="text"
                        value={data.detailMovie?.tenPhim}
                        label="Tên phim"
                        name="Tên phim" />
                    <Input type={isEdit ? "datetime-local" : "text"}
                        value={new Date(data.detailMovie?.ngayKhoiChieu).toDateString()}
                        label="Khởi chiếu"
                        name="Khởi chiếu"
                        disabled={isEdit ? false : true} />
                    Mô tả
                    <br />
                    <textarea
                        rows="4"
                        cols="76"
                        disabled={isEdit ? false : true}
                        value={data.detailMovie?.moTa} />
                    <Input type="text"
                        value={data.detailMovie?.ngayKetThuc ? new Date(data.detailMovie?.ngayKetThuc).toDateString() : "Chưa có thông tin"}
                        label="Ngày kết thúc"
                        name="Ngày kết thúc" />
                    <Input type="text"
                        value={data.detailMovie?.thoiLuong}
                        label="Thời lượng"
                        name="Thời lượng"
                        disabled={isEdit ? false : true} />
                    {isEdit ? <input type="file" /> : <div>Hình ảnh</div>}
                    <img src={data.detailMovie?.hinhAnh} height="80px"></img>
                    <Input type="number"
                        value={data.detailMovie?.danhGia}
                        label="Đánh giá"
                        name="Đánh giá" />
                    <Input type="number"
                        value={data.detailMovie?.soLuongBan}
                        label="Đã bán"
                        name="Đã bán" />
                    {/* <EditForm /> */}
                </Modal.Body>
                <Modal.Footer>
                    {
                        isEdit ? (<><Button color="white" background="green" name="Đồng ý" onClick={initModal} />
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