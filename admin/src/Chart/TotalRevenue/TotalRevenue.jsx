import { ResponsiveBar } from "@nivo/bar";
import data from "./data";
import React from "react";

const TotalRevenue = () => {
  //fetch api
  // const [data, setData] = useState([]); // State lưu dữ liệu biểu đồ
  // const [loading, setLoading] = useState(false); // State để hiển thị trạng thái tải dữ liệu
  // const [error, setError] = useState(null); // State để xử lý lỗi

  // // Hàm gọi API từ backend
  // const fetchData = async () => {
  //     try {
  //         setLoading(true); // Hiển thị trạng thái tải
  //         setError(null); // Xóa lỗi trước đó (nếu có)

  //         // Gọi API (thay URL bằng endpoint của bạn)
  //         const response = await axios.get("http://localhost:5000/api/revenue");

  //         // Cập nhật dữ liệu vào state
  //         setData(response.data);
  //     } catch (err) {
  //         console.error("Error fetching data:", err);
  //         setError("Failed to load data from backend.");
  //     } finally {
  //         setLoading(false); // Kết thúc trạng thái tải
  //     }
  // };
  // Hàm tính tổng giá trị cho từng cột
  const calculateTotalPerCountry = (data) => {
    return data.map((row) => {
      // Tính tổng số lượng trong từng `row`
      const total = Object.keys(row).reduce((sum, key) => {
        // Bỏ qua các trường `country` và các trường kết thúc bằng "Color"
        if (
          key !== "country" &&
          !key.endsWith("Color") &&
          typeof row[key] === "number"
        ) {
          return sum + row[key];
        }
        return sum;
      }, 0);

      // Trả về kết quả với `country` và `total`
      return {
        country: row.country,
        total,
      };
    });
  };

  // Tính tổng doanh thu
  const result = calculateTotalPerCountry(data);

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
                    Total revenue
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
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
        <div style={{ height: "500px" }}>
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
            keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
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
              e.id + ": " + e.formattedValue + " in country: " + e.indexValue
            }
          />
        </div>
        {/* Bảng tổng doanh thu */}
        <div className="revenue-table">
          <h4>Total Revenue per Food Item</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Food Item</th>
                <th>Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {result.map((row) => (
                <tr key={row.country}>
                  <td>{row.country}</td>
                  <td>{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <footer className="footer text-center text-muted"></footer>
    </div>
  );
};

export default TotalRevenue;
