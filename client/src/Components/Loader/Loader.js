import React from "react";
import { GridLoader } from "react-spinners";
function Loader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <GridLoader color="#ff8500" />
    </div>
  );
}

export default Loader;
