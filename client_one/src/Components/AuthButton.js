import React, { useContext } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { BlogsContext } from "./Context";
import Navigation from "./Navigation";

const AuthButton = () => {
  const { isAuthValue } = useContext(BlogsContext);
  const [isAuth] = isAuthValue;
  const history = useHistory();
  console.log(history.location.pathname);
  return (
    <div className="AuthButton">
      {!isAuth && <Redirect to="/login" />}
      {isAuth &&
        (history.location.pathname === "/login"
          ? history.push("/blogs")
          : history.push(history.location.pathname))}
    </div>
  );
};

export default AuthButton;
