import { Outlet, useNavigate } from "react-router-dom";
import CheckExpiredToken from "./CheckExpiredToken";

const PrivateUserRoutes = () => {
  CheckExpiredToken();
  let token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  let isUser =
    JSON.parse(localStorage.getItem("maLoaiNguoiDung")) === "1" ? true : false;
  return isUser ? <Outlet /> : token ? navigate(-1) : navigate("/SignIn");
};
export default PrivateUserRoutes;
