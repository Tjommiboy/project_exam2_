import React from "react";
import ClockLoader from "react-spinners/ClockLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

const Spinner = ({ loading }) => {
  return (
    <ClockLoader
      color="#f2faf9"
      loading={loading}
      cssOverride={override}
      size={100}
    />
  );
};

export default Spinner;
