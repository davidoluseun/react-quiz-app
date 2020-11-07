import React from "react";
import Spinner from "../images/spinner.gif";

const Error = ({ errorMsg }) => {
  return (
    <div className="container text-center">
      <img className="img-fluid" src={Spinner} width="100px" alt="" />
      <p className="text-dark">
        {errorMsg ? errorMsg : "Fetching questions..."}
      </p>
    </div>
  );
};

export default Error;
