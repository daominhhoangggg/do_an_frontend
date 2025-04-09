import React, { useEffect, useState } from "react";
import BarChart from "./Component/BarChart";
import LineChart from "./Component/LineChart";
import ChartAPI from "../API/ChartAPI";

function Weather(props) {
  const [city, setCity] = useState("hanoi");
  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);

  // Lấy dữ liệu nhiệt độ
  useEffect(() => {
    const fetchData = async () => {
      const query = "?city=" + city;
      const response = await ChartAPI.getTemperature(query);

      const result = response.map((item) => ({
        time: item.time,
        "Nhiệt độ cao": item.high,
        "Nhiệt độ thấp": item.low,
        "Nhiệt độ trung bình": item.average,
      }));

      setTemperature(result);
    };
    fetchData();
  }, [city]);

  // Lấy dữ liệu độ ẩm
  useEffect(() => {
    const fetchData = async () => {
      const query = "?city=" + city;
      const response = await ChartAPI.getHumidity(query);

      setHumidity(response);
    };
    fetchData();
  }, [city]);

  return (
    <div className="page-wrapper">
      {/* <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
              Basic Initialisation
            </h4>
            <div className="d-flex align-items-center">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb m-0 p-0">
                  <li
                    className="breadcrumb-item text-muted active"
                    aria-current="page"
                  >
                    Home
                  </li>
                  <li
                    className="breadcrumb-item text-muted"
                    aria-current="page"
                  >
                    Chart
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div> */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body mt-3">
                <h3 className="card-title">Temperature</h3>
              </div>
              <div className="card-body pt-0">
                <BarChart
                  data={temperature}
                  keys={{
                    legend: "Nhiệt độ (°C)", // Trục dọc
                    data: [
                      "Nhiệt độ cao",
                      "Nhiệt độ thấp",
                      "Nhiệt độ trung bình",
                    ],
                  }}
                  index={{ legend: "Thời gian (h)", data: "time" }} // Trục ngang
                />
              </div>
            </div>
            <div className="card">
              <div className="card-body mt-3">
                <h3 className="card-title">Humidity</h3>
              </div>
              <div className="card-body pt-0">
                <LineChart
                  data={humidity} // Dữ liệu
                  xLegend={"Thời gian (h)"} // Trục ngang
                  yLegend={"Độ ẩm (%)"} // Trục dọc
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center text-muted"></footer>
    </div>
  );
}

export default Weather;
