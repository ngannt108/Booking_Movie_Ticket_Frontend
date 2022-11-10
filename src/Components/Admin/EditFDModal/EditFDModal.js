import React, { useEffect, useContext, useState, useRef } from "react";
import { StoreContext } from "../../../Redux/Store/Store";
import { API_FOODDRINKS, API_MOVIE } from "../../../common/ApiController";
import { Card, Modal } from "react-bootstrap";
import { FloatingLabel } from 'react-bootstrap';
import { Button } from "../../Button/Button";
import swal from "sweetalert";
import { NavLink } from "react-router-dom";
import { Col, Form, Row } from "react-bootstrap";
import { Multiselect } from "multiselect-react-dropdown";
import { useNavigate } from "react-router-dom";
import { List } from 'react-content-loader'

function EditFDModal(props) {
    const [isShow, setInvokeModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const store = useContext(StoreContext);
    const [image, setDisplayImage] = useState();
    const [fileImage, setFileImage] = useState("");
    const [banner, setDislayBanner] = useState();
    const [fileBanner, setFileBanner] = useState("");
    const [biDanh, setBiDanh] = useState();
    const [loading, setLoading] = useState(true);
    const [isInvalid, setInvalid] = useState(false);

    const navigate = useNavigate()
    let emptyFD = {
        tenCombo: "",
        moTa: "",
        ghiChu: "",
        giaGoc: "",
        hinhAnh: "",
        giamGia: "",
        soLuongBan: ""
    };
    const [detailFD, setDetailFD] = useState(emptyFD);
    const handleClick = (biDanh) => {
        setBiDanh(biDanh);
        setInvokeModal(true);
    };
    var data;
    useEffect(() => {
        setLoading(true)
        if (!biDanh) return;
        fetch(API_FOODDRINKS.DETAIL + biDanh)
            .then((res) => res.json())
            .then((dt) => {
                store.fooddrinks.GetDetailFDDispatch({
                    type: "GETDETAILFOODDRINK",
                    payload: dt.data[0],
                });
                setDetailFD({
                    tenCombo: dt.data?.tenCombo,
                    moTa: dt.data?.moTa,
                    ghiChu: dt.data?.ghiChu,
                    giaGoc: dt.data?.giaGoc.toString(),
                    hinhAnh: dt.data?.hinhAnh,
                    giamGia: dt.data?.giamGia.toString(),
                    soLuongBan: dt.data?.soLuongBan.toString()
                });

                setLoading(false)
            });
        console.log(">> update slug")
    }, [biDanh, isEdit]);

    data = store.fooddrinks?.DetailFD;
    console.log("> editFD", data.detailFD)
    console.log("> detailFD", detailFD)
    console.log(">> slug", biDanh)
    const [validated, setValidated] = useState(false);
    const initModal = () => {
        setInvokeModal(!isShow);
        setBiDanh();
        setIsEdit(false);
        setDetailFD(emptyFD);
        setDisplayImage();
    };
    const checkValid = (event) => {
        const form = event.target;
        if (form.checkValidity() === false) {
            event.preventDefault();
            setInvalid(true)
            //   event.stopPropagation();
        }
        else setInvalid(false)
    };

    const UpdateMovieAction = async (e) => {
        setValidated(true);
        e.preventDefault();
        const fd = new FormData();
        if (fileImage != null && fileImage != "")
            fd.append("hinhAnh", fileImage, fileImage.name);
        if (fileBanner != null && fileBanner != "")
            fd.append("anhBia", fileBanner, fileBanner.name);
        for (let keyOfObj in detailFD) {
            fd.append(keyOfObj, detailFD[keyOfObj]);
        }

        const token = JSON.parse(sessionStorage.getItem("token"));
        let res = await fetch(API_MOVIE.UPDATE + biDanh, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: "PUT",
            body: fd,
        });
        if (res.status === 200) {
            swal({
                title: "Cập nhật thành công!",
                text: "",
                icon: "success",
                buttons: true,
            });
            setIsEdit(false)
            setTimeout(function () {
                navigate(0)
            }, 1000);
        } else
            swal({
                title: "Cập nhật thất bại",
                text: "Hãy thử lại",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });

    };
    const handleEdit = async (e, movie) => {
        UpdateMovieAction(e);
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

    return (<div style={{ display: "flex" }}>
        <Button
            color="black"
            name="Chi tiết"
            background="pink"
            width="fit-content"
            borderRadius="10.2em"
            fontWeight="bold"
            onClick={() => handleClick(props.biDanh)}
        />
        <NavLink end to={''}>
            <Button
                margin="0px 4px"
                color="red"
                name="Xóa"
                background="pink"
                width="fit-content"
                borderRadius="10.2em"
                fontWeight="bold"
            />
        </NavLink>
        <Form id="edit-form" style={{ maxWidth: "800px" }} noValidate validated={validated} onSubmit={handleEdit}>
            <Modal size="lg" show={isShow}>
                <Modal.Header closeButton onClick={initModal}>
                    {isEdit ? (<Modal.Title>CHỈNH SỬA COMBO</Modal.Title>)
                        : (<Modal.Title>CHI TIẾT COMBO</Modal.Title>
                        )}
                </Modal.Header>
                {!loading ?
                    <Modal.Body>
                        <div style={{ background: "white", maxWidth: "800px" }}>
                            <Form style={{ maxWidth: "800px" }} noValidate validated={validated} onSubmit={handleEdit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Tên combo"
                                            className="mb-3"
                                        >
                                            <Form.Control

                                                required
                                                type="text"
                                                value={detailFD?.tenCombo}
                                                readOnly={!isEdit}
                                                disabled={isEdit}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>

                                </Row>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Mô tả</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        value={detailFD?.moTa}
                                        disabled={!isEdit}
                                        onChange={(event) => {
                                            setDetailFD({ ...detailFD, moTa: event.target.value });
                                        }}
                                    />

                                </Form.Group>
                                <Row className="mb-3">

                                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Đã bán"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="number"
                                                min={0} value={detailFD?.soLuongBan}
                                                required
                                                readOnly
                                            />
                                        </FloatingLabel>
                                    </Form.Group>

                                </Row>
                                <Row className="mb-3">
                                    <Form.Group style={{ width: '18rem' }} controlId="validationCustom05">
                                        <Form.Label>Hình ảnh</Form.Label>
                                        <Form.Control type="file"
                                            name="image"
                                            onChange={(event) => {
                                                uploadImage(event);
                                            }}
                                        />
                                        <Card style={{ alignItems: 'center' }} >
                                            <Card.Img style={{ maxHeight: '8rem', maxWidth: 'fit-content' }} variant="top" src={image || detailFD?.hinhAnh} />
                                        </Card>
                                    </Form.Group>

                                </Row>
                                {/* <Form.Group className="mb-3">
                                <Form.Group as={Col} md="3" controlId="validationCustom05">

                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid zip.
                                    </Form.Control.Feedback>

                                </Form.Group>
                                <Card style={{ width: '8rem', height: "2rem" }}>
                                    <Card.Img variant="top" src={image || detailFD?.hinhAnh} />
                                    <Card.Body>
                                        <Card.Title>Ảnh bìa</Card.Title>
                                        <Card.Text>
                                            <Form.Control type="file" required />
                                        </Card.Text>

                                    </Card.Body>
                                </Card>

                            </Form.Group>
 */}

                            </Form>
                        </div>

                        {/* <EditForm /> */}
                    </Modal.Body>
                    :
                    <List style={{ padding: "16px" }} />
                }

                <Modal.Footer>
                    {isEdit ? (
                        <div class="d-grid gap-2 col-6 mx-auto">
                            <Button
                                color="white"
                                background="green"
                                name="Đồng ý"
                                borderRadius="0.4em"
                                disabled={isInvalid}
                                onClick={(e, movie) => handleEdit(e, movie)}
                            />
                            <Button
                                color="danger"
                                name="Hủy"
                                borderRadius="0.4em"
                                onClick={initModal}
                            />
                        </div>
                    ) : (
                        <div class="d-grid gap-2 col-6 mx-auto">
                            <Button
                                color="black"
                                background="yellow"
                                name="Chỉnh sửa"
                                borderRadius="0.4em"
                                onClick={() => setIsEdit(true)}
                            />
                            <Button
                                color="danger"
                                name="Hủy"
                                borderRadius="0.4em"
                                onClick={initModal}
                            />
                        </div>
                    )}
                </Modal.Footer>
            </Modal>
        </Form>
    </div >)
}
/*className="container mt-3"*/
export default EditFDModal;
