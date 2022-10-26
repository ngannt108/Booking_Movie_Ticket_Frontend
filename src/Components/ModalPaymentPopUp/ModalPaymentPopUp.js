import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import './ModalPaymentPopUp.css'

export default function ModalPaymentPopUp(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const navigatePayment = () =>{
    navigate("/Payment");
  }

  return (
    <>
      <Button className='booking-btn' onClick={handleShow}>
        Payment
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Bạn có muốn thanh toán?
        </Modal.Body>
        <Modal.Footer>
        <Button variant="warning" onClick={navigatePayment}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Later
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}