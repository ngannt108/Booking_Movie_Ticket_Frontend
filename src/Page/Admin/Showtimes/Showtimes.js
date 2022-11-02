import HeaderAdmin from "../Header/HeaderAdmin";
import { NavLink, useParams } from "react-router-dom";
import React, { useState } from 'react';
import { API_MOVIE, API_THEATERS } from "../../../common/ApiController";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import './Showtime.css'
import { useEffect } from "react";
import { useContext } from "react";
import { StoreContext } from "../../../Redux/Store/Store";
import AddShowtimeModalDialog from "../../../Components/Admin/AddShowtimeModal/AddShowtimeModal";
import { Button } from "../../../Components/Button/Button";
import swal from "sweetalert";
import AddShowtimeModalDialog2 from "../../../Components/Admin/AddShowtimeModal/AddShowtimeModal2";

export default function Showtimes() {
    let slug = useParams()
    const store = useContext(StoreContext);
    const [expandedRows, setExpandedRows] = useState([]);
    const [temp, setTemp] = useState();

    const [expandState, setExpandState] = useState({});

    const handleExpandRow = (event, theaterId) => {
        const currentExpandedRows = expandedRows;
        const isRowExpanded = currentExpandedRows.includes(theaterId);
        let obj = {};
        isRowExpanded ? (obj[theaterId] = false) : (obj[theaterId] = true);
        setExpandState(obj);
        const newExpandedRows = isRowExpanded ?
            currentExpandedRows.filter(id => id !== theaterId) :
            currentExpandedRows.concat(theaterId);

        setExpandedRows(newExpandedRows);
        setExpandedRows(newExpandedRows);
    }
    useEffect(() => {
        fetch(API_THEATERS.THEATERS)
            .then((res) => res.json())
            .then((dt) => {
                store.lsTheater.TheaterDispatch({
                    type: "GETTHEATERS",
                    payload: dt.data,
                });
            });

    }, []);

    useEffect(() => {
        if (!slug) return
        fetch(API_MOVIE.DETAIL + slug.slug)
            .then((res) => res.json())
            .then((dt) => {
                store.movie.DetailMovieDispatch({
                    type: "GETDETAILMOVIE",
                    payload: dt.data[0],
                });
            });

    }, [temp]);
    const theaters = store.lsTheater.Theater?.lsTheater
    const movieDetail = store.movie?.DetailMovie?.detailMovie
    const handleDelete = () => {
        swal("Bạn chắc chắn muốn xóa suất chiếu này?", {
            buttons: {
                cancel: "Hủy",
                confirm: "Đồng ý",
            },
        })
            .then((value) => {
                switch (value) {
                    case "Hủy":
                        break;
                    default:

                        swal("Got away safely!");
                }
            });
    }
    // const DeleteShowtimeAction = () => {
    //     fetch("http://localhost:5000/admin/movie/" + props.slug + "/showtime/" + , {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //           "Content-Type": "application/json",
    //         },
    //         method: "POST",
    //         body: JSON.stringify({
    //           ngayChieu: formatDateTime,
    //           tenRap: detailShowtime.tenRap,
    //           tenCumRap: props.clusterID,
    //           giaVe: "70000",
    //         }),
    //       })
    //         .then((res) => {
    //           if (res.status == 201) {
    //             swal({
    //               title: "Thêm lịch chiếu thành công",
    //               text: "",
    //               icon: "success",
    //             });
    //             setTimeout(function () {
    //               window.location.reload();
    //             }, 1000);
    //           } else return res.json();
    //         })
    //         .then((response) => {
    //           if (response != true)
    //             return swal({
    //               title: "Thêm lịch chiếu thất bại",
    //               text: response.error,
    //               icon: "error",
    //             });
    //         });
    // }
    return (
        <>
            <div className="general" style={{ marginLeft: "40px", width: "100%" }}>
                <Container>
                    <Row>
                        <Col style={{ color: "white" }}>
                            THÔNG TIN PHIM - {movieDetail?.tenPhim}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <Table responsive variant="info ">
                                <thead>
                                    <tr>
                                        <th>TÊN CỤM RẠP</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        theaters?.map((theater) =>
                                            <>
                                                <tr key={theater._id}>
                                                    <td width={"20%"}>
                                                        {theater.tenCumRap}
                                                    </td>
                                                    <td>
                                                        <div style={{ "display": "flex" }}>
                                                            {
                                                                expandState[theater._id] ?
                                                                    <Button
                                                                        color='rgb(31, 166, 245)'
                                                                        name="Thu gọn"
                                                                        background="pink"
                                                                        width="fit-content"
                                                                        borderRadius="10.2em"
                                                                        fontWeight="bold"
                                                                        onClick={event => handleExpandRow(event, theater._id)} />
                                                                    :
                                                                    <Button
                                                                        color='red'
                                                                        name="Hiển thị"
                                                                        background="pink"
                                                                        width="fit-content"
                                                                        borderRadius="10.2em"
                                                                        fontWeight="bold"
                                                                        onClick={event => handleExpandRow(event, theater._id)} />
                                                            }
                                                            <AddShowtimeModalDialog2
                                                                clusterName={theater.tenCumRap}
                                                                clusterID={theater._id}
                                                                slug={slug.slug} show={false} />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <>
                                                    {
                                                        expandedRows.includes(theater._id) &&
                                                        <tr>
                                                            <td></td>
                                                            {/* colspan="6" */}
                                                            <td>
                                                                {
                                                                    <div className="showtime-admin">
                                                                        {
                                                                            movieDetail?.lichChieu?.map(item => {

                                                                                if (item.tenCumRap._id == theater._id) {
                                                                                    console.log(">> item", item)
                                                                                    if (item)
                                                                                        return (

                                                                                            <><h5>{item.tenRap.tenRap}</h5>
                                                                                                <div className="row">
                                                                                                    <div className="col-md-5">
                                                                                                        <li>
                                                                                                            <span>
                                                                                                                <b>Ngày chiếu:</b>
                                                                                                            </span> {' '}
                                                                                                            <span>
                                                                                                                {new Date(item.ngayChieu).toLocaleString()}
                                                                                                            </span>
                                                                                                        </li>
                                                                                                    </div>
                                                                                                    <div className="col-md-4">
                                                                                                        <li>
                                                                                                            <span><b>Thời lượng:</b></span> {' '}
                                                                                                            <span> {movieDetail?.thoiLuong} phút</span>
                                                                                                        </li>
                                                                                                    </div>

                                                                                                </div>
                                                                                                <div className="row">

                                                                                                    <div className="col-md-5">
                                                                                                        <li>
                                                                                                            <span><b>Giờ kết thúc:</b></span> {' '}
                                                                                                            <span>
                                                                                                                {new Date(item.gioKetThuc).toLocaleString()}
                                                                                                            </span>
                                                                                                        </li>
                                                                                                    </div>
                                                                                                    <div className="col-md-4">
                                                                                                        <li>
                                                                                                            <span><b>Giá vé:</b></span> {' '}
                                                                                                            <span>
                                                                                                                {item.giaVe.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                                                                                                / ghế
                                                                                                            </span>
                                                                                                        </li>
                                                                                                    </div>
                                                                                                    <div className="col-md-4">
                                                                                                        <li>
                                                                                                            <span><b>Ghế:</b></span> {' '}
                                                                                                            <span> {item.gheDaChon.length}/80
                                                                                                                <Button
                                                                                                                    color='white' name="Xóa"
                                                                                                                    background="rgb(31, 166, 245)"
                                                                                                                    width="fit-content" borderRadius="10.2em"
                                                                                                                    fontWeight="bold"
                                                                                                                    onClick={e => handleDelete(e)} /></span>
                                                                                                        </li>
                                                                                                    </div>
                                                                                                </div>

                                                                                            </>
                                                                                        )
                                                                                }
                                                                            })
                                                                        }
                                                                    </div>
                                                                }
                                                            </td>
                                                        </tr>
                                                    }
                                                </>
                                            </>
                                        )}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div >
        </>
    )
}