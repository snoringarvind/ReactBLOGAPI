import React, { useState } from "react";
import axios from "axios";
import uniqid from "uniqid";
import { useHistory } from "react-router-dom";

const Form = ({ state, setState, method, url }) => {
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const [loadingBtn, setLoadingBtn] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);
    const jwt = JSON.parse(localStorage.getItem("jwtData"));

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
    } catch (err) {
      console.log(err.message); //err.message important for network and 404 errors
      console.log(err.response);
      setLoadingBtn(false);
      setErrors(err.response.data);
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

  return (
    <div className="form-container">
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
              onChange={(e) => changeHandler(e)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Blog Content:</label>
            <textarea
              name="content"
              id="content"
              placeholder="Enter your blog content"
              value={state.content}
              onChange={(e) => changeHandler(e)}
            />
          </div>

          <div className="error">{displayError()}</div>

          <button className="submit-btn" onClick={submitHandler}>
            {loadingBtn ? "Submitting..." : "CreateBLog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
