import React, { useEffect, useState } from "react";
import BarChart from "../Component/BarChart";
import LineChart from "../Component/LineChart";

function Weather(props) {

  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);


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
              <div className="card-body">
                <BarChart />
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <LineChart />
              </div>
            </div>
            <div className="card">
              <div className="card-body">{/* <MixChart /> */}</div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer text-center text-muted"></footer>
    </div>
  );
}

export default Weather;
