import React, { useState, useContext } from "react";
import axios from "axios";
import uniqid from "uniqid";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import "./Login.css";
import { BlogsContext } from "../Context";
import { Link } from "react-router-dom";

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
      const response = await axios.post(`${serverUrl}/blogs/login`, state);
      const jwtData = JSON.stringify(response.data);
      localStorage.setItem("jwtData", jwtData);
      setLoading(false);
      setErrors([]);

      setIsAuth(true);
      console.log(isAuth);
    } catch (err) {
      console.log(err);
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

  console.log(isAuth);
  console.log("hello");

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
            <div className="errors">{displayErrors()}</div>
            <div className="buttons">
              <button
                className="login-btn"
                type="submit"
                onClick={submitHandler}
              >
                {loading ? "Loging-in" : "Login"}
              </button>

              <button className="signup-btn">
                <Link to="/signup">Signup</Link>
              </button>
            </div>
          </form>

          {isAuth && window.location.reload() && <Redirect to="/blogs" />}
        </div>
      )}
    </div>
  );
};

export default Login;
