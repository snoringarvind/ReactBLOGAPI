import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const BlogsContext = createContext();

export const BlogsProvider = ({ children }) => {
  const [jwtData, setJwtData] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [loginError, setLoginError] = useState("");

  //when the function returns the value, loading is set to false
  const [loading, setLoading] = useState(true);

  const axios_isAuth = async () => {
    const jwt = JSON.parse(localStorage.getItem("jwtData"));

    if (jwt) {
      try {
        const headers = { authorization: `Bearer ${jwt.jwt.token}` };
        const response = await axios({
          method: "POST",
          url: "http://localhost:3000/api/blogs/is-admin-verified",
          data: "",
          headers: headers,
        });
        setJwtData(response);
        setLoginError(false);
        setIsAuth(true);
        setLoading(false);
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
    }
  };

  useEffect(() => {
    axios_isAuth();
  }, []);

  return (
    <div className="Context">
      <BlogsContext.Provider
        value={{
          isAuthValue: [isAuth, setIsAuth],
          jwtData: [jwtData, setJwtData],
          loginError: [loginError, setLoginError],
        }}
      >
        {loading && "loading...."}
        {!loading && children}
      </BlogsContext.Provider>
    </div>
  );
};
