import React from 'react'
import { Modal, Button } from 'react-bootstrap'

function ModalDialog() {
    const [isShow, setInvokeModal] = React.useState(false)


    const initModal = () => {
        return setInvokeModal(!isShow)
    }
    return (
        <div className="container mt-3">
            <Button variant="success" onClick={initModal}>
                Open Modal
            </Button>
            <Modal show={isShow}>
                <Modal.Header closeButton onClick={initModal}>
                    <Modal.Title>React Modal Popover Example</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    yyyyy
                    {/* <EditForm /> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={initModal}>
                        Close
                    </Button>
                    <Button variant="dark" onClick={initModal}>
                        Store
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default ModalDialog