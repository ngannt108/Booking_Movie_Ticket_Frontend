import React, { useContext, useEffect, useState } from "react";
import "./MovieDetail.css";
import { StoreContext } from "../../Redux/Store/Store";
import { useParams } from "react-router-dom";
import { API_MOVIE } from "../../common/ApiController";
import { StarRating } from "../Rating/Rating";
import RatingModal from "../RatingModal/RatingModal";
import Comments from "../Comments/Comments";

export default function MovieDetail() {
  const store = useContext(StoreContext);
  const { biDanh } = useParams();
  const [hover, setHover] = useState(false);
  const [isRated, setRated] = useState();
  const handleHover = () => {
    setHover(true);
  };
  const handleLeave = () => {
    setHover(false);
  };
  console.log(
    ">> store.movie?.DetailMovie?.detailMovie",
    store.movie?.DetailMovie?.detailMovie
  );
  useEffect(() => {
    if (biDanh) {
      fetch(`${API_MOVIE.DETAIL + biDanh}`)
        .then((res) => res.json())
        .then((dt) => {
          // console.log(dt.data[0]);
          store.movie.DetailMovieDispatch({
            type: "GETDETAILMOVIE",
            payload: dt.data[0],
          });
          if (store.account.Profile.profile !== undefined) {
            const idUser = store.account?.Profile?.profile[0]?._id;
            var found =
              store.movie?.DetailMovie?.detailMovie?.nguoiDanhGia?.find(
                (item) => item._id === idUser
              );
            if (found) setRated(found);
            console.log(">> idUser", idUser);
            console.log(">> isRated", isRated);
            console.log(">> found", found);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [biDanh]);

  return (
    <>
      {store.movie.DetailMovie.detailMovie && (
        <div className="movie-detail-container">
          <div className="movie-banner">
            <img
              alt=""
              width={"100%"}
              src={store.movie.DetailMovie.detailMovie.anhBia}
            />
          </div>
          <div className="movie-detail-main-content">
            <div className="movie-detail-all-info">
              <div className="left-banner">
                <img
                  width={"250"}
                  alt=""
                  src={store.movie.DetailMovie.detailMovie.hinhAnh}
                />
              </div>
              <div>
                <div className="base-info">
                  <div className="movie-name">
                    <h1>{store.movie.DetailMovie.detailMovie.tenPhim}</h1>
                  </div>
                  <p className="movie-duaration">
                    {store.movie.DetailMovie.detailMovie.thoiLuong} phút
                  </p>
                  {/* <div className="movie-row">
                    <p className="movie-label">English title:</p>
                    <p className="label-info">
                      {store.MovieDetail.detail.TitleEn}
                    </p>
                  </div> */}
                  <div className="movie-row">
                    <p className="movie-label">Quốc gia:</p>
                    <p className="label-info">
                      {store.movie.DetailMovie.detailMovie.quocGia}
                    </p>
                  </div>
                  <div className="movie-row">
                    <p className="movie-label">Thể loại:</p>
                    <p className="label-info">
                      {store.movie.DetailMovie.detailMovie.theLoai.join(", ")}
                    </p>
                  </div>
                  <div className="movie-row">
                    <p className="movie-label">Ngày khởi chiếu:</p>
                    <p className="label-info">
                      {store.movie.DetailMovie.detailMovie.ngayKhoiChieu.slice(
                        0,
                        10
                      )}
                    </p>
                  </div>
                  <div style={{ paddingTop: "10px" }}>
                    <div onMouseEnter={handleHover} onMouseLeave={handleLeave}>
                      <StarRating
                        rating={store.movie.DetailMovie.detailMovie.danhGia}
                        slug={biDanh}
                        edit={false}
                        a11y={false}
                        size={20}
                      />
                      {hover ? (
                        <div
                          style={{
                            width: "fit-content",
                            fontSize: "14px",
                            display: "flex",
                          }}
                        >
                          {store.movie.DetailMovie.detailMovie.danhGia}/ 5 sao
                          &nbsp;{isRated ? (
                            <div style={{ color: "yellow" }}>
                              {" "}
                              -&nbsp;Bạn đã thực hiện đánh giá
                            </div>
                          ) : (
                            <RatingModal slug={biDanh} />
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="movie-synopsis">
                  <h1 className="synopsis-header">Mô tả</h1>
                  <div className="synopsis-content">
                    {store.movie.DetailMovie.detailMovie.moTa}
                  </div>
                </div>
                <div>
                  <Comments comments={store.movie.DetailMovie.detailMovie.binhLuan} slug={biDanh} />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="movie-showtime">
            <h1 className="movie-showtime-header">Showtime</h1>
            <section className="container container-mdc">
              <div className="row showtime-fields">
                <MovieDetailCinemas
                  setDate={setCurentDate}
                  date={currentDate}
                  banner={store.MovieDetail.detail.GraphicUrl}
                  title={store.MovieDetail.detail.Title}
                />
              </div>
            </section>
          </div> */}
        </div>
      )}
    </>
  );
}
