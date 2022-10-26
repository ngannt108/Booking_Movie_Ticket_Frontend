import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import './ModalSignInPopUp.css'

export default function ModalPopUp(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  
  const navigateSignIn = () =>{
    navigate("/SignIn");
  }

  return (
    <>
      <Button className='time' onClick={handleShow}>
       {props.info}
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
            Sorry but you haven't signed in yet. Please sign in before booking ticket for the movie!
        </Modal.Body>
        <Modal.Footer>
        <Button variant="danger" onClick={navigateSignIn}>
            Go to Log In
          </Button>
          <Button variant="secondary" onClick={handleClose}>
           Later
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}