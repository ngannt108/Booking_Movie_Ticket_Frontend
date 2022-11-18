import { Nav, Tab, Tabs } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import AdminFoodsDrinks from "../AdminFoodsDrinks";
import AdminMovies from "../AdminMovies";
import Admin from "../AdminMovies";
import "./HeaderAdmin.css";
import "../Movies/Menu.css";
import ChartArea from "../ChartsArea/ChartsArea";
export default function HeaderAdmin() {
  return (
    <>
      <div className="admin-page">
        <Tabs
          defaultActiveKey="home"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="home" title=" Quản lý phim" id="tab0">
            <AdminMovies />
          </Tab>
          <Tab eventKey="profile" title="Quản lý đồ ăn">
            <AdminFoodsDrinks />
          </Tab>
          <Tab eventKey="longer-tab" title="Quản lý thông tin">
            Quản lý phim
          </Tab>
          <Tab eventKey="contact" title="Thống kê">
            <ChartArea />
          </Tab>
        </Tabs>
      </div>

      {/* </header> */}
    </>
  );
}
