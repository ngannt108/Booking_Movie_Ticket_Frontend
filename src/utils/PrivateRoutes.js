import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoutes = () => {
  let token = JSON.parse(sessionStorage.getItem("token"));
  const navigate = useNavigate();
  let isAdmin =
    JSON.parse(sessionStorage.getItem("maLoaiNguoiDung")) == "0" ? true : false;
  return isAdmin ? <Outlet /> : token ? navigate("/") : navigate("/SignIn");
};
export default PrivateRoutes;
