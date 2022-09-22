import "./Menu.css";
import HeaderAdmin from "../Header/HeaderAdmin";

export default function AllMovies() {
    return (
        <>
            <HeaderAdmin />
            <div className="vertical-menu">
                <a href="#" className="active">Tất cả phim</a>
                <a href="#">Tạo phim mới</a>
                <a href="#">Phim được yêu thích</a>
            </div>
            <body>

            </body>
        </>
    )
}