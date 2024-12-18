import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import Loading from "../../Loading/Loading";
import PropTypes from "prop-types";

BarChart.propTypes = {
  data: PropTypes.array,
  keys: PropTypes.object,
  index: PropTypes.object,
};

BarChart.defaultProps = {
  data: [],
  keys: {},
  index: {},
};

function BarChart(props) {
  const { data, keys, index } = props;
  console.log(data);

  return (
    <div style={{ height: "500px" }}>
      {data.length > 0 ? (
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
          keys={keys.data}
          indexBy={index.data}
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          groupMode="grouped"
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: index.legend, // Tên trục ngang dưới
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: keys.legend, // Tên trục dọc trái
            legendPosition: "middle",
            legendOffset: -40,
          }}
          enableLabel={false} // Không hiển thị chỉ số trên cột
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
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
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default BarChart;
