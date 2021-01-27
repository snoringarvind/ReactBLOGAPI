import React from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import "./Navigation.css";

const Navigation = ({ to, label }) => {
  // console.log(to);
  // console.log("mannn");

  //current route check kar
  let match = useRouteMatch({ path: to });

  // console.log(match, to);
  if (match !== null) {
    if (match.isExact === true) {
      match = true;
      // console.log(match, to);
    } else {
      match = false;
    }
  } else {
    match = false;
    // console.log(match, to);
  }

  return (
    <div className={match ? "active nav-links" : "nav-links"}>
      <Link to={to}>{label}</Link>
    </div>
  );
};

export default Navigation;
