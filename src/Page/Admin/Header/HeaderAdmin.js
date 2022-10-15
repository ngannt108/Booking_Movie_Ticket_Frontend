import "./HeaderAdmin.css";

export default function HeaderAdmin() {
    return (
        <>
            <header>
                <div className="nav">
                    <ul>
                        <li className="movies"><a className="active" href="#">Quản lý phim</a></li>
                        <li className="food-and-drink"><a href="#">Quản lý đồ ăn</a></li>
                        <li className="about"><a href="#">Thống kê</a></li>

                    </ul>
                </div>
            </header>
        </>
    )
}
