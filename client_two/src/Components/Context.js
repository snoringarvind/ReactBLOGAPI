import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch } from "react-router-dom";

export const BlogsContext = createContext();

export const BlogsProvider = ({ children }) => {
  const [jwtData, setJwtData] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [serverUrl, setServerUrl] = useState(
    "https://snoringarvind-blog.herokuapp.com/api"
  );

  //when the function returns the value, loading is set to false
  const [loading, setLoading] = useState(true);
  // console.log(loading);

  const axios_isAuth = async () => {
    const jwt = JSON.parse(localStorage.getItem("jwtData"));
    // console.log(jwt);

    if (jwt) {
      try {
        const headers = { authorization: `Bearer ${jwt.jwt.token}` };
        const response = await axios({
          method: "POST",
          url: `${serverUrl}/blogs/is-guest-verified`,
          data: "",
          headers: headers,
        });
        // console.log(response);
        setJwtData(response);
        setLoginError(false);
        setIsAuth(true);
        setLoading(false);
        // console.log(response);
      } catch (err) {
        console.log("context=", err);
        setLoginError({ Error: err.message });
        setIsAuth(false);
        setLoading(false);
      }
    } else {
      console.log("Context=", "Couldn't find the jwt token");
      setLoginError({ Errors: ["Couldn't find the jwt token"] });
      setIsAuth(false);
      setLoading(false);
      // window.location.reload();
    }
  };

  useEffect(() => {
    axios_isAuth();
  }, []);

  const displayError = () => {
    return <div className="error">{loginError}</div>;
  };

  return (
    <div className="Context">
      <BlogsContext.Provider
        value={{
          isAuthValue: [isAuth, setIsAuth],
          jwtDataValue: [jwtData, setJwtData],
          loginErrorValue: [loginError, setLoginError],
          serverUrl: serverUrl,
        }}
      >
        {loading && "loading...."}
        {!loading && children}
      </BlogsContext.Provider>
    </div>
  );
};
