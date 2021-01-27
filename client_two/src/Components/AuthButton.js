import React, { useContext } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { BlogsContext } from "./Context";
// import Navigation from "./Navigation";

const AuthButton = () => {
  const { isAuthValue } = useContext(BlogsContext);
  const [isAuth, setIsAuth] = isAuthValue;

  const PushHistory = () => {
    const history = useHistory();
    const path = history.location.pathname;
    console.log(path);
    console.log(isAuth);

    if (!isAuth && path === "/logout") {
      history.push("/blogs");
      return;
    }
    if (isAuth && (path === "/login" || path === "/signup")) {
      history.push("/blogs");
      return;
    }
    // if (!isAuth && path === "/login") {
    //   history.push("/signup");
    // }
    else {
      history.push(path);
      return;
    }
  };

  return (
    <div className="AuthButton">
      {/* {!isAuth && <Redirect to="/login" />} */}
      {/* {isAuth && PushHistory()} */}
      {PushHistory()}
    </div>
  );
};

export default AuthButton;
