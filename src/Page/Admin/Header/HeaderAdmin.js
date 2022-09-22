import "./HeaderAdmin.css";

export default function HeaderAdmin() {
    return (
        <>
            <header>
                <div className="nav">
                    <ul>
                        <li className="movies"><a href="#">Quản lý phim</a></li>
                        <li className="food-and-drink"><a className="active" href="#">Quản lý đồ ăn</a></li>
                        <li className="about"><a href="#">Thống kê</a></li>
                        <li className="news"><a href="#">Newsletter</a></li>
                        <li className="contact"><a href="#">Contact</a></li>
                    </ul>
                </div>
            </header>
        </>
    )
}
