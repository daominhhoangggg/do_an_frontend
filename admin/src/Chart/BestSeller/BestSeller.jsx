import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  // State quản lý dữ liệu biểu đồ
  const [chartData, setChartData] = useState(null);

  // Hàm giả lập lấy dữ liệu động
  const fetchData = () => {
    return {
      labels: ["SP1", "SP2", "SP3", "SP4", "SP5", "SP6"], // Số lượng labels không cố định
      data: [15, 25, 35, 45, 55, 65], // Giá trị tương ứng với labels
    };
  };

  // Tạo màu sắc tự động dựa trên số lượng dữ liệu
  const generateColors = (length) => {
    return Array.from(
      { length },
      () =>
        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)}, 0.5)`
    );
  };

  useEffect(() => {
    // Giả lập gọi API hoặc lấy dữ liệu động
    const response = fetchData();
    const colors = generateColors(response.labels.length);

    setChartData({
      labels: response.labels, // Labels động
      datasets: [
        {
          label: "Tên sản phẩm", // Tên của dataset
          data: response.data, // Dữ liệu động
          backgroundColor: colors, // Màu động
          borderColor: colors.map((color) => color.replace("0.5", "1")), // Màu viền động
          borderWidth: 1,
        },
      ],
    });
  }, []); // Chạy 1 lần khi component được mount

  // Tùy chọn cấu hình biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom", // Vị trí của chú thích
      },
      title: {
        display: true,
        text: "SẢN PHẨM BÁN CHẠY CỦA THÁNG", // Tiêu đề biểu đồ
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Trục Y bắt đầu từ 0
      },
    },
  };

  // Hiển thị "Loading" khi dữ liệu chưa sẵn sàng
  if (!chartData) return <div>Loading...</div>;

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-7 align-self-center">
            <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
              Best Seller
            </h4>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div style={{ height: "500px" }}>
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
