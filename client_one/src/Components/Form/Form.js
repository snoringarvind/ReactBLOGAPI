import React, { useState, useContext } from "react";
import axios from "axios";
import uniqid from "uniqid";
import { useHistory } from "react-router-dom";
import { BlogsContext } from "../Context";
import "./Form.css";

const Form = ({ state, setState, method, url }) => {
  const { isAuthValue } = useContext(BlogsContext);
  const [setIsAuth] = isAuthValue;
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [error, setError] = useState("");

  console.log(history);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);
    const jwt = JSON.parse(localStorage.getItem("jwtData"));

    if (jwt == null) {
      window.location.reload();
    }

    try {
      const headers = { authorization: `Bearer ${jwt.jwt.token}` };
      const response = await axios({
        url: url,
        headers: headers,
        data: state,
        method: method,
      });
      setLoadingBtn(false);
      console.log(response);
      try {
        history.push(`/blog/${response.data._id}`);
      } catch (err) {
        console.log(err.message);
      }
      setErrors([]);
      setError("");
    } catch (err) {
      console.log(err.message); //err.message important for network and 404 errors
      console.log(err.response);
      setLoadingBtn(false);
      if (err.response.data) {
        setErrors(err.response.data);
      } else {
        setError(err.message);
      }
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

  const showLoadingButton = () => {
    if (history.location.pathname === "/create") {
      return <>{loadingBtn ? "Creating Blog" : "Create Blog"}</>;
    } else {
      return <>{loadingBtn ? "Updating Blog" : "Update Blog"}</>;
    }
  };

  return (
    <div className="form-container">
      {error ? (
        displayError()
      ) : (
        <div className="Form">
          <form>
            <div className="form-group">
              <label htmlFor="title">Blog Title:</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter your blog title"
                value={state.title}
                onChange={changeHandler}
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Blog Content:</label>
              <textarea
                name="content"
                id="content"
                placeholder="Enter your blog content"
                value={state.content}
                onChange={changeHandler}
              />
            </div>

            <div className="error">{displayErrors()}</div>

            <button className="submit-btn" onClick={submitHandler}>
              {showLoadingButton()}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Form;
