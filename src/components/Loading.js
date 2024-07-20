import React from "react";

const Loading = () => {
  return (
    <div className="position-absolute" style={{ top: "45%", left: "45%" }}>
      <div
        className="spinner-border  text-light"
        style={{ width: "4rem", height: "4rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
