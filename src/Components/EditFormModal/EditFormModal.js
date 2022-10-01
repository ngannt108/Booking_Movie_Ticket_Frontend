import React, { useEffect, useContext } from "react";
import { StoreContext } from "../../Redux/Store/Store";
import { API_MOVIE } from "../../common/ApiController";
import { Modal, Button } from 'react-bootstrap'
import { Input } from "../Input/Input.js"
function EditModalDialog(props) {
    const [isShow, setInvokeModal] = React.useState(props.show)
    const store = useContext(StoreContext);

    console.log(">>id", props.biDanh)
    console.log(">>show", props.show)

    useEffect(() => {
        fetch(API_MOVIE.DETAIL + props.biDanh)
            .then((res) => res.json())
            .then((dt) => {
                store.movie.DetailMovieDispatch({
                    type: "GETDETAILMOVIE",
                    payload: dt.data[0],
                });
            });
    }, [props.biDanh]);
    console.log(">>detailMovie", store.movie.DetailMovie.detailMovie?.tenPhim)
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
                    <Input type="text"
                        value={store.movie.DetailMovie.detailMovie?.tenPhim}
                        label="Name"
                        name="name" />
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
export default EditModalDialog