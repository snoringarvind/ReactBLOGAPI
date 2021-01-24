import React, { useState } from "react";
import axios from "axios";

const CommentForm = ({
  comment,
  setComment,
  params,
  setGotComments,
  gotComments,
  setCommentsLoading,
  commentsLoading,
}) => {
  const [state, setState] = useState({ comment: "" });
  const [loadingBtn, setLoadingBtn] = useState(false);

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
      const response = await axios({
        url: `http://localhost:3000/api/blog/${params.id}/comment`,
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
    } catch (err) {
      // console.log("Detail=", err.response.data);
      console.log("Detail=", err.message);
      setLoadingBtn(false);
    }
  };

  return (
    <div className="CommentForm">
      <form>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <input
            type="text"
            name="comment"
            id="comment"
            placeholder="Enter your comment here"
            onChange={(e) => changeHandler(e)}
            value={state.comment}
          />
        </div>
        <div className="comment-btn">
          <button onClick={submitHandler}>
            {loadingBtn ? "Adding Comment...." : "Add Comment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
