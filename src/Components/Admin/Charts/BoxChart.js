import "../../../Page/Admin/Movies/MovieManage.css";
import ApexCharts from "apexcharts";
import { useContext } from "react";
import { StoreContext } from "../../../Redux/Store/Store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_USER } from "../../../common/ApiController";
const BoxChart = () => {
  const store = useContext(StoreContext);
  let token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  useEffect(() => {
    fetch(API_USER.GETALL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((dt) => {
        store.users.UsersDispatch({
          type: "GETALL",
          payload: dt.data,
        });
      });
    fetch("http://localhost:5000/movies", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((dt) => {
        store.lsShowingMovie.ShowingMovieDispatch({
          type: "GETSHOWINGMOVIES",
          payload: dt.data,
        });
      });

    fetch("http://localhost:5000/movies/coming", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((dt) => {
        store.lsComingMovie.ComingMovieDispatch({
          type: "GETCOMINGMOVIES",
          payload: dt.data,
        });
      });
  }, []);
  let sumOfAccounts = store.users.listUsers?.users?.length;
  let sumOfShowingMovies = store.lsShowingMovie.ShowingMovie?.listMovie?.length;
  let sumOfComingMovies = store.lsComingMovie.ComingMovie?.listMovie?.length;
  return (
    <div class="row" style={{ paddingLeft: "20px" }}>
      <div className="col-md-4">
        <button
          className="button-custom yes"
          name="Đồng ý"
          borderRadius="0.4em"
          style={{
            backgroundImage:
              "radial-gradient(100% 100% at 100% 0, #ff9f5a 0, #d06d26 100%)",
          }}
        >
          {sumOfAccounts} Khách
        </button>
      </div>
      <div className="col-md-4">
        <button
          className="button-custom yes"
          name="Đồng ý"
          borderRadius="0.4em"
          onClick={() => navigate("/Admin")}
          style={{
            backgroundImage:
              "radial-gradient(100% 100% at 100% 0, #9edf3d 0, #5f8b1e 100%)",
          }}
        >
          {sumOfShowingMovies} Phim đang chiếu
        </button>
      </div>
      <div className="col-md-4">
        <button
          className="button-custom yes"
          name="Đồng ý"
          borderRadius="0.4em"
        >
          {sumOfComingMovies} Phim sắp chiếu
        </button>
      </div>
    </div>
  );
};
export default BoxChart;
