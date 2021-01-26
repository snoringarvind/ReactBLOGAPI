import React, { useState } from "react";
import axios from "axios";
import "./CommentForm.css";
import uniqid from "uniqid";

const CommentForm = ({
  params,
  setGotComments,
  gotComments,
  setCommentsLoading,
}) => {
  const [state, setState] = useState({ comment: "" });
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState([]);

  const changeHandler = (e) => {
    const { name, value } = e.target; //destructuring
    setState({ ...state, [name]: value }); //spread
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoadingBtn(true);
    const jwt = JSON.parse(localStorage.getItem("jwtData"));

    try {
      const headers = { authorization: `Bearer ${jwt.jwt.token}` };
      await axios({
        url: `http://localhost:3000/api/blog/${params.id}/comment`,
        method: "POST",
        headers: headers,
        data: state,
      });
      setState({ comment: "" });
      setGotComments(!gotComments);
      setCommentsLoading(true);
      setLoadingBtn(false);
      console.log(gotComments);

      setErrors([]);
    } catch (err) {
      // console.log("Detail=", err.response.data);
      console.log("Detail=", err.message);
      if (err.response) {
        setErrors(err.response.data);
      }
      setError(err.message);
      setLoadingBtn(false);
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
        <form>
          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea
              type="text"
              name="comment"
              id="comment"
              placeholder="Enter your comment here"
              onChange={changeHandler}
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
      )}
    </div>
  );
};

export default CommentForm;
