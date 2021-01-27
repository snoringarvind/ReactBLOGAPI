import React, { useContext, useState } from "react";
import axios from "axios";
import "./Signup.css";
import uniqid from "uniqid";
import Login from "../Login/Login";
import { Redirect } from "react-router-dom";
import { BlogsContext } from "../Context";

const Signup = () => {
  const [state, setState] = useState({
    fname: "",
    lname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [iSsubmit, setIsSubmit] = useState(false);
  const { serverUrl } = useContext(BlogsContext);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);

    if (state.password !== state.confirmPassword) {
      setErrors({ msg: "Passwords don't match :(" });
      return;
    }

    try {
      const response = await axios({
        url: `${serverUrl}/blogs/signup`,
        method: "POST",
        data: state,
      });
      setErrors([]);
      setError("");
      setIsSubmit(true);
      setLoadingBtn(false);
    } catch (err) {
      if (err.response) {
        setErrors(err.response.data);
      } else {
        setError(err.message);
      }
      setLoadingBtn(false);
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

  const displayError = () => {
    return <div className="error">{error}</div>;
  };

  return (
    <div className="signup-container">
      {error ? (
        displayError()
      ) : (
        <div className="Signup">
          <h1>Signup Page</h1>
          <form>
            <div className="form-group">
              <label htmlFor="fname">First Name:</label>
              <input
                type="text"
                id="fname"
                placeholder="Enter your first name"
                name="fname"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lname">Last Name:</label>
              <input
                type="text"
                id="lname"
                placeholder="Enter your last name"
                name="lname"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email"
                name="email"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                placeholder="Enter a unique username"
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
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="text"
                id="confirmPassword"
                placeholder="Enter above password again"
                name="confirmPassword"
                onChange={changeHandler}
              />
            </div>
            <div className="errors">{displayErrors()}</div>
            <button className="signup-btn" onClick={submitHandler}>
              {loadingBtn ? "Signing-you-up" : "Signup"}
            </button>
          </form>
          {iSsubmit && <Redirect to="/login" />}
        </div>
      )}
    </div>
  );
};

export default Signup;
