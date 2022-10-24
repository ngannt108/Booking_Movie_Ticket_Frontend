import React, { useEffect, useContext } from "react";
import { StoreContext } from "../../../Redux/Store/Store";
import { API_MOVIE } from "../../../common/ApiController";
import "./Menu.css";
import HeaderAdmin from "../Header/HeaderAdmin";
import "./MovieManage.css";
import { Button } from "../../../Components/Button/Button";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import EditModalDialog from "../../../Components/Admin/EditFormModal/EditFormModal";
import { Link, NavLink } from "react-router-dom";

export default function AllMovies() {
  const store = useContext(StoreContext);

  const [biDanh, setBiDanh] = React.useState();
  const [isShow, setShow] = React.useState(false);
  const [isComing, setIsComing] = React.useState(true);
  console.log(">>ID in AllMovies", biDanh);
  const handleClick = (biDanh) => {
    setBiDanh(biDanh);
    setShow(isShow);
  };

  useEffect(() => {
    if (isComing)
      //let data = store.lsShowingMovie.ShowingMovie.lsShowingMovie
      fetch(API_MOVIE.COMING)
        .then((res) => res.json())
        .then((dt) => {
          store.lsComingMovie.ComingMovieDispatch({
            type: "GETCOMINGMOVIES",
            payload: dt.data,
          });
        });
    else
      fetch(API_MOVIE.SHOWING)
        .then((res) => res.json())
        .then((dt) => {
          store.lsShowingMovie.ShowingMovieDispatch({
            type: "GETSHOWINGMOVIES",
            payload: dt.data,
          });
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComing]);

  let movies = isComing
    ? store.lsComingMovie.ComingMovie?.listMovie
    : store.lsShowingMovie.ShowingMovie?.listMovie;
  console.log(">> MOVIES", movies);
  return (
    <>
      <HeaderAdmin />
      <div className="general">
        <div className="vertical-menu">
          <Link to="#" className="active">
            Tất cả phim
          </Link>
          <NavLink end to="/Admin/movie">
            Tạo phim mới
          </NavLink>
          <Link to="#">Phim được yêu thích</Link>
        </div>

        <div className="row">
          <div className="col-md-4">
            <Button
              width="60px"
              name="Phim sắp chiếu"
              onClick={() => setIsComing(true)}
            />
          </div>
          <div className="col-md-4">
            <Button
              width="60px"
              name="Phim đang chiếu"
              onClick={() => setIsComing(false)}
            />
          </div>
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
              {movies?.map((item, index) => (
                <tr>
                  <td className="organisationname number">{index + 1}</td>
                  <td width="250px" className="organisationname">
                    {item.tenPhim}
                  </td>
                  <td className="organisationname image">
                    <img height="60px" width="50px" src={item.hinhAnh} alt="" />
                  </td>
                  <td width="900px" className="organisationname">
                    {item.moTa}
                  </td>

                  <td width="250px" className="actions">
                    <EditModalDialog biDanh={item.biDanh} show={false} />

                    {/* <Button color='black' name="Detail" background="pink" width="fit-content" borderRadius="0.2em" fontWeight="bold" onClick={() => handleClick(item.biDanh)} /> */}

                    {/* <a href="?" className="edit-item" title="Edit">Edit</a> ||
                 <a href="?" className="remove-item" title="Remove">Remove</a> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
