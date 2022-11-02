import React, { useEffect, useContext, useState } from "react";
import { StoreContext } from "../../../Redux/Store/Store";
import { API_MOVIE } from "../../../common/ApiController";
import "./Menu.css";
import "./MovieManage.css";
import { Button } from "../../../Components/Button/Button";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import EditModalDialog from "../../../Components/Admin/EditFormModal/EditFormModal";
import { List } from 'react-content-loader'

export default function AllMovies() {
  const store = useContext(StoreContext);
  const [biDanh, setBiDanh] = useState();
  const [isShow, setShow] = useState(false);
  const [isComing, setIsComing] = useState(true);
  console.log(">>ID in AllMovies", biDanh);
  const handleClick = (biDanh) => {
    setBiDanh(biDanh);
    setShow(isShow);
  };

  useEffect(() => {
    if (isComing) {
      //let data = store.lsShowingMovie.ShowingMovie.lsShowingMovie
      fetch(API_MOVIE.COMING)
        .then((res) => res.json())
        .then((dt) => {
          store.lsComingMovie.ComingMovieDispatch({
            type: "GETCOMINGMOVIES",
            payload: dt.data,
          });
        });

    }
    else {
      fetch(API_MOVIE.SHOWING)
        .then((res) => res.json())
        .then((dt) => {
          store.lsShowingMovie.ShowingMovieDispatch({
            type: "GETSHOWINGMOVIES",
            payload: dt.data,
          });
        });

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComing]);

  let movies = isComing
    ? store.lsComingMovie.ComingMovie?.listMovie
    : store.lsShowingMovie.ShowingMovie?.listMovie;
  console.log(">> MOVIES", movies);
  if (movies) {
    return (
      <>
        <div className="general">
          <div className="container-body">
            <div className="row">
              <div className="col-md-4">
                <Button
                  width="160px"
                  height="40px"
                  name="Phim sắp chiếu"
                  onClick={() => setIsComing(true)}
                />
              </div>
              <div className="col-md-4">
                <Button
                  width="160px"
                  height="40px"
                  name="Phim đang chiếu"
                  onClick={() => setIsComing(false)}
                />
              </div>
            </div>

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
                {movies.map((item, index) => (
                  <tr key={index}>
                    <td className="organisationname number">{index + 1}</td>
                    <td width="250px" className="organisationname">
                      {item.tenPhim}
                    </td>
                    <td className="organisationname image">
                      <img height="80px" width="60px" src={item.hinhAnh} alt="" />
                    </td>
                    <td width="900px">
                      <div className="organisationname-description">
                        {item.moTa}
                      </div>
                    </td>

                    <td width="250px" className="actions">
                      <EditModalDialog biDanh={item.biDanh} show={false} />

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
  else {
    return (
      // <div style={{ padding: "48px" }}>
      <List style={{ padding: "48px" }} />
      //</div>
    )
  }

}
