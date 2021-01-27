import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./CommentDisplay.css";
import { BlogsContext } from "../Context";

const CommentDisplay = ({
  comment,
  index,
  params,
  gotComments,
  setGotComments,
  setCommentsLoading,
}) => {
  const { isAuthValue } = useContext(BlogsContext);
  const [isAuth, setIsAuth] = isAuthValue;
  // const { jwtDataValue } = useContext(BlogsContext);
  const jwtData = JSON.parse(localStorage.getItem("jwtData"));
  const [deleteButton, setDeleteButton] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // console.log(comment.user);
  // console.log(jwtData.jwt.);
  // console.log(comment.user._id, jwtData.jwt.user);
  // if (comment.user._id == jwtData.jwt.user) {
  //   setDeleteButton(true);
  // } else {
  //   setDeleteButton(false);
  // }
  const deleteHandler = async (e) => {
    e.preventDefault();
    const jwt = JSON.parse(localStorage.getItem("jwtData"));
    if (jwt == null) {
      window.location.reload();
    }

    // console.log(params.id);
    try {
      const headers = { authorization: `Bearer ${jwt.jwt.token}` };
      setCommentsLoading(true);
      const response = await axios({
        url: `http://localhost:3000/api/blog/${params.id}/comment/${comment._id}/guest`,
        method: "DELETE",
        headers: headers,
      });
      // console.log(response);
      setGotComments(!gotComments);
    } catch (err) {
      // console.log(err.response.data);
      setError(err.message);
      console.log("CommentDisplay=", err.message);
    }
  };

  useEffect(() => {
    if (jwtData) {
      if (comment.user._id === jwtData.jwt.user) {
        setDeleteButton(true);
      } else {
        setDeleteButton(false);
      }
    }
  }, [deleteButton]);

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
            {deleteButton ? <span>&#10060;</span> : ""}
          </div>
        </>
      )}
    </div>
  );
};

export default CommentDisplay;
