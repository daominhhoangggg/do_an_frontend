import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import ChartAPI from "../../API/ChartAPI";
import queryString from "query-string";
import convertMoney from "../../convertMoney";
import BarChart from "../Component/BarChart";

const TotalRevenue = (props) => {
  const [data, setData] = useState([]);
  const [sales, setSales] = useState([]);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [limit, setLimit] = useState(7);

  // Custom BarChart
  const [keys, setKeys] = useState({});
  const [index, setIndex] = useState({});

  // Gọi API lấy thông tin cả năm
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        year,
        limit,
      };
      const query = "?" + queryString.stringify(params);
      const response = await ChartAPI.getProductSales(query);

      console.log(response);

      const result = {};
      const productNames = new Set();

      response.data.forEach((item) => {
        const month = item._id.month;
        const { totalRevenue, productData } = item;
        const productName = productData?.name || "N/A";

        productNames.add(productName);

        if (!result[month]) {
          result[month] = { month };
        }
        result[month][productName] = totalRevenue / 1000000;
      });

      setData(Object.values(result));
      setIndex({ legend: "Tháng", data: "month" });
      setKeys({
        legend: "Doanh thu (triệu VND)",
        data: Array.from(productNames),
      });
    };
    fetchData();
  }, [year, limit]);

  // Gọi API lấy thông tin của tháng
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        month,
        year,
        limit,
      };
      const query = "?" + queryString.stringify(params);
      const response = await ChartAPI.getMonthlyRevenue(query);

      console.log(response);

      setSales(response.data);
    };

    fetchData();
  }, [month, year, limit]);

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
                    Total revenue
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
                <h4 className="card-title">Total Revenue</h4>
                {/* <div style={{ height: "500px" }}>
                  <ResponsiveBar
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
                            strokeWidth: 1, // Độ rộng vạch chia độ
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
                    }}
                    keys={[
                      "hot dog",
                      "burger",
                      "sandwich",
                      "kebab",
                      "fries",
                      "donut",
                    ]}
                    indexBy="country"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.3}
                    valueScale={{ type: "linear" }}
                    indexScale={{ type: "band", round: true }}
                    colors={{ scheme: "nivo" }}
                    defs={[
                      {
                        id: "dots",
                        type: "patternDots",
                        background: "inherit",
                        color: "#38bcb2",
                        size: 4,
                        padding: 1,
                        stagger: true,
                      },
                      {
                        id: "lines",
                        type: "patternLines",
                        background: "inherit",
                        color: "#eed312",
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10,
                      },
                    ]}
                    borderColor={{
                      from: "color",
                      modifiers: [["darker", 1.6]],
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "country",
                      legendPosition: "middle",
                      legendOffset: 32,
                    }}
                    axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "food",
                      legendPosition: "middle",
                      legendOffset: -40,
                    }}
                    enableLabel={false} // Không hiển thị chỉ số trên cột
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{
                      from: "color",
                      modifiers: [["darker", 1.6]],
                    }}
                    legends={[
                      {
                        dataFrom: "keys",
                        anchor: "bottom-right",
                        direction: "column",
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: "left-to-right",
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                          {
                            on: "hover",
                            style: {
                              itemOpacity: 1,
                            },
                          },
                        ],
                      },
                    ]}
                    role="application"
                    ariaLabel="Nivo bar chart demo"
                    barAriaLabel={(e) =>
                      e.id +
                      ": " +
                      e.formattedValue +
                      " in country: " +
                      e.indexValue
                    }
                  />
                </div> */}
                <BarChart data={data} keys={keys} index={index} />
              </div>
              <div className="card-body">
                {/* Bảng tổng doanh thu */}
                <h4 className="card-title">Monthly Revenue</h4>
                <div className="table-responsive">
                  <table className="table table-striped table-bordered no-wrap">
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Total Revenue</th>
                        <th>Total Sold</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sales.length > 0 &&
                        sales.map((product, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{product.productData.name}</td>
                            <td>
                              <img
                                src={product.productData.img[0]}
                                style={{ height: "60px", width: "60px" }}
                                alt="..."
                              />
                            </td>
                            <td>{product.productData.category}</td>
                            <td>{convertMoney(product.totalRevenue)}</td>
                            <td>{product.totalSold}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                <button
                  // onClick={fetchData} // Gọi lại hàm fetchData khi nhấn nút
                  style={{
                    marginBottom: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Update Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalRevenue;
