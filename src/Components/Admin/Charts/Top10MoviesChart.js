import ApexCharts from "apexcharts";
import { useContext } from "react";
import { useEffect } from "react";
import { StoreContext } from "../../../Redux/Store/Store";

const Top10MoviesChart = () => {
  const store = useContext(StoreContext);
  let token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    fetch("http://localhost:5000/admins/movie/topMovies", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((dt) => {
        store.movie.TopMoviesDispatch({
          type: "TOPMOVIES",
          payload: dt.data,
        });
      });
  }, []);

  let data = store.movie?.TopMovies?.topMovies;
  // console.log(">> topMovies", data);
  let dateMovies = [];
  if (data)
    data.forEach((item) => {
      const found = dateMovies.find((el) => el.tenPhim === item.tenPhim);
      if (!found)
        dateMovies.push({ name: item.tenPhim, quantity: item.soLuongBan });
    });
  // console.log(">> dateMovies", dateMovies);
  var nameMovies = dateMovies.map((item) => {
    return item["name"];
  });
  var total = dateMovies.map((item) => {
    return item["quantity"];
  });
  var options = {
    series: [
      {
        name: "SỐ LƯỢNG BÁN",
        data: total,
      },
    ],
    chart: {
      type: "bar",
      height: 100,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: nameMovies,
    },
  };

  var chart = new ApexCharts(document.querySelector(".top10movies"), options);
  chart.render();
  return <div className="top10movies" style={{ maxWidth: "500px" }}></div>;
};
export default Top10MoviesChart;
