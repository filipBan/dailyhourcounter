import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

const Spinner = () => {
  return (
    <section
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#89cff0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <span>Please wait...</span>
      <section style={{ height: "1rem", width: "20rem" }}>
        <LinearProgress />
      </section>
    </section>
  );
};

export default Spinner;
