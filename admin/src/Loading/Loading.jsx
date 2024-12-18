import React from "react";
import { FadeLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1050,
      }}
    >
      <FadeLoader color="#5f76e8" size={50} />
    </div>
  );
};

export default Loading;
