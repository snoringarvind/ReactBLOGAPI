import React, { useContext } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { BlogsContext } from "./Context";
import Navigation from "./Navigation";

const AuthButton = () => {
  const { isAuthValue } = useContext(BlogsContext);
  const [isAuth] = isAuthValue;

  const PushHistory = () => {
    const history = useHistory();
    const path = history.location.pathname;
    console.log(path);
    //agar login hoga toh '/' par jayega and login nahi hoga toh '/login' par jayega isliye push taki rrefresh kare toh login page na aaye.
    if (path === "/login" || path === "/") {
      history.push("/blogs");
    } else {
      history.push(path);
    }
  };

  return (
    <div className="AuthButton">
      {!isAuth && <Redirect to="/login" />}
      {isAuth && PushHistory()}
    </div>
  );
};

export default AuthButton;
