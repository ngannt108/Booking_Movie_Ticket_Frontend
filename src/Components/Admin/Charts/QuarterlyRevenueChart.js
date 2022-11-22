import ApexCharts from "apexcharts";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { List } from "react-content-loader";
import { useNavigate } from "react-router-dom";
import isEmpty from "validator/lib/isEmpty";
import { API_CHARTS } from "../../../common/ApiController";
import { StoreContext } from "../../../Redux/Store/Store";

const QuarterlyRevenueChart = () => {
  const store = useContext(StoreContext);
  const [info, setInfo] = useState({ nam: "2022", quy: "1" });
  const [isInvalid, setInvalid] = useState(true);
  const [isLoading, setLoading] = useState(false);
  let token = JSON.parse(sessionStorage.getItem("token"));
  let data;
  useEffect(() => {
    fetch(API_CHARTS.GETREVENUE, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then(async (dt) => {
        await store.ticketBooking.GetTicketsByTimeDispatch({
          type: "GETTICKETSBYTIME",
          payload: dt.data,
        });
        console.log(">> in useEffect", dt.data);
      });
    setLoading(false);
    // setData(store.ticketBooking?.GetTicketsByTime?.lsTicketBookings);
  }, [info]);
  const formattedDate = (dateInput) => {
    let today = new Date(dateInput);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return dd + "-" + mm + "-" + yyyy;
  };

  // setData(store.ticketBooking?.GetTicketsByTime?.lsTicketBookings); // chinh
  data = store.ticketBooking?.GetTicketsByTime?.lsTicketBookings;
  console.log(">> quarterRevenue", data);
  let dateRevenue = [];
  if (data != undefined)
    data?.forEach((item) => {
      let formatDate = formattedDate(item.thoiGianDat);
      const found = dateRevenue.find((el) => el.date === formatDate);
      // console.log(">> found", found);
      if (!found)
        dateRevenue.push({
          date: formatDate,
          total: item.tienThanhToan ? item.tienThanhToan : 0,
        });
      else {
        found.total += item.tienThanhToan;
      }
    });
  console.log(">> dateRevenue", dateRevenue);
  let formatDate = dateRevenue?.map((item) => {
    return item["date"];
  });
  let total = dateRevenue?.map((item) => {
    return item["total"];
  });

  const checkValid = (event) => {
    let temp = document.getElementsByName(event.target.name).item(0);
    if (
      (isEmpty(temp.value) ||
        temp.checkValidity() == false ||
        temp.value.trim() == 0) &&
      temp.required
    ) {
      event.preventDefault();
      temp.classList.add("is-invalid");
    } else temp.classList.remove("is-invalid");
    checkInvalidAndRerender();
  };

  const checkInvalidAndRerender = () => {
    //console.log(isInvalid === undefined)
    if (
      document.getElementsByClassName("is-invalid quarter-revenue").length > 0
    ) {
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

  const handleClick = (event) => {
    setInfo({ quy: info.quy, nam: info.nam });
    setLoading(true);
    console.log(">> filter", info);
  };

  let options = {
    series: [
      {
        name: "DOANH THU THEO NGÀY",
        type: "area",
        data: total,
      },
      //   { total.length == 1 ? [0, ...total] :
      //     name: "TEAM B",
      //     type: "line",
      //     data: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61, 43],
      //   },
    ],
    chart: {
      height: 350,
      width: 600,
      type: "line",
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      type: "solid",
      opacity: [0.35, 1],
    },
    labels: formatDate,
    markers: {
      size: 0,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return (
              y.toLocaleString({
                style: "currency",
                currency: "VND",
              }) + " VNĐ"
            );
          }
          return y;
        },
      },
    },
  };
  var chart = new ApexCharts(
    document.querySelector(".quarterlyRevenue"),
    options
  );
  chart.render();
  console.log(">> options,labels", options.labels);
  return (
    <>
      {!isLoading ? (
        <div className="quarterlyRevenue" style={{ maxWidth: "500px" }}></div>
      ) : (
        <List />
      )}

      {/* <div className="quarterlyRevenue" style={{ maxWidth: "500px" }}></div> */}

      <Row className="mb-3">
        <Form.Group as={Col} md="4">
          <FloatingLabel controlId="floatingInput" label="Qúy" className="mb-3">
            <Form.Select
              className="is-invalid quarter-revenue"
              name="quy"
              required
              onChange={(e) => {
                checkValid(e);
                //setInfo({ ...info, quy: e.target.value });
                info.quy = e.target.value;
              }}
            >
              <option value="">Chọn quý</option>
              {Array.from(Array(4).keys())?.map((item, index) => {
                return (
                  <option key={index} value={item + 1}>
                    {item + 1}
                  </option>
                );
              })}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Chọn quý
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group as={Col} md="4">
          <FloatingLabel controlId="floatingInput" label="Năm" className="mb-3">
            <Form.Select
              className="is-invalid quarter-revenue"
              name="nam"
              required
              onChange={(e) => {
                checkValid(e);
                //setInfo({ ...info, nam: e.target.value });
                info.nam = e.target.value;
              }}
            >
              <option value="">Chọn năm</option>
              {Array.from(Array(4).keys())?.map((item, index) => {
                return (
                  <option key={index} value={item + 2022}>
                    {item + 2022}
                  </option>
                );
              })}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Chọn năm
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <div className="col-md-3">
          <button
            className="button-custom yes"
            name="Đồng ý"
            borderRadius="0.4em"
            disabled={isInvalid === undefined ? true : isInvalid}
            onClick={(e) => handleClick(e)}
          >
            Đồng ý
          </button>
        </div>
      </Row>
    </>
  );
};
export default QuarterlyRevenueChart;
