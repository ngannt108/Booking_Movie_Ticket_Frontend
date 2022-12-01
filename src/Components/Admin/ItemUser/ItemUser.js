import List from "react-content-loader";
import InfoUserModal from "../InfoUserModal/InfoUserModal";
const ItemUser = ({ index, user }) => {
  return (
    <tr key={index}>
      <td className="organisationname number">{index + 1}</td>
      <td width="250px" className="organisationname">
        {user.tentaiKhoan}
      </td>
      <td className="organisationname image">
        <img height="80px" width="80px" src={user.anhDaiDien} alt="" />
      </td>
      <td width="900px">
        <div className="organisationname-description">{user.hoTen}</div>
      </td>
      <td width="400px">
        <div className="organisationname-description">{user.email}</div>
      </td>
      <td width="250px" className="actions">
        <InfoUserModal tenTaiKhoan={user.tentaiKhoan} show={false} />
      </td>
    </tr>
  );
  // }
};

export default ItemUser;
