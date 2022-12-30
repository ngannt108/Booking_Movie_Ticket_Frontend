import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import "./ModalPaymentPopUp.css";
import { API_BOOKING } from "../../Common/ApiController";

export default function ModalPaymentPopUp(props) {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const navigatePayment = async () => {
    let token = JSON.parse(localStorage.getItem("token"));
    let res = await fetch(API_BOOKING.IS_CHOOSING_CHAIRS, {
      headers: {
        //Nó sẽ nói cho sever biết, web này sẽ gởi giá trị đi là json
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
      method: "POST",
      body: JSON.stringify({
        maLichChieu: props.maLichChieu,
        gheDangChon: props.gheDangChon,
      }),
    });
    console.log(res.status);
    navigate("/Payment");
  };

  return (
    <>
      <Button className="booking-btn" onClick={() => setShow(true)}>
        Đặt vé
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Đặt vé</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn đặt vé?</Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => navigatePayment()}>
            Có
          </Button>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Không
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
