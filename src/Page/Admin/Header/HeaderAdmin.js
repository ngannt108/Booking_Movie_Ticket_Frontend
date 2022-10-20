import { Link } from "react-router-dom";
import "./HeaderAdmin.css";

export default function HeaderAdmin() {
  return (
    <>
      <header>
        <div className="nav">
          <ul>
            <li className="movies">
              <Link className="active" to="#">
                Quản lý phim
              </Link>
            </li>
            <li className="food-and-drink">
              <Link to="#">Quản lý đồ ăn</Link>
            </li>
            <li className="about">
              <Link to="#">Thống kê</Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
