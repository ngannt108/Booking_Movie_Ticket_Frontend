import { Nav, Tab, Tabs } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import AdminFoodsDrinks from "../AdminFoodsDrinks";
import AdminMovies from "../AdminMovies";
import AdminUsers from "../AdminUsers";
import "../../../App.css";
import "./HeaderAdmin.css";
import "../../../Components/Carousel/Carousel.css";
import "../Movies/Menu.css";
import ChartArea from "../ChartsArea/ChartsArea";

const getDefaultTabKey = ({ path = "Admin" }) => {
  const paths = path.split("/");

  if (paths.includes("Admin")) {
    let indexOfAdmin = paths.indexOf("Admin");
    if (indexOfAdmin > -1 && paths.length > 2) {
      const subPath = paths[2];
      switch (subPath) {
        case "Foods":
          return "fooddrinks";
        default:
          return "home";
      }
    }
  }

  return "home";
};

export default function HeaderAdmin() {
  return (
    <>
      <div className="admin-page">
        <Tabs
          defaultActiveKey={getDefaultTabKey({
            path: window.location.pathname,
          })}
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="home" title=" Quản lý phim">
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
