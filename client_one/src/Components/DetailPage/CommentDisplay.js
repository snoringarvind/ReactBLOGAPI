import React, { useState } from "react";
import axios from "axios";
import "./CommentDisplay.css";

const CommentDisplay = ({
  comment,
  index,
  params,
  gotComments,
  setGotComments,
  setCommentsLoading,
}) => {
  const [error, setError] = useState("");

  const deleteHandler = async (e) => {
    e.preventDefault();
    const jwt = JSON.parse(localStorage.getItem("jwtData"));
    console.log(comment._id);

    console.log(params.id);
    try {
      const headers = { authorization: `Bearer ${jwt.jwt.token}` };
      const response = await axios({
        url: `http://localhost:3000/api/blog/${params.id}/comment/${comment._id}`,
        method: "DELETE",
        headers: headers,
      });
      setGotComments(!gotComments);
      setCommentsLoading(true);
    } catch (err) {
      console.log("CommentDisplay=", err.message);
      setError(err.message);
    }
  };

  const displayError = () => {
    return <div className="error">{error}</div>;
  };
  return (
    <div className="comment-card">
      {error ? (
        displayError()
      ) : (
        <>
          <div className="user">{comment.user.username}</div>
          <div className="comment">{comment.comment}</div>
          <div className="delete-comment-btn" onClick={deleteHandler}>
            &#10060;
          </div>
        </>
      )}
    </div>
  );
};

export default CommentDisplay;
