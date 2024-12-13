import { ResponsiveLine } from "@nivo/line";
import React, { useEffect, useState } from "react";
import ChartAPI from "../../API/ChartAPI";
import Loading from "../../Loading/Loading";

function Weather(props) {
  const [data, setData] = useState([]);
  const [city, setCity] = useState("hanoi");

  useEffect(() => {
    const fetchData = async () => {
      const query = "?city=" + city;
      const response = await ChartAPI.getWeather(query);

      setData(response);
    };
    fetchData();
  }, [city]);

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
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
      </div>
      <div className="container-fluid">
        <div style={{ height: "500px" }}>
          {data.length > 0 ? (
            <ResponsiveLine
              data={data}
              theme={{
                axis: {
                  domain: {
                    line: {
                      stroke: "#000", // Màu cạnh đồ thị
                    },
                  },
                  legend: {
                    text: {
                      fill: "#000", // Màu chữ cạnh đồ thị
                    },
                  },
                  ticks: {
                    line: {
                      stroke: "#000", // Màu vạch chia độ
                      strokeWidth: 1,
                    },
                    text: {
                      fill: "#000", // Màu số chia độ
                    },
                  },
                },
                legends: {
                  text: {
                    fill: "#000", // Màu chữ chú thích
                  },
                },
                tooltip: {
                  container: {
                    color: "#000", // Màu chữ hiển thị điểm trên đồ thị
                  },
                },
              }}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: 0,
                max: "auto",
                stacked: false,
                reverse: false,
              }}
              yFormat=" >-.2f"
              curve="catmullRom"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 0,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Hour",
                legendOffset: 36,
                legendPosition: "middle",
              }}
              axisLeft={{
                tickValues: 5,
                tickSize: 3,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Value",
                legendOffset: -40,
                legendPosition: "middle",
              }}
              pointSize={5}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabel="data.yFormatted"
              pointLabelYOffset={0}
              // enableArea={true}
              enableTouchCrosshair={true}
              useMesh={true}
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
            />
          ) : (
            <Loading />
          )}
        </div>
      </div>
      <footer className="footer text-center text-muted"></footer>
    </div>
  );
}

export default Weather;
