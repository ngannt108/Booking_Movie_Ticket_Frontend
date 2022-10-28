import React, { useState, useContext } from "react";
import { StoreContext } from "../../Redux/Store/Store";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import Store from "../../Redux/Store/Store";
import "./ModalBookingPopUp.css";

export default function ModalPopUp(props) {
  const store = useContext(StoreContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const navigateBooking = () => {
    store.bookingRoom.BookingDispatch({
      type: "BOOKING",
      payload: { info: props.info, showtime: props.showtimeDetail },
    });
    navigate("/Booking");
  };

  return (
    <>
      <Button className="time" onClick={handleShow}>
        {props.info[2]}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có muốn đặt vé xem phim {props.info[1]} vào lúc {props.info[2]}{" "}
          ngày {props.info[3]} tại {props.info[0]} không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={navigateBooking}>
            Yes, choose seat
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
