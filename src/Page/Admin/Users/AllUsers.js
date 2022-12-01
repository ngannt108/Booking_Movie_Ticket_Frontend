import React, { useEffect, useContext, useState } from "react";
import { StoreContext } from "../../../Redux/Store/Store";
import { API_USER } from "../../../common/ApiController";
import "../Movies/MovieManage.css";
import { Button } from "../../../Components/Button/Button";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { List } from "react-content-loader";
import ItemUser from "../../../Components/Admin/ItemUser/ItemUser";

export default function AllUsers() {
  const store = useContext(StoreContext);
  const [biDanh, setBiDanh] = useState();
  // console.log(">>ID in AllUsers", biDanh);
  let token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    fetch(API_USER.GETALL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((dt) => {
        store.users.UsersDispatch({
          type: "GETALL",
          payload: dt.data,
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let users = store.users.listUsers?.users;
  // console.log(">> users", users);
  if (users) {
    return (
      <>
        <div style={{ minWidth: "925px" }}>
          <div style={{ padding: "0em 3em 3em 3em" }}>
            {users.length == 0 ? (
              <div style={{ color: "white", marginTop: "1em" }}>
                Hiện chưa có người dùng nào!
              </div>
            ) : (
              <div className="container-body">
                <table className="layout display responsive-table">
                  <thead>
                    <tr>
                      <th>Số thứ tự</th>
                      <th>Tên tài khoản</th>
                      <th>Ảnh đại diện</th>
                      <th> Họ tên</th>
                      <th colSpan={2}>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((item, index) => (
                      <ItemUser user={item} index={index} />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </>
    );
  } else {
    return (
      // <div style={{ padding: "48px" }}>
      <List style={{ padding: "48px", width: "925px" }} />
      //</div>
    );
  }
}
