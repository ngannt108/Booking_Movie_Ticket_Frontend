import { useState } from "react";
import { useContext } from "react";
import { API_USER, API_MOVIE } from "../../Common/ApiController";
import { StoreContext } from "../../Redux/Store/Store";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import "./Comments.css";
export default function Comments({ comments, biDanh, slug }) {
  const store = useContext(StoreContext);
  const [content, setContent] = useState("");
  const [isInvalid, setInvalid] = useState();
  const navigate = useNavigate();
  const handlePostCmt = (e) => {
    postCmtAction(e);
  };
  const formattedDate = (dateInput) => {
    let date = new Date(dateInput);
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    if (hour < 10) hour = "0" + hour;
    if (min < 10) min = "0" + min;

    return `${hour}:${min} - ${dd}/${mm}/${yyyy}`;
  };
  const checkVailid = (e) => {
    let temp = document.getElementsByName(e.target.name).item(0);
    if (temp.checkValidity() == false || temp.value.trim() == 0) {
      e.preventDefault();
      temp.classList.add("is-invalid");
    } else temp.classList.remove("is-invalid");
    checkInvalidAndRerender();
  };
  const checkInvalidAndRerender = () => {
    //console.log(isInvalid === undefined)
    if (document.getElementsByClassName("is-invalid post-cmt").length > 0) {
      // console.log(">> STILL INVALID");
      // If needed
      if (!isInvalid || isInvalid === undefined) {
        setInvalid(true);
      }
    } else {
      // Should be rerender
      if (isInvalid || isInvalid === undefined) {
        setInvalid(false);
      }
    }
  };
  const postCmtAction = (e) => {
    e.preventDefault();
    // console.log(">> content", content)
    swal({
      icon: "info",
      title: "Xin chờ giây lát",
      buttons: false,
    });
    const token = JSON.parse(localStorage.getItem("token"));
    fetch(API_USER.POSTCOMMENT + `${slug}/comment`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        noiDung: content,
      }),
    })
      .then((res) => {
        if (res.status === 401) {
          swal({
            title: "Vui lòng đăng nhập lại",
            text: "Phiên đăng nhập đã hết hạn",
            icon: "warning",
            buttons: true,
          });
          setTimeout(function () {
            localStorage.clear();
            navigate("/signIn");
          }, 1000);
        }
        if (res.status == 200) {
          swal({
            title: "Bình luận đã được đăng",
            text: "",
            icon: "success",
          });
          fetch(`${API_MOVIE.DETAIL + biDanh}`)
            .then((res) => res.json())
            .then((dt) => {
              console.log(dt.data[0]);
              store.movie.DetailMovieDispatch({
                type: "GETDETAILMOVIE",
                payload: dt.data[0],
              });
            });
        } else return res.json();
      })
      .then((response) => {
        // console.log("response", response);
        if (response != true)
          return swal({
            title: "Vui lòng thử lại sau",
            text: response.error,
            icon: "error",
          });
      });
  };
  return (
    <div className="comment-container">
      <div className="row">
        <div className="col-sm-6 col-md-7 col-12 pb-4">
          <h4>Bình luận</h4>
          <div className="all-cmt">
            {comments.length > 0 ? (
              comments.map((item) => (
                <div className="comment mt-4 text-justify">
                  <div style={{ display: "flex" }}>
                    <img
                      src={item.maNguoiBinhLuan.anhDaiDien}
                      alt=""
                      className="rounded-circle"
                      width="60"
                      height="60"
                    />
                    <div style={{ alignItems: "center" }}>
                      <h6>&nbsp; {item.maNguoiBinhLuan.tentaiKhoan} &nbsp;</h6>
                      <div style={{ alignItems: "center" }}>
                        <h6>&nbsp; Đăng vào {formattedDate(item.createdAt)}</h6>
                      </div>
                    </div>
                  </div>
                  <span>
                    <h6> {}</h6>
                  </span>
                  <p
                    style={{
                      fontSize: "16px",
                      textAlign: "justify",
                      fontStyle: "italic",
                    }}
                  >
                    {item.noiDung}
                  </p>
                </div>
              ))
            ) : (
              <h6 style={{ color: "black", overflowY: "hidden" }}>
                Hiện chưa có bình luận nào
              </h6>
            )}
          </div>
        </div>
        {store.account.userAccount.account ? (
          <div style={{ width: "40%", marginBottom: "50px" }}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "24px", color: "black" }}>
                Viết bình luận của bạn
              </Form.Label>
              <Form.Control
                className="is-invalid post-cmt"
                style={{ backgroundColor: "#000000ba", color: "white" }}
                as="textarea"
                type="text"
                name="content"
                rows={4}
                onChange={(e) => {
                  checkVailid(e);
                  setContent(e.target.value);
                }}
              />
              <Form.Control.Feedback
                style={{ fontSize: "16px" }}
                type="invalid"
              >
                Hãy nói lên cảm nghĩ của bạn
              </Form.Control.Feedback>
            </Form.Group>
            <button
              className="btn btn-success yes"
              name="Đăng bình luận"
              borderRadius="0.4em"
              disabled={isInvalid === undefined ? true : isInvalid}
              onClick={(e) => handlePostCmt(e)}
            >
              Đăng bình luận
            </button>
          </div>
        ) : (
          <div style={{ width: "40%" }}>
            <form id="algin-form">
              <Form.Group className="mb-3">
                <Form.Label style={{ fontSize: "24px", color: "black" }}>
                  Viết bình luận của bạn
                </Form.Label>
              </Form.Group>
              <button
                className="button-custom yes"
                name="Đăng nhập để viết"
                borderRadius="0.4em"
                onClick={(e) => navigate("/signIn")}
              >
                Đăng nhập để viết
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
