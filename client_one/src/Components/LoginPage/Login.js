import React, { useState } from "react";
import axios from "axios";
import uniqid from "uniqid";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [state, setState] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  //when the user clicks on login button, the loading is set to true until we get a response from server
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/blogs/admin-login",
        state
      );
      const jwtData = JSON.stringify(response.data);
      localStorage.setItem("jwtData", jwtData);
      setLoading(false);
      setErrors([]);
      setIsAuth(true);
    } catch (err) {
      console.log("Login=", err.messaage);
      setLoading(false);
      setErrors(err.response.data);
      setIsAuth(false);
    }
  };

  const displayError = () => {
    const errArray = [];
    if (!Array.isArray(errors)) {
      setErrors([errors]);
    } else {
      if (errors.length === 0) {
        return null;
      } else {
        for (let i = 0; i < errors.length; i++) {
          errArray.push(<li key={uniqid()}>{errors[i].msg}</li>);
        }
        return <ul>{errArray}</ul>;
      }
    }
  };

  const redirect_user = () => {
    window.location.reload();
    return <Redirect to="/blogs" />;
  };
  return (
    <div className="login-container">
      <div className="Login">
        <h1 className="head">Login To Continue.</h1>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              name="username"
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="text"
              id="password"
              placeholder="Enter Password"
              name="password"
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <div className="errors">{displayError()}</div>
          <button className="login-btn" type="submit" onClick={submitHandler}>
            {loading ? "Loging-in" : "Login"}
          </button>
        </form>
        {isAuth && redirect_user()}
      </div>
    </div>
  );
};

export default Login;
