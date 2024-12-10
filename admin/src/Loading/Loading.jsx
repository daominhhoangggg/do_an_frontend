import React from "react";
import { FadeLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "75vh" }}
    >
      <FadeLoader color="#5f76e8" size={50} />
    </div>
  );
};

export default Loading;
