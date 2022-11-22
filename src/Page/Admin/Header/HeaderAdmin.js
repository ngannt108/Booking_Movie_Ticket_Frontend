import { Nav, Tab, Tabs } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import AdminFoodsDrinks from "../AdminFoodsDrinks";
import AdminMovies from "../AdminMovies";
import AdminUsers from "../AdminUsers";
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
          <Tab eventKey="fooddrinks" title="Quản lý đồ ăn">
            <AdminFoodsDrinks />
          </Tab>
          <Tab eventKey="movies" title="Quản lý thông tin">
            <AdminUsers />
          </Tab>
          <Tab style={{ width: "100%" }} eventKey="charts" title="Thống kê">
            <ChartArea />
          </Tab>
        </Tabs>
      </div>

      {/* </header> */}
    </>
  );
}
