import HeaderAdmin from "../Header/HeaderAdmin";
import { Link, useParams } from "react-router-dom";
export default function Showtimes() {
  let slug = useParams();
  console.log(">> bis Danh:", slug);

  return (
    <>
      <HeaderAdmin />
      <div className="general">
        <div className="vertical-menu">
          <Link to="#" className="active">
            Tất cả phim
          </Link>
          <Link to="#">Tạo phim mới</Link>
          <Link to="#">Phim được yêu thích</Link>
        </div>
        <div style={{ marginLeft: "40px" }} className="container mt-4">
          <form>
            <div style={{ textAlign: "center", width: "980px" }}>
              <label>LỊCH CHIẾU CỦA PHIM: tenPhim</label>
            </div>

            <div className="row">
              <div className="col-md-2">RẠP</div>
              <div className="col-md-4">LỊCH CHIẾU</div>
            </div>

            <div className="row"></div>
          </form>
        </div>
      </div>
    </>
  );
}
