import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import "./ModalPaymentPopUp.css";

export default function ModalPaymentPopUp() {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const navigatePayment = () => {
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
