import React, { useEffect, useContext } from "react";
import { StoreContext } from "../../../Redux/Store/Store";
import { API_MOVIE } from "../../../common/ApiController";
import "./Menu.css";
import HeaderAdmin from "../Header/HeaderAdmin";
import "./MovieManage.css"
import { Button } from "../../../Components/Button/Button";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import EditModalDialog from "../../../Components/EditFormModal/EditFormModal";


export default function AllMovies() {
  const store = useContext(StoreContext);


  const [biDanh, setBiDanh] = React.useState()
  const [isShow, setShow] = React.useState()
  console.log(">>ID in AllMovies", biDanh)
  const handleClick = (biDanh) => {
    setBiDanh(biDanh)
    setShow(!isShow)
  }

  useEffect(() => {
    fetch(API_MOVIE.COMING)
      .then((res) => res.json())
      .then((dt) => {
        store.lsComingMovie.ComingMovieDispatch({
          type: "GETCOMINGMOVIE",
          payload: dt.data,
        });
      });
  }, []);

  return (
    <>
      <HeaderAdmin />
      <div className="general">
        <div className="vertical-menu">
          <a href="#" className="active">Tất cả phim</a>
          <a href="#">Tạo phim mới</a>
          <a href="#">Phim được yêu thích</a>
        </div>

        <div className="container-body">
          <table className="layout display responsive-table">
            <thead>
              <tr>
                <th>Số thứ tự</th>
                <th>Tên phim</th>
                <th>Hình ảnh</th>
                <th colSpan={2}>Mô tả</th>
              </tr>
            </thead>
            <tbody>
              {store.lsComingMovie.ComingMovie.lsComingMovie?.map((item, index) => (
                <tr>
                  <td className="organisationname number">{index + 1}</td>
                  <td width="250px" className="organisationname">{item.tenPhim}</td>
                  <td className="organisationname image"><img height="60px" width="50px" src={item.hinhAnh} /></td>
                  <td width="900px" className="organisationname">{item.moTa}</td>

                  <td width="250px" className="actions">

                    <Button color='black' name="Detail" background="pink" width="fit-content" borderRadius="0.2em" fontWeight="bold" onClick={() => handleClick(item.biDanh)} />
                    <Button margin="0px 4px" color='green' name="Edit" background="pink" width="fit-content" borderRadius="0.2em" fontWeight="bold" />
                    <Button margin="0px 4px" color='red' name="Remove" background="pink" width="fit-content" borderRadius="0.2em" fontWeight="bold" />
                    {/* <a href="?" className="edit-item" title="Edit">Edit</a> ||
                 <a href="?" className="remove-item" title="Remove">Remove</a> */}
                  </td>

                </tr>
              ))
              }
            </tbody>
          </table>


          <EditModalDialog biDanh={biDanh} show={isShow} />
        </div>
      </div>
    </>
  )
}