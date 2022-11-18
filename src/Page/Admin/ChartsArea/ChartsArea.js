import BoxChart from "../../../Components/Admin/Charts/BoxChart";
import MixChart from "../../../Components/Admin/Charts/MixChart";
import Top10MoviesChart from "../../../Components/Admin/Charts/Top10MoviesChart";

export default function ChartArea() {
  return (
    <>
      <BoxChart />

      <div className="row">
        <div className="col-md-6">
          <div
            style={{
              color: "white",
              fontFamily: " monospace",
            }}
          >
            Top 10 phim bán chạy
          </div>
          <Top10MoviesChart />
        </div>
        <div className="col-md-4">
          <div
            style={{
              color: "white",
              fontFamily: " monospace",
            }}
          >
            Lượt bán theo ngày
          </div>
          <MixChart />
        </div>
      </div>
    </>
  );
}
