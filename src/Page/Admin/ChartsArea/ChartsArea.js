import BoxChart from "../../../Components/Admin/Charts/BoxChart";
import MixChart from "../../../Components/Admin/Charts/MixChart";
import QuarterlyRevenueChart from "../../../Components/Admin/Charts/QuarterlyRevenueChart";
import Top10MoviesChart from "../../../Components/Admin/Charts/Top10MoviesChart";

export default function ChartArea() {
  return (
    <>
      <BoxChart />
      <div className="row">
        <div className="col-md-6 col-xl-6">
          <div
            style={{
              color: "white",
              fontFamily: " monospace",
            }}
          >
            Doanh thu theo quý
          </div>
          <QuarterlyRevenueChart />
        </div>
        <div className="col-md-4 col-xl-4">
          <div
            style={{
              color: "white",
              fontFamily: " monospace",
            }}
          >
            Lượt bán theo ngày chiếu
          </div>
          <MixChart />
        </div>
      </div>
    </>
  );
}
