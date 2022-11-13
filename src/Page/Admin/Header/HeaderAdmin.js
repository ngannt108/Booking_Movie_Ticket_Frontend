import { Nav, Tab, Tabs } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Admin from "../Admin";
import "./HeaderAdmin.css";

export default function HeaderAdmin() {
  return (
    <>
      {/* <header> */}
      {/* <div className="nav">
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
      </div> */}
      <div style={{ margin: "20px 0px" }}>
        <Tabs
          defaultActiveKey="home"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="home" title=" Quản lý phim" id="tab0">
            {/* <Admin /> */}
          </Tab>
          <Tab eventKey="profile" title="Quản lý đồ ăn">
            Quản lý phim
          </Tab>
          <Tab eventKey="longer-tab" title="Quản lý thông tin">
            Quản lý phim
          </Tab>
          <Tab eventKey="contact" title="Thống kê">
            Quản lý phim</Tab>
        </Tabs>
      </div>

      {/* </header> */}
    </>
  );
}
