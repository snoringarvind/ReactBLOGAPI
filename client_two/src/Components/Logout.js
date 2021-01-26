import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { BlogsContext } from "./Context";

const Logout = () => {
  return (
    <div className="Logout">
      {localStorage.clear()}
      {window.location.reload()}
    </div>
  );
};

export default Logout;
