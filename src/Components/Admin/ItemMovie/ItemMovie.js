import List from "react-content-loader";
import EditMovieModal from "../EditMovieModal/EditMovieModal";
const ItemMovie = ({ index, movie }) => {
  return (
    <tr key={index}>
      <td className="organisationname number">{index + 1}</td>
      <td width="250px" className="organisationname">
        {movie.tenPhim}
      </td>
      <td className="organisationname image">
        <img height="80px" width="60px" src={movie.hinhAnh} alt="" />
      </td>
      <td width="900px">
        <div className="organisationname-description">{movie.moTa}</div>
      </td>
      <td width="250px" className="actions">
        <EditMovieModal biDanh={movie.biDanh} show={false} />
      </td>
    </tr>
  );
  // }
};

export default ItemMovie;
