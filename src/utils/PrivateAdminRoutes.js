import { Outlet, useNavigate } from "react-router-dom";
import CheckExpiredToken from "./CheckExpiredToken";

const PrivateAdminRoutes = () => {
  CheckExpiredToken();
  let token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  let isAdmin =
    JSON.parse(localStorage.getItem("maLoaiNguoiDung")) == "0" ? true : false;
  return isAdmin ? <Outlet /> : token ? navigate(-1) : navigate("/SignIn");
};
export default PrivateAdminRoutes;
