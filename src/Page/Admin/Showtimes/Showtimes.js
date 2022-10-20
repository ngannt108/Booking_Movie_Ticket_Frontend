import HeaderAdmin from "../Header/HeaderAdmin";
import { useParams } from "react-router-dom";
import React, { useState } from 'react';
import { API_MOVIE, API_THEATERS } from "../../../common/ApiController";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect } from "react";
import { useContext } from "react";
import { StoreContext } from "../../../Redux/Store/Store";

export default function Showtimes() {
    let slug = useParams()
    console.log(">> bis Danh:", slug)
    const store = useContext(StoreContext);
    const [expandedRows, setExpandedRows] = useState([]);
    const [temp, setTemp] = useState();

    const [expandState, setExpandState] = useState({});


    const handleEpandRow = (event, theaterId) => {
        const currentExpandedRows = expandedRows;
        const isRowExpanded = currentExpandedRows.includes(theaterId);

        let obj = {};
        isRowExpanded ? (obj[theaterId] = false) : (obj[theaterId] = true);
        setExpandState(obj);

        // If the row is expanded, we are here to hide it. Hence remove
        // it from the state variable. Otherwise add to it.
        const newExpandedRows = isRowExpanded ?
            currentExpandedRows.filter(id => id !== theaterId) :
            currentExpandedRows.concat(theaterId);

        setExpandedRows(newExpandedRows);


        // const newTemp = isRowExpanded ?
        // movieDetail?.lichChieu?.forEach(item => {

        //     if (item.tenCumRap._id == theaterId) {

        //     }}) :
        //     currentExpandedRows.concat(theaterId);

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
    return (
        <>
            <HeaderAdmin />
            <div className="general">
                <div className="vertical-menu">
                    <a href="#" className="active">Tất cả phim</a>
                    <a href="#" >Tạo phim mới</a>
                    <a href="#">Phim được yêu thích</a>
                </div>
                {/* <div style={{ "marginLeft": "40px" }} className="container mt-4">
                    <form>
                        <div style={{ "textAlign": "center", "width": "980px" }}><label >LỊCH CHIẾU CỦA PHIM: tenPhim</label></div>

                        <div className="row">
                            <div className="col-md-2">
                                RẠP
                            </div>
                            <div className="col-md-4">
                                LỊCH CHIẾU
                            </div>
                        </div>

                        <div className="row">

                        </div>

                    </form>
                </div> */}

                <Container>
                    <Row>
                        <Col>
                            THONG TIN PHIM: tenphim
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <Table responsive variant="info ">
                                <thead>
                                    <tr>
                                        <th>TEN CUM RAP</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        {/* <th>Last Name</th>
                                        <th>e-mail</th>
                                        <th>Gender</th>
                                        <th>Details</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        theaters?.map((theater) =>
                                            <>
                                                <tr key={theater._id}>
                                                    <td>
                                                        {theater.tenCumRap}
                                                    </td>
                                                    <td>
                                                        <Button
                                                            variant="link"
                                                            onClick={event => handleEpandRow(event, theater._id)}>
                                                            {
                                                                expandState[theater._id] ?
                                                                    'Hide' : 'Show'
                                                            }
                                                        </Button>
                                                    </td>
                                                </tr>
                                                <>
                                                    {
                                                        expandedRows.includes(theater._id) ?
                                                            <tr>
                                                                {/* colspan="6" */}
                                                                <td>
                                                                    <div style={{ backgroundColor: '#343A40', color: '#FFF', padding: '10px' }}>

                                                                        {console.log(">> movieDetail", movieDetail.lichChieu)}

                                                                        {

                                                                            movieDetail?.lichChieu?.map(item => {

                                                                                if (item.tenCumRap._id == theater._id) {
                                                                                    console.log(">> theater._id", theater._id)
                                                                                    console.log(">> item.tenCumRap._id", item.tenCumRap._id)
                                                                                    console.log(">> item.tenRap.tenRap", item.tenRap.tenRap)

                                                                                    return (
                                                                                        <><h5>{item.tenRap.tenRap}</h5>
                                                                                            <li>
                                                                                                <span><b>Ngày chiếu:</b></span> {' '}
                                                                                                <span> {item.ngayChieu}</span>
                                                                                            </li>
                                                                                            <li>
                                                                                                <span><b>Giờ kết thúc:</b></span> {' '}
                                                                                                <span> {item.gioKetThuc}</span>
                                                                                            </li>
                                                                                            <li>
                                                                                                <span><b>Thời lượng:</b></span> {' '}
                                                                                                <span> {item.thoiLuong} phút</span>
                                                                                            </li>
                                                                                            <li>
                                                                                                <span><b>Giá vé:</b></span> {' '}
                                                                                                <span> {item.giaVe} VNĐ</span>
                                                                                            </li>
                                                                                            <li>
                                                                                                <span><b>Ghế:</b></span> {' '}
                                                                                                <span> {item.gheDaChon.length}/80</span>
                                                                                            </li>

                                                                                        </>
                                                                                    )

                                                                                }

                                                                            })


                                                                        }
                                                                        <th>{ }</th>
                                                                        <ul>
                                                                            {/* <li>
                                                                            <span><b>Full Name:</b></span> {' '}
                                                                            <span> {user['first_name']} {' '} {user['last_name']} </span>
                                                                        </li>
                                                                        <li>
                                                                            <span><b>Company:</b></span> {' '}
                                                                            <span> {user.company} </span>
                                                                        </li>
                                                                        <li>
                                                                            <span><b>Department:</b></span> {' '}
                                                                            <span> {user.department} </span>
                                                                        </li>
                                                                        <li>
                                                                            <span><b>Ip:</b></span> {' '}
                                                                            <span> {user['ip_address']} </span>
                                                                        </li>
                                                                        <li>
                                                                            <span><b>Best Movie:</b></span> {' '}
                                                                            <span> {user.movies} </span>
                                                                        </li>
                                                                        <li>
                                                                            <span><b>About:</b></span> {' '}
                                                                            <span> {user.about} </span>
                                                                        </li> */}
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr> : null
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