import React, { useState, useContext } from "react";
import axios from "axios";
import "./CommentForm.css";
// import { response } from "express";
import uniqid from "uniqid";
import { Redirect } from "react-router-dom";
import { BlogsContext } from "../Context";

const CommentForm = ({
  comment,
  setComment,
  params,
  setGotComments,
  gotComments,
  setCommentsLoading,
  commentsLoading,
}) => {
  const { isAuthValue, serverUrl } = useContext(BlogsContext);
  const [isAuth, setIsAuth] = isAuthValue;

  const [state, setState] = useState({ comment: "" });
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState([]);
  const [notLogged, setnotLogged] = useState("");

  const changeHandler = (e) => {
    const { name, value } = e.target; //destructuring
    setState({ ...state, [name]: value }); //spread
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoadingBtn(true);
    const jwt = JSON.parse(localStorage.getItem("jwtData"));

    if (!isAuth) {
      setnotLogged("Please login to make a comment :)");
      setLoadingBtn(false);
      return;
    }

    try {
      const headers = { authorization: `Bearer ${jwt.jwt.token}` };
      const response = await axios({
        url: `${serverUrl}/blog/${params.id}/comment`,
        method: "POST",
        headers: headers,
        data: state,
      });
      //doing this so the comments will be added without reloading the page
      //the user here is actually username.
      const y = { comment: state.comment, user: { username: jwt.jwt.user } };
      const x = response.data;
      // console.log(x);
      setState({ comment: "" });
      setGotComments(!gotComments);
      setCommentsLoading(true);
      setLoadingBtn(false);
      console.log(gotComments);
      setErrors([]);
    } catch (err) {
      // console.log("Detail=", err.response.data);
      console.log("Detail=", err.message);
      setLoadingBtn(false);
      if (err.response) {
        setErrors(err.response.data);
      } else {
        setError(err.message);
      }
    }
  };

  const displayError = () => {
    return <div className="error">{error}</div>;
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

  return (
    <div className="CommentForm">
      {error ? (
        displayError()
      ) : (
        <>
          <form>
            <div className="form-group">
              <label htmlFor="comment">Comment:</label>
              <textarea
                type="text"
                name="comment"
                id="comment"
                placeholder="Enter your comment here"
                onChange={(e) => changeHandler(e)}
                value={state.comment}
              />
            </div>
            <div className="error">{displayErrors()}</div>
            <div className="comment-btn">
              <button onClick={submitHandler}>
                {loadingBtn ? "Adding Comment...." : "Add Comment"}
              </button>
            </div>
          </form>
          <div>{notLogged}</div>
        </>
      )}
    </div>
  );
};

export default CommentForm;
