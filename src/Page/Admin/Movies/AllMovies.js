import React, { useEffect, useContext, useState } from "react";
import { StoreContext } from "../../../Redux/Store/Store";
import { API_MOVIE } from "../../../common/ApiController";
import "./Menu.css";
import "./MovieManage.css";
import { Button } from "../../../Components/Button/Button";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import { FixedSizeList } from 'react-window';
import { List } from "react-content-loader";
import ItemMovie from "../../../Components/Admin/ItemMovie/ItemMovie";
import ReactTable from "react-table";
export default function AllMovies() {
  const store = useContext(StoreContext);
  const [biDanh, setBiDanh] = useState();
  const [isComing, setIsComing] = useState(true);

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
    } else {
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
  // console.log(">> MOVIES", movies);
  if (movies) {
    return (
      <>
        <div>
          <div style={{ padding: "0em 3em 3em 3em" }}>
            <div className="row">
              <div className="col-md-4">
                <button
                  className="button-custom no"
                  disabled={isComing ? true : false}
                  width="160px"
                  height="40px"
                  name="Phim sắp chiếu"
                  onClick={() => setIsComing(true)}
                >
                  Phim sắp chiếu
                </button>
              </div>
              <div className="col-md-4">
                <button
                  className="button-custom no"
                  disabled={!isComing ? true : false}
                  width="160px"
                  height="40px"
                  name="Phim đang chiếu"
                  onClick={() => setIsComing(false)}
                >
                  Phim đang chiếu
                </button>
              </div>
            </div>
            {movies.length == 0 ? (
              <div className="container-body" style={{ overflowY: "hidden" }}>
                <div
                  style={{
                    color: "white",
                    marginTop: "1em",
                    minWidth: "917px",
                  }}
                >
                  Hiện chưa có thông tin phim!
                </div>
              </div>
            ) : (
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
                    {movies.map((item, index) => (
                      <ItemMovie movie={item} index={index} />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </>
    );
  } else {
    return (
      // <div style={{ padding: "48px" }}>
      <List style={{ padding: "48px", width: "925px" }} />
      //</div>
    );
  }
}
