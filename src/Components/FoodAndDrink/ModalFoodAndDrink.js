import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import "./ModalFoodAndDrink.css";

export default function ModalFoodAndDrink() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const navigateFnD = () => {
    navigate("/Payment");
  };

  return (
    <>
      <Button className="booking-btn" onClick={handleShow}>
        Payment
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Đồ ăn và nước uống</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn chọn thêm đồ ăn và nước uống không?</Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={navigateFnD}>
            Có
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Không
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
