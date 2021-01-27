import React, { useState, useContext } from "react";
import axios from "axios";
import uniqid from "uniqid";
import { Redirect } from "react-router-dom";
import "./Login.css";
import { BlogsContext } from "../Context";

const Login = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [state, setState] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState("");
  const { serverUrl } = useContext(BlogsContext);

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
        `${serverUrl}/blogs/admin-login`,
        state
      );
      const jwtData = JSON.stringify(response.data);
      localStorage.setItem("jwtData", jwtData);
      setLoading(false);
      setErrors([]);
      setIsAuth(true);
      setError("");
    } catch (err) {
      console.log("Login=", err.messaage);
      setLoading(false);
      if (err.response) {
        setErrors(err.response.data);
      } else {
        setError(err.messaage);
      }
      setIsAuth(false);
    }
  };

  const displayErrors = () => {
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

  // const redirect_user = () => {
  //   window.location.reload();
  //   return <Redirect to="/blogs" />;
  // };

  const displayError = () => {
    return <div className="error">{error}</div>;
  };
  return (
    <div className="login-container">
      {error ? (
        displayError()
      ) : (
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
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="text"
                id="password"
                placeholder="Enter Password"
                name="password"
                onChange={changeHandler}
              />
            </div>
            <div className="errors">{displayErrors()}</div>
            <button className="login-btn" type="submit" onClick={submitHandler}>
              {loading ? "Loging-in" : "Login"}
            </button>
          </form>
          {isAuth && window.location.reload() && <Redirect to="/blogs" />}
        </div>
      )}
    </div>
  );
};

export default Login;
